// Codewars: Strip Comments
// Link: https://www.codewars.com/kata/51c8e37cee245da6b40000bd
// Language: javascript
// Kyu: 4 kyu
function solution(input, markers) {
  let newArray = []
  let inpArray = input.split('\n')

  newArray = inpArray.map((element, i, arr) => {
    for (let i = 0; i < element.length; i++) {
      if (markers.includes(element[i])) {
        return element.slice(0, i).trimEnd()
      } 
    }
    return element.trimEnd()
  })

  return newArray.join('\n')
};