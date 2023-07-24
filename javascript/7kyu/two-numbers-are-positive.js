// Codewars: Two numbers are positive
// Link: https://www.codewars.com/kata/602db3215c22df000e8544f0
// Language: javascript
// Kyu: 7 kyu
function twoArePositive(a, b, c) {
  return Array.from(arguments).filter((arg) => arg > 0).length === 2
}