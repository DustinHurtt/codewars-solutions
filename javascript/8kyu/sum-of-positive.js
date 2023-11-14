// Codewars: Sum of positive
// Link: https://www.codewars.com/kata/5715eaedb436cf5606000381
// Language: javascript
// Kyu: 8 kyu
function positiveSum(arr) {

  return arr.reduce((acc, curr) => {
    if (curr > 0) {
      acc += curr
    }
    return acc
  }, 0)
  
}