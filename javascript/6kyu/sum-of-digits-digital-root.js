// Codewars: Sum of Digits / Digital Root
// Link: https://www.codewars.com/kata/541c8630095125aba6000c00
// Language: javascript
// Kyu: 6 kyu
function digitalRoot(n) {
 return !n ? 0 : n % 9 || 9 
}