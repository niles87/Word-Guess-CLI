function Letter(character) {
  this.character = character;
  this.bool = false;
  this.displayLetter = function() {
    if (this.bool) {
      return this.character;
    } else {
      return "_";
    }
  };
  this.guess = function(char) {
    if (char === this.character) {
      this.bool = true;
    }
  };
}

// Module needed for word.js
module.exports = Letter;
