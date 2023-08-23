// Codewars: Weight for weight
// Link: https://www.codewars.com/kata/55c6126177c9441a570000cc
// Language: javascript
// Kyu: 5 kyu
function orderWeight(strng) {
  return strng
    .split(" ")
    .map((number) => number.split(""))
    .map((array) => array.map((number) => Number(number)))
    .map((array) => {
      let newObject = {
        weight: array.reduce((a, b) => a + b, 0),
        number: array.join(""),
      };
      return newObject;
    })
    .sort((a, b) => a.weight - b.weight)

    .sort((a, b) => {
      if (a.weight === b.weight) {
        return a.number.localeCompare(b.number);
      }
    })
    .map((element) => element.number)
    .join(" ");
}