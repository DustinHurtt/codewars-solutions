// Codewars: Snail
// Link: https://www.codewars.com/kata/521c2db8ddc89b9b7a0000c1
// Language: javascript
// Kyu: 4 kyu
snail = function(array) {

  let newArray = [];

  let counter = 0;

  function populateArray(arr) {
    while (arr.length) {
      switch (counter) {
        case 0:
          newArray.push(...arr[0]);
          arr.shift();

          if (arr.length) {
            counter++;
          }
          break;

        case 1:
          for (let i = 0; i < arr.length; i++) {
            newArray.push(arr[i][arr[i].length - 1]);

            arr[i].pop();
          }

          if (arr.length) {
            counter++;
          }
          break;

        case 2:
          arr[arr.length - 1].reverse();
          arr[arr.length - 1].forEach((element) => {
            newArray.push(element);
          });
          arr.pop();

          if (arr.length) {
            counter++;
          }
          break;

        case 3:
          for (let i = arr.length - 1; i >= 0; i--) {
            newArray.push(arr[i][0]);
            arr[i].shift();
          }

          counter = 0;

          break;
      }

      populateArray(arr);
    }
  }

  populateArray(array);

  return newArray;
}