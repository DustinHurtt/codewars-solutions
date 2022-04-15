// Codewars: Check same case
// Link: https://www.codewars.com/kata/5dd462a573ee6d0014ce715b
// Language: javascript
// Kyu: 8 kyu
function sameCase(a, b){
  if (a.toUpperCase() == a.toLowerCase() || b.toUpperCase() == b.toLowerCase()) {
    return -1
  } if (a == a.toUpperCase() && b == b.toUpperCase()) {
  return 1}
  if (a == a.toLowerCase() && b == b.toLowerCase()) {
    return 1
  } else {
    return 0
  }
}