#!/usr/bin/env node
/**
 * Codewars exporter + dated git commits
 *
 * - Logs into Codewars
 * - Scrapes your completed solutions with code, language, kyu, and completion date
 * - Writes files organized as OUTPUT_DIR/<language>/<kyu>/<slug>.<ext>
 * - Creates one git commit per solution, setting GIT_AUTHOR_DATE and GIT_COMMITTER_DATE to the completion date
 * - Pushes to your GitHub repository
 *
 * Env (.env):
 *   CODEWARS_EMAIL=you@example.com
 *   CODEWARS_PASSWORD=yourpassword
 *   OUTPUT_DIR=./export
 *   GIT_REPO_URL=https://github.com/you/codewars-solutions.git
 *   DEFAULT_TZ=UTC
 *   HEADLESS=true
 *
 * Optional: If you prefer to drive commit dates from a CSV/JSON instead of scraped dates,
 * you can provide:
 *   DATES_FILE=./dates.json or ./dates.csv
 * The script will match by slug (preferred) or title.
 */

import fs from "fs";
import path from "path";
import process from "process";
import { spawnSync } from "child_process";
import slugify from "slugify";
import dotenv from "dotenv";
import puppeteer from "puppeteer";

dotenv.config();

const EMAIL = process.env.CODEWARS_EMAIL;
const PASSWORD = process.env.CODEWARS_PASSWORD;
const OUTPUT_DIR = process.env.OUTPUT_DIR || "./export";
const GIT_REPO_URL = process.env.GIT_REPO_URL;
const DEFAULT_TZ = process.env.DEFAULT_TZ || "UTC";
const HEADLESS = process.env.HEADLESS !== "false";
const DATES_FILE = process.env.DATES_FILE; // optional external dates override

if (!EMAIL || !PASSWORD) {
  console.error("Set CODEWARS_EMAIL and CODEWARS_PASSWORD in .env");
  process.exit(1);
}
if (!GIT_REPO_URL) {
  console.error("Set GIT_REPO_URL in .env (e.g., https://github.com/you/codewars-solutions.git)");
  process.exit(1);
}

function run(cmd, args, opts = {}) {
  const res = spawnSync(cmd, args, { stdio: "inherit", ...opts });
  if (res.status !== 0) {
    throw new Error(`Command failed: ${cmd} ${args.join(" ")}`);
  }
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function extForLanguage(lang) {
  const map = {
    javascript: "js",
    typescript: "ts",
    python: "py",
    java: "java",
    csharp: "cs",
    cpp: "cpp",
    c: "c",
    ruby: "rb",
    go: "go",
    rust: "rs",
    php: "php",
    kotlin: "kt",
    swift: "swift",
    scala: "scala",
    haskell: "hs",
    elixir: "exs",
    clojure: "clj",
    r: "r",
    dart: "dart",
    lua: "lua",
    julia: "jl",
    shell: "sh",
  };
  return map[lang?.toLowerCase?.()] || "txt";
}

function headerComment(lang, text) {
  const hashLangs = new Set(["python","ruby","bash","shell","perl","r","julia","haskell","elixir","clojure","lua"]);
  const jsLike = new Set(["javascript","typescript","java","c","cpp","csharp","go","rust","kotlin","swift","scala","php","dart"]);
  if (hashLangs.has(lang?.toLowerCase?.())) return `# ${text}`;
  if (jsLike.has(lang?.toLowerCase?.())) return `// ${text}`;
  return `# ${text}`;
}

async function ensureDir(dir) {
  await fs.promises.mkdir(dir, { recursive: true });
}

function parseDate(text) {
  // Accepts various formats; returns ISO string or null
  if (!text) return null;
  // Codewars often shows relative times or absolute timestamps (e.g., "Completed 2023-11-02")
  // Try Date parse first:
  const d = new Date(text);
  if (!isNaN(d)) return d.toISOString();
  return null;
}

function toTZISOString(dateISO, tz) {
  // Convert ISO to given TZ preserving local wall-clock? For commit dates,
  // GitHub displays author date in viewer timezone. We can keep ISO as-is.
  // If you want a specific TZ, we format then rebuild ISO.
  try {
    const d = new Date(dateISO);
    if (tz && tz !== "UTC" && Intl?.DateTimeFormat) {
      const fmt = new Intl.DateTimeFormat("en-CA", {
        timeZone: tz,
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      });
      const parts = Object.fromEntries(fmt.formatToParts(d).map(p => [p.type, p.value]));
      const iso = `${parts.year}-${parts.month}-${parts.day}T${parts.hour}:${parts.minute}:${parts.second} ${tz}`;
      // Git accepts "YYYY-MM-DD HH:MM:SS TZ" strings, so we return that.
      return `${parts.year}-${parts.month}-${parts.day} ${parts.hour}:${parts.minute}:${parts.second} ${tz}`;
    }
    return d.toISOString();
  } catch {
    return dateISO;
  }
}

function loadDatesOverride(filePath) {
  if (!filePath) return null;
  if (!fs.existsSync(filePath)) {
    console.warn(`DATES_FILE not found: ${filePath}`);
    return null;
  }
  const ext = path.extname(filePath).toLowerCase();
  if (ext === ".json") {
    const data = JSON.parse(fs.readFileSync(filePath, "utf8"));
    // Expect [{slug, date}] or {slug: date}
    if (Array.isArray(data)) {
      const map = new Map();
      for (const row of data) {
        if (row.slug && row.date) map.set(row.slug.toLowerCase(), row.date);
        else if (row.title && row.date) map.set(slugify(row.title, { lower: true, strict: true }), row.date);
      }
      return map;
    } else {
      return new Map(Object.entries(data).map(([k, v]) => [k.toLowerCase(), v]));
    }
  } else if (ext === ".csv") {
    const raw = fs.readFileSync(filePath, "utf8");
    const lines = raw.split(/\r?\n/).filter(Boolean);
    // expect header like: slug,title,date
    const header = lines.shift().split(",").map(s => s.trim().toLowerCase());
    const idxSlug = header.indexOf("slug");
    const idxTitle = header.indexOf("title");
    const idxDate = header.indexOf("date");
    const map = new Map();
    for (const line of lines) {
      const cols = line.split(",").map(s => s.trim());
      const slug = idxSlug >= 0 ? cols[idxSlug] : "";
      const title = idxTitle >= 0 ? cols[idxTitle] : "";
      const date = idxDate >= 0 ? cols[idxDate] : "";
      const key = slug ? slug.toLowerCase() : slugify(title, { lower: true, strict: true });
      if (key && date) map.set(key, date);
    }
    return map;
  } else {
    console.warn(`Unsupported DATES_FILE extension: ${ext}`);
    return null;
  }
}

async function scrapeSolutions() {
  const browser = await puppeteer.launch({
    headless: HEADLESS,
    args: ["--no-sandbox","--disable-setuid-sandbox"],
  });
  const page = await browser.newPage();
  page.setDefaultTimeout(60000);

  // Login
const SESSION = process.env.CODEWARS_SESSION;

if (SESSION) {
  await page.goto("https://www.codewars.com/", { waitUntil: "networkidle2" });
  await page.setCookie({
    name: "_session",            // confirm the exact cookie name in your browser
    value: SESSION,
    domain: "www.codewars.com",
    httpOnly: true,
    secure: true,
    path: "/",
  });
  await page.goto("https://www.codewars.com/dashboard", { waitUntil: "networkidle2" });
  // Optionally verify logged-in state by checking for avatar/user menu
  if (!(await page.$('[data-test="header-user-menu"], .profile-link, .avatar'))) {
    throw new Error("Session cookie didn’t log you in. Check CODEWARS_SESSION or cookie name.");
  }
} else {
  // Fallback: email/password login (as in the script)
  await page.goto("https://www.codewars.com/users/sign_in", { waitUntil: "networkidle2" });
  
  // Wait for form fields to be visible
  await page.waitForSelector("#user_email", { visible: true });
  await page.waitForSelector("#user_password", { visible: true });
  
  // Clear any existing values and type credentials
  await page.click("#user_email", { clickCount: 3 }); // Select all
  await page.type("#user_email", EMAIL, { delay: 20 });
  
  await page.click("#user_password", { clickCount: 3 }); // Select all
  await page.type("#user_password", PASSWORD, { delay: 20 });
  
  console.log(`Attempting login with email: ${EMAIL}`);
  
  // Try multiple selectors for the submit button (Codewars may have changed their HTML)
  const submitSelectors = [
    "input[name='commit']",
    "button[type='submit']",
    "input[type='submit']",
    "button[data-testid='sign-in-btn']",
    "form button",
    ".btn-primary"
  ];
  
  let submitButton = null;
  for (const selector of submitSelectors) {
    submitButton = await page.$(selector);
    if (submitButton) {
      console.log(`Found submit button with selector: ${selector}`);
      break;
    }
  }
  
  if (!submitButton) {
    throw new Error("Could not find login submit button. Codewars may have changed their page structure.");
  }
  
  await Promise.all([
    submitButton.click(),
    page.waitForNavigation({ waitUntil: "networkidle2" }),
  ]);
  
  // Verify login was successful
  await sleep(2000); // Give page time to load
  const currentUrl = page.url();
  
  // Check if we're still on sign-in page (login failed)
  if (currentUrl.includes('/sign_in')) {
    console.error("Still on sign_in page - login failed!");
    throw new Error("Login failed. Check your CODEWARS_EMAIL and CODEWARS_PASSWORD.");
  }
  
  // Verify we reached the dashboard (successful login)
  if (currentUrl.includes('/dashboard')) {
    console.log("Login successful! ✓");
  } else {
    console.warn(`Unexpected URL after login: ${currentUrl}`);
  }
}

  // Extract username from the page (username is needed for the URL, not email)
  await sleep(1000);
  let username = null;
  
  // Try to find username from profile link or data attributes
  try {
    username = await page.$eval('[data-username], a[href*="/users/"][href*="/profile"]', el => {
      return el.getAttribute('data-username') || el.href.split('/users/')[1]?.split('/')[0];
    }).catch(() => null);
    
    if (!username) {
      // Try to get from any link that goes to /users/USERNAME
      username = await page.evaluate(() => {
        const links = Array.from(document.querySelectorAll('a[href*="/users/"]'));
        for (const link of links) {
          const match = link.href.match(/\/users\/([^\/\?]+)/);
          if (match && match[1] && !match[1].includes('sign_') && match[1] !== 'leaderboard') {
            return match[1];
          }
        }
        return null;
      });
    }
  } catch (err) {
    console.warn("Could not automatically extract username:", err.message);
  }
  
  if (!username) {
    throw new Error("Could not determine your Codewars username. Please add CODEWARS_USERNAME=YourUsername to your .env file.");
  }
  
  console.log(`Detected username: ${username}`);

  // Move to your profile and click Solutions tab
  console.log(`Navigating to your profile...`);
  await page.goto(`https://www.codewars.com/users/${encodeURIComponent(username)}`, { waitUntil: "networkidle2" });
  
  // Click on the Solutions tab
  console.log(`Clicking on Solutions tab...`);
  await sleep(1000);
  
  // Try different selectors for the Solutions tab/link
  const solutionsTabSelectors = [
    'a[href*="/completed_solutions"]',
    'a:has-text("Solutions")',
    '[data-tab="solutions"]',
    'nav a[href$="/completed_solutions"]'
  ];
  
  let solutionsTab = null;
  for (const selector of solutionsTabSelectors) {
    try {
      solutionsTab = await page.$(selector);
      if (solutionsTab) {
        console.log(`Found Solutions tab with selector: ${selector}`);
        break;
      }
    } catch (e) {
      // Some selectors may be invalid, continue
    }
  }
  
  if (!solutionsTab) {
    // Try clicking by text content
    solutionsTab = await page.evaluateHandle(() => {
      const links = Array.from(document.querySelectorAll('a'));
      return links.find(a => a.textContent.trim() === 'Solutions');
    });
  }
  
  if (solutionsTab && solutionsTab.asElement()) {
    await solutionsTab.asElement().click();
    console.log("Loading solutions...");
    await sleep(3000); // Give time for dynamic content to load
  } else {
    console.warn("Could not find Solutions tab, trying direct URL...");
    await page.goto(`https://www.codewars.com/users/${encodeURIComponent(username)}/completed_solutions`, { waitUntil: "networkidle2" });
    await sleep(3000);
  }

  const results = [];
  let hasNext = true;
  let pageCount = 0;
  const maxPages = 50;

  while (hasNext && pageCount < maxPages) {
    pageCount++;
    
    // Safety check: ensure we're still on the user's completed solutions page
    const currentUrl = page.url();
    if (!currentUrl.includes(`/users/${username}/completed_solutions`)) {
      console.error(`⚠️  Navigation error: Left user solutions page. Current URL: ${currentUrl}`);
      console.log(`Stopping pagination. Collected ${results.length} solutions so far.`);
      break;
    }
    
    console.log(`\n--- Page ${pageCount} ---`);
    try {
      await page.waitForSelector(".list-item-solutions", { timeout: 60000 });
    } catch (err) {
      console.error("Could not find solutions on the page.");
      console.log(`Current URL: ${page.url()}`);
      throw err;
    }

    // Record DOM node count BEFORE any load-more action so we can compare
    // against it after — note this must be separate from pageEntries.length,
    // which can be larger because one kata solved in N languages yields N entries.
    const domCountBefore = await page.$$eval(".list-item-solutions", nodes => nodes.length);

    console.log("Extracting solutions...");

    const pageEntries = await page.$$eval(".list-item-solutions", (nodes) => {
      const entries = [];
      for (const n of nodes) {
        const titleEl = n.querySelector(".item-title a");
        const title = titleEl?.textContent?.trim() || "";
        const kataUrl = titleEl?.href || "";
        const slug = kataUrl.split("/kata/")[1]?.split("?")[0] || "";

        // Kyu level is in the small-hex
        const kyuEl = n.querySelector(".small-hex span, .inner-small-hex span");
        const kyuText = kyuEl?.textContent?.trim() || "";

        // Completion timestamp from time-ago element
        let completedAt = "";
        const timeEl = n.querySelector("time-ago");
        if (timeEl?.getAttribute?.("datetime")) {
          completedAt = timeEl.getAttribute("datetime");
        }

        // Collect ALL language solutions for this kata (one entry per language)
        const codeEls = n.querySelectorAll("code[data-language]");
        if (codeEls.length === 0) {
          entries.push({ title, kataUrl, slug, kyuText, language: "unknown", code: "", completedAt });
        } else {
          for (const codeEl of codeEls) {
            const language = codeEl.getAttribute("data-language") || "unknown";
            const code = codeEl.textContent || "";
            entries.push({ title, kataUrl, slug, kyuText, language, code, completedAt });
          }
        }
      }
      return entries;
    });

    // Check for duplicates before adding (key = slug + language so that the
    // same kata solved in multiple languages is not treated as a duplicate)
    const existingKeys = new Set(results.map(r => `${r.slug}::${r.language}`));
    const newEntries = pageEntries.filter(e => !existingKeys.has(`${e.slug}::${e.language}`));
    
    if (newEntries.length === 0 && pageEntries.length > 0) {
      console.log(`⚠️  All ${pageEntries.length} entries on this page are already collected. Stopping pagination.`);
      hasNext = false;
      break;
    }
    
    results.push(...newEntries);
    console.log(`Found ${pageEntries.length} entries on this page (${newEntries.length} new, ${pageEntries.length - newEntries.length} duplicates)`);
    console.log(`Total unique solutions: ${results.length}`);

    // Scroll to the bottom to expose any "Load More" button or trigger lazy load
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));

    // Try to click a "Load More" / "Show More" button using plain text matching
    // (note: :has-text() is Playwright-only and does not work in Puppeteer)
    const btnClicked = await page.evaluate(() => {
      const candidates = Array.from(document.querySelectorAll('button, a'));
      const btn = candidates.find(el => {
        const text = el.textContent.trim().toLowerCase();
        return text === "load more" || text === "show more" || text === "view more";
      });
      if (btn) { btn.click(); return true; }
      return false;
    });

    if (btnClicked) {
      console.log('Clicked "Load More" button.');
    }

    // Poll for new DOM nodes to appear (up to ~10 seconds) rather than using
    // a fixed sleep, which risks reading the DOM before new content arrives.
    let domCountAfter = domCountBefore;
    for (let attempt = 0; attempt < 20; attempt++) {
      await sleep(500);
      domCountAfter = await page.$$eval(".list-item-solutions", nodes => nodes.length);
      if (domCountAfter > domCountBefore) break;
    }

    if (domCountAfter > domCountBefore) {
      console.log(`Loaded ${domCountAfter - domCountBefore} more solution card(s) (total DOM nodes: ${domCountAfter}).`);
    } else {
      console.log("No new solutions loaded. Finished scraping.");
      hasNext = false;
    }
  }

  await browser.close();
  console.log(`\n✓ Scraping complete! Collected ${results.length} solutions total.`);
  return results;
}

async function writeFiles(solutions, datesOverride) {
  const written = [];
  for (const e of solutions) {
    if (!e.code || !e.language || !e.title) continue;

    const safeTitle = slugify(e.title, { lower: true, strict: true });
    const langLower = e.language.toLowerCase();
    const ext = extForLanguage(langLower);
    const kyuMatch = (e.kyuText || "").toLowerCase().match(/(\d+)\s*kyu/);
    const kyuFolder = kyuMatch ? `${kyuMatch[1]}kyu` : "unknown-kyu";
    const outDir = path.join(OUTPUT_DIR, langLower, kyuFolder);
    await ensureDir(outDir);

    const filename = path.join(outDir, `${safeTitle}.${ext}`);

    const header = [
      headerComment(langLower, `Codewars: ${e.title}`),
      headerComment(langLower, `Link: ${e.kataUrl}`),
      headerComment(langLower, `Language: ${e.language}`),
      headerComment(langLower, `Kyu: ${e.kyuText}`),
      "",
    ].join("\n");

    const content = header + e.code.replace(/\r\n/g, "\n");
    await fs.promises.writeFile(filename, content, "utf8");

    // Determine commit date: override > scraped > now
    const overrideKey = (e.slug || safeTitle).toLowerCase();
    let when = datesOverride?.get?.(overrideKey) || e.completedAt || new Date().toISOString();
    // Normalize date string for git
    let authorDate;
    if (when) {
      const parsed = parseDate(when) || when; // keep if already ISO or "YYYY-MM-DD HH:mm:ss TZ"
      authorDate = toTZISOString(parsed, DEFAULT_TZ);
    } else {
      authorDate = new Date().toISOString();
    }

    written.push({
      path: filename,
      title: e.title,
      slug: e.slug || safeTitle,
      language: e.language,
      kyu: e.kyuText,
      authorDate,
    });
    process.stdout.write(`Saved: ${filename} (${authorDate})\n`);
  }
  return written;
}

function initOrOpenRepo(repoDir, gitUrl) {
  // If OUTPUT_DIR is not a git repo, init and set remote
  const gitDir = path.join(repoDir, ".git");
  if (!fs.existsSync(gitDir)) {
    run("git", ["init"], { cwd: repoDir });
    // Default branch main
    run("git", ["checkout", "-B", "main"], { cwd: repoDir });
    run("git", ["remote", "add", "origin", gitUrl], { cwd: repoDir });
  } else {
    // Ensure remote exists
    try {
      run("git", ["remote", "get-url", "origin"], { cwd: repoDir });
    } catch {
      run("git", ["remote", "add", "origin", gitUrl], { cwd: repoDir });
    }
  }
}

function commitEachFile(repoDir, filesWithDates) {
  for (const item of filesWithDates) {
    // Convert path to be relative to repoDir and use forward slashes for git
    const relativePath = path.relative(repoDir, item.path).replace(/\\/g, '/');
    
    // Stage single file and commit with env dates
    run("git", ["add", relativePath], { cwd: repoDir });
    const env = {
      ...process.env,
      GIT_AUTHOR_DATE: item.authorDate,
      GIT_COMMITTER_DATE: item.authorDate,
    };
    const msg = `Add: ${item.kyu ? `${item.kyu} ` : ""}${item.title} (${item.slug}) [${item.language}]`;
    const res = spawnSync("git", ["commit", "-m", msg], { cwd: repoDir, env, stdio: "inherit" });
    if (res.status !== 0) {
      // If nothing to commit (e.g., unchanged), continue
      console.warn(`Skip commit for ${item.path} (maybe unchanged).`);
    }
  }
}

function push(repoDir) {
  // Create main if not exists
  try {
    run("git", ["rev-parse", "--verify", "main"], { cwd: repoDir });
  } catch {
    run("git", ["checkout", "-B", "main"], { cwd: repoDir });
  }

  // Set upstream and push
  try {
    run("git", ["push", "-u", "origin", "main"], { cwd: repoDir });
  } catch (e) {
    // If remote has history, pull with rebase then push
    console.warn("Initial push failed; attempting pull --rebase then push.");
    run("git", ["pull", "--rebase", "origin", "main"], { cwd: repoDir });
    run("git", ["push", "origin", "main"], { cwd: repoDir });
  }
}

async function main() {
  // Optional dates override
  const datesOverride = loadDatesOverride(DATES_FILE);

  // 1) Scrape solutions with completion dates
  console.log("Logging into Codewars and scraping solutions...");
  const solutions = await scrapeSolutions();
  if (!solutions.length) {
    console.log("No solutions found.");
    return;
  }

  // 2) Write files and collect per-file commit dates
  await ensureDir(OUTPUT_DIR);
  const filesWithDates = await writeFiles(solutions, datesOverride);

  // 3) Init/open repo and commit each file with custom dates
  initOrOpenRepo(path.resolve(OUTPUT_DIR), GIT_REPO_URL);
  commitEachFile(path.resolve(OUTPUT_DIR), filesWithDates);

  // 4) Push
  push(path.resolve(OUTPUT_DIR));

  console.log("\n" + "=".repeat(50));
  console.log(`✓ All done! Successfully exported ${filesWithDates.length} solutions.`);
  console.log("=".repeat(50));
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});