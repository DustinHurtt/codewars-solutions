// Codewars: Jaden Casing Strings
// Link: https://www.codewars.com/kata/5390bac347d09b7da40006f6
// Language: javascript
// Kyu: 7 kyu
String.prototype.toJadenCase = function () {
    return this.split(" ").map((word) => word.charAt(0).toUpperCase() + word.slice(1, word.length)).join(" ")
};

