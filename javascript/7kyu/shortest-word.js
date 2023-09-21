// Codewars: Shortest Word
// Link: https://www.codewars.com/kata/57cebe1dc6fdc20c57000ac9
// Language: javascript
// Kyu: 7 kyu
function findShort(s){
  let arr = s.split(" ")
  let shortest = arr[0]
  arr.forEach((word) => {
    if (word.length < shortest.length) {
      shortest = word
    }
  })
   return shortest.length
}