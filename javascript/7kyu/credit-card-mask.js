// Codewars: Credit Card Mask
// Link: https://www.codewars.com/kata/5412509bd436bd33920011bc
// Language: javascript
// Kyu: 7 kyu
// return masked string
function maskify(cc) {
  return cc.split('').map((el, i, arr) => i < arr.length - 4 ? '#' : el).join('')
}
