// Codewars: Persistent Bugger.
// Link: https://www.codewars.com/kata/55bf01e5a717a0d57e0000ec
// Language: javascript
// Kyu: 6 kyu

function persistence(num) {
  if (num >= 0 && num <= 9) return 0;

  let count = 0;

  while (num > 9) {
    num = String(num)
      .split('')
      .reduce((prod, ch) => prod * Number(ch), 1);
    count++;
  }

  return count;
}
