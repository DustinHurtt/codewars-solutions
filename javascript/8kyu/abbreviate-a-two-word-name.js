// Codewars: Abbreviate a Two Word Name
// Link: https://www.codewars.com/kata/57eadb7ecd143f4c9c0000a3
// Language: javascript
// Kyu: 8 kyu
function abbrevName(name){

    let firstArr = name.split(" ")
    firstArr.forEach((element) => {
      element.split('')
    })
    
    return firstArr[0][0].toUpperCase() + '.' + firstArr[1][0].toUpperCase()

}