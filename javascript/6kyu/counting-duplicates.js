// Codewars: Counting Duplicates
// Link: https://www.codewars.com/kata/54bf1c2cd5b56cc47f0007a1
// Language: javascript
// Kyu: 6 kyu
function duplicateCount(text){

  if (!text) return 0;

  const freq = new Map();
  for (const ch of text.toLowerCase()) {
    // Only letters and digits are expected per the problem statement
    freq.set(ch, (freq.get(ch) || 0) + 1);
  }

  let count = 0;
  for (const [, n] of freq) {
    if (n > 1) count++;
  }
  return count;

}