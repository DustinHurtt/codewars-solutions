// Codewars: Highest and Lowest
// Link: https://www.codewars.com/kata/554b4ac871d6813a03000035
// Language: javascript
// Kyu: 7 kyu
function highAndLow(numbers){
   return `${Math.max(...numbers.split(' '))} ${Math.min(...numbers.split(' '))}`
}