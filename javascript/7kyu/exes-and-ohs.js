// Codewars: Exes and Ohs
// Link: https://www.codewars.com/kata/55908aad6620c066bc00002a
// Language: javascript
// Kyu: 7 kyu
function XO(str) {
  
  let Ocounter = str.toLowerCase().replace(/[^o]+/g, '').length
  let Xcounter = str.toLowerCase().replace(/[^x]+/g, '').length
  
  return Ocounter === Xcounter
}