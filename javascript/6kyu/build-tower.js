// Codewars: Build Tower
// Link: https://www.codewars.com/kata/576757b1df89ecf5bd00073b
// Language: javascript
// Kyu: 6 kyu
function towerBuilder(nFloors) {
  let pyramid = []
  for (let i = 0; i < nFloors; i++) {
    let asterisksNum = 2 * i + 1
    let padding = ' '.repeat(nFloors - 1 - i)
    let asterisks = '*'.repeat(asterisksNum)
    pyramid.push(`${padding}${asterisks}${padding}`)
  }
  return pyramid
  

  
//   return '*'.repeat(nFloors).split('').map((el, i) => `${' '.repeat(nFloors - 1 - i)}${'*'.repeat(nFloors - 1 - i)}${' '.repeat(nFloors - 1 - i)}`)
    
}