// Codewars: Does my number look big in this?
// Link: https://www.codewars.com/kata/5287e858c6b5a9678200083c
// Language: javascript
// Kyu: 6 kyu
function narcissistic(value) {
   let m = 1, count = 0;
   while(value / m > 1){
      m *= 10;
      count++;
   };
   let sum = 0, temp = value;
   while(temp){
      sum += Math.pow(temp % 10, count);
      temp = Math.floor(temp / 10);
   };
   return sum === value;
}
