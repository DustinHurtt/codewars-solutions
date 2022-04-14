// Codewars: Split Strings
// Link: https://www.codewars.com/kata/515de9ae9dcfc28eb6000001
// Language: javascript
// Kyu: 6 kyu
function solution(str){
    if (str.length % 2 !== 0){
  str = str + "_" ;
} else {
  str = str
}
   let twoChar = [];
for (let i = 0; i < str.length; i = i + 2) {
    twoChar.push(str.slice(i, i + 2))
}

       return twoChar
}