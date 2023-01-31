// Codewars: Digits explosion
// Link: https://www.codewars.com/kata/585b1fafe08bae9988000314
// Language: javascript
// Kyu: 7 kyu
function explode(s) {
  let arr = s.split('')
  arr.forEach((digit) => {Number(digit)})
  let multipleArr = arr.map((number) => {
    return String(number).repeat(number)
  })
  return multipleArr.join('');
}