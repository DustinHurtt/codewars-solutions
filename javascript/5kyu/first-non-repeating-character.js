// Codewars: First non-repeating character
// Link: https://www.codewars.com/kata/52bc74d4ac05d0945d00054e
// Language: javascript
// Kyu: 5 kyu
function firstNonRepeatingLetter(s) {
  let first = ''
  let array = s.toLowerCase().split('')
  let array2 = s.split('')
  
  for (let i = 0; i < array.length; i++) {

    if (array.indexOf(array[i]) === array.lastIndexOf(array[i])) {
      first = array2[i]
      break
    }
  
  }

  return first
  // Add your code here
}