// Codewars: Remove String Spaces
// Link: https://www.codewars.com/kata/57eae20f5500ad98e50002c5
// Language: javascript
// Kyu: 8 kyu
function noSpace(x){
  let output = '';
  for(let i=0; i<x.length; i++){
    if(x[i] != ' '){
      output += x[i]
    }
  }
  return output
}