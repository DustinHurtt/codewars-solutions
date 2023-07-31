// Codewars: Create Phone Number
// Link: https://www.codewars.com/kata/525f50e3b73515a6db000b83
// Language: javascript
// Kyu: 6 kyu
function createPhoneNumber(numbers){
  numbers.splice(0,0,"(")
  numbers.splice(4,0,") ")
  numbers.splice(8,0,"-")
  return numbers.join('')
  
  }