// Codewars: Square Every Digit
// Link: https://www.codewars.com/kata/546e2562b03326a88e000020
// Language: javascript
// Kyu: 7 kyu
function squareDigits(num){
  return Number(String(num).split('').map((el) => el * el).join(''))
}