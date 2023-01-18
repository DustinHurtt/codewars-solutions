// Codewars: Is n divisible by x and y?
// Link: https://www.codewars.com/kata/5545f109004975ea66000086
// Language: javascript
// Kyu: 8 kyu
function isDivisible(n, x, y) {
  if (n % x === 0 && n % y === 0) {
    return true
  } else {
    return false
  }
}