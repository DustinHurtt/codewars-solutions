// Codewars: Clocky Mc Clock-Face
// Link: https://www.codewars.com/kata/59752e1f064d1261cb0000ec
// Language: javascript
// Kyu: 6 kyu
var whatTimeIsIt = function(angle) {
  let hour = angle/30
  let minutes = (hour - Math.floor(hour))*60
  console.log("Minutes:", minutes.toFixed(2))
	let currentHour = Math.floor(hour)
  let currentMinutes = Math.floor(minutes.toFixed(2))
  console.log("Current", currentMinutes, minutes.toFixed(2))
  if (currentHour === 0) {
  currentHour = 12
  }
  if (currentHour < 10) {
  currentHour = `0${currentHour}`
  }
  if (currentMinutes < 10) {
  currentMinutes = `0${currentMinutes}`
  }
  return `${currentHour}:${currentMinutes}`
}