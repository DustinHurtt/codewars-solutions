// Codewars: Digits explosion
// Link: https://www.codewars.com/kata/585b1fafe08bae9988000314
// Language: javascript
// Kyu: 7 kyu
function explode(s) {

 let exploded = ""
 let strings = s.toString()
 for (let i = 0; i < strings.length; i++){
    exploded += strings[i].repeat(s[i])
   }
  return exploded
}