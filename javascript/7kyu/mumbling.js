// Codewars: Mumbling
// Link: https://www.codewars.com/kata/5667e8f4e3f572a8f2000039
// Language: javascript
// Kyu: 7 kyu
function accum(s) {
	return s.split('').map((element, i) => element.toUpperCase() + element.toLowerCase().repeat(i)).join("-")
}