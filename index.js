var Word = require("./word");
var inquirer = require("inquirer");

var bandsToGuess = [
  "third eye blind",
  "red hot chili peppers",
  "foo fighters",
  "harvey danger",
  "beastie boys",
  "the breeders",
];
var rand = Math.floor(Math.random() * 7);
var randomBand = new Word(bandsToGuess[rand]);
var band = [];
var guessesRemaining = 7;
var usedLetters = [];

function guessPrompt() {
  if (guessesRemaining > 0 && randomBand.wordArr.some(el => el.bool === false)) {
    inquirer
      .prompt([
        {
          name: "letter",
          message: "Guess a Letter",
          validate: input => {
            if (input !== ("" && /\d/)) {
              return true;
            } else {
              return false;
            }
          },
        },
      ])
      .then(answer => {
        if (randomBand.wordArr.some(e => e.character === answer.letter.toLowerCase())) {
          console.log("\nCorrect!!\n");
          randomBand.checkGuess(answer.letter.toLowerCase());
          usedLetters.push(answer.letter.toLowerCase());
          randomBand.toString(bandsToGuess.slice(randomBand.wordArr.length));
        } else {
          guessesRemaining--;
          console.log("\nSorry thats incorrect try again.\n");
          randomBand.checkGuess(answer.letter.toLowerCase());
          usedLetters.push(answer.letter.toLowerCase());
          randomBand.toString(bandsToGuess.slice(randomBand.wordArr.length));
          console.log("Remaining Guesses:", guessesRemaining);
        }
        guessPrompt();
      });
  } else {
    console.log("Thanks For Playing!");
  }
}

randomBand.toString(band);
guessPrompt();
