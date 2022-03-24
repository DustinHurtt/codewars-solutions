// Codewars: Array.diff
// Link: https://www.codewars.com/kata/523f5d21c841566fde000009
// Language: javascript
// Kyu: 6 kyu
function arrayDiff(a, b) {

for( var i=a.length - 1; i>=0; i--){
 	for( var j=0; j<b.length; j++) {

 	    if(a[i] && (a[i] === b[j])) {
    		a.splice(i, 1);
    	}

      }
    }
  return a
  }