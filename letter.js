var Letter = function(character) {
  this.character = character;
  this.bool = false;
  this.displayLetter = function() {
    if (this.bool === true) {
      return this.character;
    } else {
      return "~";
    }
  };
  this.userGuess = function(char) {
    if (char == this.character) {
      this.bool = true;
    }
  };
};

// Module needed for word.js
module.exports = Letter;
