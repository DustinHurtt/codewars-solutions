// Codewars: Clocky Mc Clock-Face
// Link: https://www.codewars.com/kata/59752e1f064d1261cb0000ec
// Language: javascript
// Kyu: 6 kyu
var whatTimeIsIt = function(angle) {
let hour = Math.floor(angle/30)
let minute = Math.floor((angle*2) % 60)
if (minute < 10) {
  minute = '0' + minute
}
if (hour <= 0) {
  hour = '12'

}
if (hour > 0 && hour <10) {
  hour = '0' + hour
}
  return hour + ':' + minute;
}