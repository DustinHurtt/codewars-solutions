// Codewars: Return Negative
// Link: https://www.codewars.com/kata/55685cd7ad70877c23000102
// Language: javascript
// Kyu: 8 kyu
function makeNegative(num) {
  if (num === 0 || num < 0) {
    return num
  } else {
    return -1 * num
  }
}