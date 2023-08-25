// Codewars: Snail
// Link: https://www.codewars.com/kata/521c2db8ddc89b9b7a0000c1
// Language: javascript
// Kyu: 4 kyu
snail = function(array) {
  
  let copiedArray = [...array]
  
  let newArray = []
  
  let counter = 0
  
function populateArray(arr) {
  
  
  while (arr.length) {
      
    switch(counter) {
        case 0: 
//           console.log("ARRRR", arr)
          newArray.push(...arr[0])
          arr.shift()

          if(arr.length) {
            counter++
          }
          break;   
        
        case 1: 
        
            for (let i = 0; i < arr.length; i++) {
              
//               arr[i].forEach((element, i, arr) => {
                     
//               newElement()
//               })
              
              newArray.push(arr[i][arr[i].length-1])

//               arr[i].forEach((element, i, arr) => {
//                 console.log("ELEM", element)
//                 console.log(arr[arr.length-1])
//                 newArray.push(arr[arr.length-1])
                 
//               })
              arr[i].pop()
            }

//             arr.forEach((element, i, arr) => {
              
//               element.forEach((el, i, arr) => {
//                 newArray.push(arr[arr.length-1])
//               })
//                 arr.pop()
                
                
//             })
      
          if(arr.length) {
            counter++
          }
          break;
        
        case 2:
        
        arr[arr.length-1].reverse()
        arr[arr.length-1].forEach((element) => {
          newArray.push(element)
        })
        arr.pop()
        
        if(arr.length) {
          counter++
        }
          break;   
        
        case 3: 

          for (let i = arr.length - 1; i >= 0; i--) {
            
            newArray.push(arr[i][0])
            arr[i].shift()
      }
        
        
          counter = 0
          
          break;
    }
    
    populateArray(arr)

  }
  
}
    
  populateArray(copiedArray)
      console.log("New", newArray)
  
return newArray
}