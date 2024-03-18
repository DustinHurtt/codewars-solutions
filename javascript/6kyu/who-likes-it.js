// Codewars: Who likes it?
// Link: https://www.codewars.com/kata/5266876b8f4bf2da9b000362
// Language: javascript
// Kyu: 6 kyu
function likes(names) {
  let statement
  
  switch(true) {
      case names.length === 0:
      statement = 'no one likes this'
      break;
      case names.length === 1:
      statement = `${names[0]} likes this`
      break
      case names.length === 2:
      statement = `${names[0]} and ${names[1]} like this`
      break
      case names.length === 3:
      statement = `${names[0]}, ${names[1]} and ${names[2]} like this`
      break
      case names.length > 3:
      statement = `${names[0]}, ${names[1]} and ${names.length - 2} others like this`
      
  }
  
  return statement
  // TODO
}