// Codewars: Human Readable Time
// Link: https://www.codewars.com/kata/52685f7382004e774f0001f7
// Language: javascript
// Kyu: 5 kyu
function humanReadable (seconds) {
  
  let digitSeconds = seconds % 60 % 60
  
  let minutes = Math.floor((seconds / 60 )).toFixed(0) % 60
  
  let hours = Math.floor((seconds / 60 / 60)).toFixed(0) 
  
  if (hours < 10) {
    hours = '0' + hours
  }
  
   if (minutes < 10) {
    minutes = '0' + minutes
  }

   if (digitSeconds < 10) {
    digitSeconds = '0' + digitSeconds
  }
  
  return hours + ':' + minutes + ':' + digitSeconds;
}