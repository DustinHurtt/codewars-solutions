// Codewars: Jaden Casing Strings
// Link: https://www.codewars.com/kata/5390bac347d09b7da40006f6
// Language: javascript
// Kyu: 7 kyu
String.prototype.toJadenCase = function () {
 let returnString = ''
  for (let i = 0; i < this.length; i++) {
    if (i === 0) {
      returnString += this[i].toUpperCase()
    } else if (this[i] === ' ' && this[i + 1]) {
      returnString += this[i] + this[i + 1].toUpperCase()
      
    } else if (this[i-1] !== ' ') {
      returnString += this[i]
    }
  }
  return returnString
};