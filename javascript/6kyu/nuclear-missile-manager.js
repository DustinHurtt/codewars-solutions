// Codewars: Nuclear Missile Manager
// Link: https://www.codewars.com/kata/567ed5db4089538eea000010
// Language: javascript
// Kyu: 6 kyu
function launchAll(launchMissile) {
  for(let i = 0; i < 5; i++) {
    setTimeout(function() {
      launchMissile(i);
    }, i * 1000);
    
  }
}