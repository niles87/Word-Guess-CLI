var Letter = require("./letter");

var Word = function(str) {
  this.wordArr = [];
  this.word = str.split("").forEach(element => {
    this.wordArr.push(new Letter(element));
  });
  this.toString = function(arr) {
    this.wordArr.forEach(element => {
      if (element.character !== " ") {
        arr.push(element.displayLetter());
      } else {
        element.bool = true;
        arr.push(element.displayLetter());
      }
    });
    console.log(arr.join(" "));
  };
  this.checkGuess = function(character) {
    this.wordArr.forEach(index => {
      index.userGuess(character);
    });
  };
};
module.exports = Word;
