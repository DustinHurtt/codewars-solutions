// Codewars: Get the Middle Character
// Link: https://www.codewars.com/kata/56747fd5cb988479af000028
// Language: javascript
// Kyu: 7 kyu
function getMiddle(s) {
  return s.length % 2 === 0 ? `${s[s.length/2-1]}${s[s.length/2]}` : `${s[Math.floor(s.length/2)]}`
  
  }