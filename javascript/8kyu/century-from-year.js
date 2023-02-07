// Codewars: Century From Year
// Link: https://www.codewars.com/kata/5a3fe3dde1ce0e8ed6000097
// Language: javascript
// Kyu: 8 kyu
function century(year) {
  if (year % 100 > 0) {
    return (year-(year%100))/100 + 1
  }
  return (year-(year%100))/100
}