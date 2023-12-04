// Codewars: Exes and Ohs
// Link: https://www.codewars.com/kata/55908aad6620c066bc00002a
// Language: javascript
// Kyu: 7 kyu
function XO(str) {
    let xArr = []
    let oArr = []
    for (let char of str) {
      if (char === 'X' || char === 'x') {
        xArr.push(char)
      }
      if (char === 'O' || char === 'o') {
        oArr.push(char)
      }
    }
    return xArr.length === oArr.length
}