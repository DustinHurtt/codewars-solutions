// Codewars: Descending Order
// Link: https://www.codewars.com/kata/5467e4d82edf8bbf40000155
// Language: javascript
// Kyu: 7 kyu
function descendingOrder(n){
  return +String(n).split('').map(Number).sort((a, b) => b - a).join('')
}