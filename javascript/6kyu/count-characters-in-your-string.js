// Codewars: Count characters in your string
// Link: https://www.codewars.com/kata/52efefcbcdf57161d4000091
// Language: javascript
// Kyu: 6 kyu
function count(string) {
  return string.split('').reduce((count, item) => (count[item] = count[item] + 1 || 1, count), {});
}