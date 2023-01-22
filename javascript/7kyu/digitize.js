// Codewars: Digitize
// Link: https://www.codewars.com/kata/5417423f9e2e6c2f040002ae
// Language: javascript
// Kyu: 7 kyu
function digitize(n) {
  return String(n).split('').map((el) => Number(el))
}