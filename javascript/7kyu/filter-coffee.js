// Codewars: Filter Coffee
// Link: https://www.codewars.com/kata/56069d0c4af7f633910000d3
// Language: javascript
// Kyu: 7 kyu
function search(budget, prices) {

  return prices.filter(coffee=>coffee<=budget).sort((a,b)=>a-b).join(',')
// return array of prices that are within budget

}