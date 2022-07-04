// Codewars: Multiples of 3 or 5
// Link: https://www.codewars.com/kata/514b92a657cdc65150000006
// Language: javascript
// Kyu: 6 kyu
function solution(number){
  let numbers = []
  for (let i = 0; i < number; i++) {
    numbers.push(i)
  }
  let multiples = []
  for (var j of numbers) {
    if (j % 3 === 0 || j % 5 === 0) {
      multiples.push(j)
    } 
  }
  if (number < 0) {
    return 0
  } else {
    return multiples.reduce(function (a, b) {return a + b}, 0)
  }
  
}