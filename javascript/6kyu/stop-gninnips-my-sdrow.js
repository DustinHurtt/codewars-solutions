// Codewars: Stop gninnipS My sdroW!
// Link: https://www.codewars.com/kata/5264d2b162488dc400000001
// Language: javascript
// Kyu: 6 kyu
function spinWords(string){
  return string.split(' ').map((word) => word.length > 4 ? word.split('').reverse().join('') : word).join(' ')
}