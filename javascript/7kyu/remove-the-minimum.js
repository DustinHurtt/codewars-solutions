// Codewars: Remove the minimum
// Link: https://www.codewars.com/kata/563cf89eb4747c5fb100001b
// Language: javascript
// Kyu: 7 kyu
function removeSmallest(numbers) {

  let newArr = [...numbers]
  
  newArr.splice(newArr.indexOf(Math.min(...newArr)), 1)
  
  return newArr
}