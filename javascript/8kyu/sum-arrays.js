// Codewars: Sum Arrays
// Link: https://www.codewars.com/kata/53dc54212259ed3d4f00071c
// Language: javascript
// Kyu: 8 kyu
// Sum Numbers
function sum (numbers) {
  let sum = 0;
  for (let i = 0; i < numbers.length; i++) {
    if (typeof numbers[i] === "number") {
      sum += numbers[i];
    }
  }
  return sum;
};