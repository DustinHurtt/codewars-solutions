// Codewars: Replace With Alphabet Position
// Link: https://www.codewars.com/kata/546f922b54af40e1e90001da
// Language: javascript
// Kyu: 6 kyu
function alphabetPosition(text) {
  
  
return Array.from(text.toUpperCase())
  .map(ch => ch.codePointAt(0))         
  .filter(cp => cp >= 65 && cp <= 90) 
  .map(cp => cp - 64)                    
  .join(" ")

  }
