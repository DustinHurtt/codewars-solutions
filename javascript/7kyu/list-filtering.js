// Codewars: List Filtering
// Link: https://www.codewars.com/kata/53dbd5315a3c69eed20002dd
// Language: javascript
// Kyu: 7 kyu
function filter_list(l) {
  return l.filter((element) => typeof element !== "string")
}