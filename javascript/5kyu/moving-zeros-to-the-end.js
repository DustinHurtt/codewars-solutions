// Codewars: Moving Zeros To The End
// Link: https://www.codewars.com/kata/52597aa56021e91c93000cb0
// Language: javascript
// Kyu: 5 kyu
function moveZeros(arr) {

  let zeroes = 0

  arr.forEach((element) => {
    if (element === 0) {
      zeroes++
    }
  })
   
  let filtered = arr.filter((element) => element !== 0)
  
  let string = '0'.repeat(zeroes)
  
  let split = string.split('')
  
  let toNumber = split.map((number) => Number(number))
  
  
  return filtered.concat(toNumber)
}