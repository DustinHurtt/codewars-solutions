// Codewars: Build Tower
// Link: https://www.codewars.com/kata/576757b1df89ecf5bd00073b
// Language: javascript
// Kyu: 6 kyu
function towerBuilder(nFloors) {
   return ' '.repeat(nFloors).split('').map((el, i) => `${' '.repeat(nFloors - i - 1)}${'*'.repeat(2 * i + 1)}${' '.repeat(nFloors - i - 1)}`)
}