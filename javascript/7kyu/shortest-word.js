// Codewars: Shortest Word
// Link: https://www.codewars.com/kata/57cebe1dc6fdc20c57000ac9
// Language: javascript
// Kyu: 7 kyu
function findShort(s){
  return s.split(" ").map((word) => word.length).sort((a, b) => a - b)[0]
}