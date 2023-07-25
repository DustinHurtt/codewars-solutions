// Codewars: Coding Meetup #6 - Higher-Order Functions Series - Can they code in the same language?
// Link: https://www.codewars.com/kata/58287977ef8d4451f90001a0
// Language: javascript
// Kyu: 7 kyu
function isSameLanguage(list) {
return new Set(list.reduce((acc,user)=>acc.concat([user.language]),[])).size==1

}