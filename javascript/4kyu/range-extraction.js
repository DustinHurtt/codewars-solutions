// Codewars: Range Extraction
// Link: https://www.codewars.com/kata/51ba717bb08c1cd60f00002f
// Language: javascript
// Kyu: 4 kyu
function solution(list) {
  let lists = [];

  let ranges = [];

  let consolidated = [];

  for (let i = 0; i < list.length; i++) {
    checkRange(list[i], list[i + 1], list[i - 1]);
  }

  function checkRange(element, nextElement, prevElement) {
    if (element + 1 === nextElement || element - 1 === prevElement) {
      ranges.push(element);
      checkRange(nextElement);
    }
  }

  function consolidateFirst(element, prevElement) {
    if (element - 1 !== prevElement) {
      consolidated.push(element);
    }
  }

  function consolidateLast(element, nextElement) {
    if (element + 1 !== nextElement) {
      consolidated.push(element);
    }
  }

  for (let i = 0; i < ranges.length; i++) {
    consolidateFirst(ranges[i], ranges[i - 1]);
    consolidateLast(ranges[i], ranges[i + 1]);
  }

  consolidated = consolidated.filter((element) => element !== undefined);

  function consolidateRanges(array) {
    for (let i = 0; i < array.length; i++) {
      if (array[i] + 1 === array[i + 1]) {
        lists.push(array[i]);
        lists.push(array[i + 1]);
        consolidated.splice(i, 2);
        i--;
      }
    }
  }

  consolidateRanges(consolidated);

  let notConsolidated = list.filter((element) => !ranges.includes(element));

  let compiled = notConsolidated
    .concat(consolidated)
    .concat(lists)
    .sort((a, b) => a - b);

  let final = [];

  for (let i = 0; i < compiled.length; i++) {
    if (!lists.includes(compiled[i]) && !consolidated.includes(compiled[i])) {
      final.push(String(compiled[i]));
    }
    if (consolidated.includes(compiled[i])) {
      final.push(String(compiled[i] + "-" + compiled[i + 1]));
      i++;
    }
    if (lists.includes(compiled[i])) {
      final.push(String(compiled[i]));
    }
  }

  return final.join(",");
}