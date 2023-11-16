// Codewars: Highest and Lowest
// Link: https://www.codewars.com/kata/554b4ac871d6813a03000035
// Language: javascript
// Kyu: 7 kyu
function highAndLow(numbers){
    var arr = (numbers.toString().split(' ')).sort(function(a, b) {
      return a - b;
    });
  
  return String(arr[arr.length - 1]) + " " + String(arr[0])
}