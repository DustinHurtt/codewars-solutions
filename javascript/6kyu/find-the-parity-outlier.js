// Codewars: Find The Parity Outlier
// Link: https://www.codewars.com/kata/5526fc09a1bbd946250002dc
// Language: javascript
// Kyu: 6 kyu
function findOutlier(integers){
  
 let odd = 0
 let even = 0
 
 let final
 
  integers.forEach((number) => {
    if (number % 2 === 0) {
      even++
    } else {
      odd++
    }
  })
  
  if (odd > even) {
    
      let index = integers.findLastIndex((number) => number % 2 === 0)
      final = integers[index]
    
  } else {
      let index = integers.findLastIndex((number) => Math.abs(number % 2) === 1)
      final = integers[index]
  }
  console.log("Odd:", odd)
  console.log("Even:", even)
  console.log("Final:", final)

  return final  
  
  }
