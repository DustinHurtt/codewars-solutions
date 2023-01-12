// Codewars: Calculate average
// Link: https://www.codewars.com/kata/57a2013acf1fa5bfc4000921
// Language: javascript
// Kyu: 8 kyu
function findAverage(array) {
  if (array.length === 0) {
    return 0
  }
  let total = 0
  array.forEach((element) => {
    total += element
  })
  return total/array.length;
}