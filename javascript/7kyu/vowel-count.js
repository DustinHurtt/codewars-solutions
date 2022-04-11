// Codewars: Vowel Count
// Link: https://www.codewars.com/kata/54ff3102c1bad923760001f3
// Language: javascript
// Kyu: 7 kyu
function getCount(str) {
  var vowelsCount = 0;
let stringArr = str.split("")
let count = 0
for (let i = 0; i < stringArr.length; i++) {
  if (stringArr[i] === "a" || stringArr[i] === "e" || stringArr[i] === "i" || stringArr[i] === "o" || stringArr[i] === "u") {
    vowelsCount += 1
  }
}
  return vowelsCount;
}