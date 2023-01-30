// Codewars: Difference between biggest 2 numbers
// Link: https://www.codewars.com/kata/55e3f27d5dee52d8dd0000a9
// Language: javascript
// Kyu: 7 kyu
function diffBig2(arr) {
  let first = 0
  let second = 0
  
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] > first) {
      second = first;
      first = arr[i];
    } else if (arr[i] > second && arr[i] <= first) {
      second = arr[i]
    }
 } 
  return first - second

}
