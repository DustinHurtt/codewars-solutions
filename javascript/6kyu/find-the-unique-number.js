// Codewars: Find the unique number
// Link: https://www.codewars.com/kata/585d7d5adb20cf33cb000235
// Language: javascript
// Kyu: 6 kyu
function findUniq(arr) {
  arr.sort((a, b) =>  a - b )
  if (arr[0] == arr[1]) {
    return arr[arr.length - 1]
  } else {
    return arr[0]
  }        
}
