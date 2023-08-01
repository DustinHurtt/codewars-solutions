// Codewars: Your order,  please
// Link: https://www.codewars.com/kata/55c45be3b2079eccff00010f
// Language: javascript
// Kyu: 6 kyu
function order(words){
  
  let objects = words.split(' ').map((word) => word.split('').map((letter) => {
    return {position: !isNaN(letter), letter}
  }))
  let newObjects = []
  objects.forEach((element) => {
    let newObject = {string: ''}
    element.forEach((object) => {

    if (object.position) {
      newObject.index = object.letter
    }
    newObject.string += object.letter
    })
    newObjects.push(newObject)
  })
  let sorted = newObjects.sort((a, b) => a.index - b.index).map((object) => object.string).join(' ')
  console.log(objects)
  console.log("newObjects", newObjects)
  console.log("sorted", sorted)
  return sorted
}