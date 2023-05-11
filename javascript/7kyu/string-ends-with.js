// Codewars: String ends with?
// Link: https://www.codewars.com/kata/51f2d1cafc9c0f745c00037d
// Language: javascript
// Kyu: 7 kyu
function solution(str, ending){
  if(!ending) return true
  return (str.includes(ending) && ending.slice(-1)===str.slice(-1))
}