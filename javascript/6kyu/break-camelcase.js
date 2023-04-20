// Codewars: Break camelCase
// Link: https://www.codewars.com/kata/5208f99aee097e6552000148
// Language: javascript
// Kyu: 6 kyu
// complete the function
function solution(string) {
    let array = string.split('')
    let newArray = []
    array.forEach((element) => {
      if (element.charCodeAt(0) > 64 && element.charCodeAt(0) < 91) {
        newArray.push(' ')
        newArray.push(element)
      } else {
        newArray.push(element)
      }
    })
    return newArray.join('')
}
