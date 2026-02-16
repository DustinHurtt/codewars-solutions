// Codewars: Duplicate Encoder
// Link: https://www.codewars.com/kata/54b42f9314d9229fd6000d9c
// Language: javascript
// Kyu: 6 kyu

function duplicateEncode(word) {

  word = word.toLowerCase().split('');
  let newString = [];

  console.log("This is word now", word);


  const freq = {};
  for (const ch of word) {
    freq[ch] = (freq[ch] || 0) + 1;
  }


  for (let i = 0; i < word.length; i++) {
    const ch = word[i];
    if (freq[ch] > 1) {
      newString.push(')');
    } else {
      newString.push('(');
    }
  }

  const result = newString.join('');
  console.log("This is new String", result);
  return result;
}

