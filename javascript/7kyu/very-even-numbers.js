// Codewars: "Very  Even" Numbers.
// Link: https://www.codewars.com/kata/58c9322bedb4235468000019
// Language: javascript
// Kyu: 7 kyu
function isVeryEvenNumber(n) { 
  let allNs = String(n).split('').map(Number)
  const sum = allNs.reduce((a, b) => a + b, 0)
  while (String(sum).length > 1) return isVeryEvenNumber(sum)
  return sum % 2 === 0
}

