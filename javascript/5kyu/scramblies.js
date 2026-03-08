// Codewars: Scramblies
// Link: https://www.codewars.com/kata/55c04b4cc56a697bb0000048
// Language: javascript
// Kyu: 5 kyu
function scramble(str1, str2) {
  let charCount = {};
  
  for (let char of str1) {
    charCount[char] = (charCount[char] || 0) + 1;
  }
  
  for (let char of str2) {
    if (!charCount[char] || charCount[char] === 0) {
      return false;
    }
    charCount[char] -= 1;
  }
  
  return true;
}
