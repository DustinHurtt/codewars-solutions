// Codewars: Two to One
// Link: https://www.codewars.com/kata/5656b6906de340bd1b0000ac
// Language: javascript
// Kyu: 7 kyu
function longest(s1, s2) {
  return Array.from(new Set((s1 + s2).split(''))).sort().join('')
}