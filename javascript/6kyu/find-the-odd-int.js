// Codewars: Find the odd int
// Link: https://www.codewars.com/kata/54da5a58ea159efa38000836
// Language: javascript
// Kyu: 6 kyu
function findOdd(A) {
  
 let mapped = A.map((element) => {
   let count = 0
   let newObject = {count, element} 
   return newObject
 }) 
 
 mapped.forEach((el, i, arr) => {

   for (let i = 0; i < A.length; i++) {

    if (A[i] === el.element) {
      el.count++
    }     
     
   }
   
 })

  let odd = mapped.filter((element) => element.count % 2 !== 0)

  
  return odd[0].element
  }