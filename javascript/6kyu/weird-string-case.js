// Codewars: WeIrD StRiNg CaSe
// Link: https://www.codewars.com/kata/52b757663a95b11b3d00062d
// Language: javascript
// Kyu: 6 kyu
function toWeirdCase(string){
  return string.split(' ').map(function(word){
    return word.split('').map(function(letter, index){
      return index % 2 == 0 ? letter.toUpperCase() : letter.toLowerCase()      
    }).join('');
  }).join(' ');
}

  
