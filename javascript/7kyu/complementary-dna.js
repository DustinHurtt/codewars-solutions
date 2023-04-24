// Codewars: Complementary DNA
// Link: https://www.codewars.com/kata/554e4a2f232cdd87d9000038
// Language: javascript
// Kyu: 7 kyu
function DNAStrand(dna){
  
  let otherSide = ''
  
  for (let char of dna) {
    switch(char) {
      case "A":
        otherSide += 'T'
        break
      case "T":
        otherSide += 'A'
        break
      case "C":
        otherSide += "G"
        break
      case "G":
        otherSide += 'C'
        break
    }
  }
       return otherSide
}