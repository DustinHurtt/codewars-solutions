// Codewars: Isograms
// Link: https://www.codewars.com/kata/54ba84be607a92aa900000f1
// Language: javascript
// Kyu: 7 kyu
function isIsogram(str){
  let arr = str.toLowerCase().split('')
  let unique = new Set(arr)
  return arr.length === [...unique.keys()].length 
  
  }