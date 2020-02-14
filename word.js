var Letter = require("./letter");

var Word = function(str) {
  this.wordArr = [];
  this.word = str.split("").forEach(element => {
    this.wordArr.push(new Letter(element));
  });
  this.toString = function(Arr) {
    this.wordArr.forEach(element => {
      if (element.character !== " ") {
        Arr.push(element.displayLetter());
      } else {
        element.bool = true;
        Arr.push(element.displayLetter());
      }
    });
    console.log(Arr.join(" "));
  };
  this.checkGuess = function(character) {
    this.wordArr.forEach(index => {
      index.userGuess(character);
    });
  };
};
module.exports = Word;
