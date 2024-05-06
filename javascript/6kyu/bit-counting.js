// Codewars: Bit Counting
// Link: https://www.codewars.com/kata/526571aae218b8ee490006f4
// Language: javascript
// Kyu: 6 kyu
var countBits = function(n) {
  return n.toString(2).split('').map((numberString) => Number(numberString)).reduce((acc, cur) => acc + cur, 0)
};