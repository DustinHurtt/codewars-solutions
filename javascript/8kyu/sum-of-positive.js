// Codewars: Sum of positive
// Link: https://www.codewars.com/kata/5715eaedb436cf5606000381
// Language: javascript
// Kyu: 8 kyu
function positiveSum(arr) {
  let sum = 0
  arr.forEach((number) => {
    if (number > 0) {
      sum += number
    }
  })
  return sum
} 