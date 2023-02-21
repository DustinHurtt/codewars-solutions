// Codewars: Remove First and Last Character
// Link: https://www.codewars.com/kata/56bc28ad5bdaeb48760009b0
// Language: javascript
// Kyu: 8 kyu
function removeChar(str){
  let arr = str.split('')
  arr.shift()
  arr.pop()
 return arr.join('')
  
};



