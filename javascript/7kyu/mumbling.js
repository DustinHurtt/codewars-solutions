// Codewars: Mumbling
// Link: https://www.codewars.com/kata/5667e8f4e3f572a8f2000039
// Language: javascript
// Kyu: 7 kyu
function accum(s) {

//   let array = s.split('')
  
//   let secondArr = array.map((character, index) => {
//     return character.toUpperCase() + character.toLowerCase().repeat(index)
//   })
//   secondArr.join('-')
  
 return s.split('').map((el, i) => el.toUpperCase() + el.toLowerCase().repeat(i)).join('-')
  
}