// Codewars: Convert string to camel case
// Link: https://www.codewars.com/kata/517abf86da9663f1d2000003
// Language: javascript
// Kyu: 6 kyu
function toCamelCase(str){
  let newStr = ''
  for(let i=0; i<str.length;i++){
    if(str[i] === "-"|| str[i] === '_'){
      newStr+= str[i+1].toUpperCase()
      i++
    } else{
      newStr+= str[i]
    }
  }
  return newStr
}