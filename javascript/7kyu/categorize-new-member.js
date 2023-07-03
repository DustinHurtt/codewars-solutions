// Codewars: Categorize New Member
// Link: https://www.codewars.com/kata/5502c9e7b3216ec63c0001aa
// Language: javascript
// Kyu: 7 kyu
function openOrSenior(data){
return data.map((elem) => {
  if (elem[0] > 54 && elem[1] > 7) {
    return "Senior"
  } else {
    return "Open"
  }
})
}