// Codewars: Reversed sequence
// Link: https://www.codewars.com/kata/5a00e05cc374cb34d100000d
// Language: javascript
// Kyu: 8 kyu
const reverseSeq = (n) => {
  
  let array = []
  while (n > 0) {
    array.push(n)
    n--
  }
  return array ;
};