// Codewars: Multiples of 3 or 5
// Link: https://www.codewars.com/kata/514b92a657cdc65150000006
// Language: javascript
// Kyu: 6 kyu
function solution(number){ 
  if (number < 0){
    return 0
  } else {
  return [...Array(Math.floor(number)+1).keys()].slice(0, -1).filter(num => num % 5 === 0 || num % 3 === 0).reduce((a, b) => a + b, 0)}
}