// Codewars: The Hashtag Generator
// Link: https://www.codewars.com/kata/52449b062fb80683ec000024
// Language: javascript
// Kyu: 5 kyu
function generateHashtag (str) {

  let newString = `#${str.split(' ').map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join('')}`
  
  if (newString === "#" || newString === "" || newString.length > 140) {
    return false
  } else {
    
    return newString 
  }

}