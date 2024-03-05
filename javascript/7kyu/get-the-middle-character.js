// Codewars: Get the Middle Character
// Link: https://www.codewars.com/kata/56747fd5cb988479af000028
// Language: javascript
// Kyu: 7 kyu
function getMiddle(s)
{
 if (s.length % 2 === 0) {
   let middleIndex = s.length / 2
   return `${s[middleIndex -1 ]}${s[middleIndex]}`
 } else {
   let middleIndex = Math.ceil((s.length - 1) / 2)
   return s[middleIndex]
 }
}