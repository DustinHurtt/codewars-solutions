// Codewars: Sum of the first nth term of Series
// Link: https://www.codewars.com/kata/555eded1ad94b00403000071
// Language: javascript
// Kyu: 7 kyu
function SeriesSum(n)
{
  let divisors = []
  let number = 1
  for (let i = 0; i < n; i++) {   
    divisors.push(number)
    number += 3
  }
  return String(divisors.map((el) => 1 / el).reduce((a, b) => a + b, 0).toFixed(2))
}
