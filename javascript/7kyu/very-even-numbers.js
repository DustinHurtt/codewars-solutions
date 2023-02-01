// Codewars: "Very  Even" Numbers.
// Link: https://www.codewars.com/kata/58c9322bedb4235468000019
// Language: javascript
// Kyu: 7 kyu
function isVeryEvenNumber(n) {
  if (n < 10) {
    if (n % 2 === 0) {
      return true
    } else {
      return false
    }
  } else {
    let sum = n % 9 || 9
    if (sum % 2 === 0) {
      return true
    } else {
      return false
    }
  }
}