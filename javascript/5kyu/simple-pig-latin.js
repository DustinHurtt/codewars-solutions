// Codewars: Simple Pig Latin
// Link: https://www.codewars.com/kata/520b9d2ad5c005041100000f
// Language: javascript
// Kyu: 5 kyu
function pigIt(str){
  return str.split(' ').map((word) => {
    if (!(/[^\w\s]+/g).test(word)) {
      return word.slice(1) + word.charAt(0) + 'ay'
    } else {
      return word
    }
  }).join(' ')
}