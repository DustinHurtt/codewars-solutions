// Codewars: Difference between biggest 2 numbers
// Link: https://www.codewars.com/kata/55e3f27d5dee52d8dd0000a9
// Language: javascript
// Kyu: 7 kyu
function diffBig2(arr) {
  let max = 0
  let secondMax = 0
  for (let num of arr){
    if (num > max){
      secondMax = max
      max = num
    } else if (num > secondMax) {
      secondMax = num
    }
  }
  return max - secondMax
}