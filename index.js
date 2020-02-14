var Word = require("./word");
var inquirer = require("inquirer");

var bandsToGuess = [
  "third eye blind",
  "red hot chili peppers",
  "foo fighters",
  "harvey danger",
  "beastie boys",
  "the breeders",
  "avenged sevenfold",
  "metallica",
  "sevendust",
  "better than ezra",
];
var rand = Math.floor(Math.random() * 11);
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
            if (input !== "" && isAlpha(input) && !usedLetters.includes(input)) {
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
    inquirer
      .prompt([
        {
          type: "confirm",
          message: "Thanks for playing. Would you like to play again?",
          name: "confirm",
          default: false,
        },
      ])
      .then(response => {
        if (response.confirm) {
          rand = Math.floor(Math.random() * 11);
          randomBand = new Word(bandsToGuess[rand]);
          band = [];
          guessesRemaining = 7;
          usedLetters = [];
          randomBand.toString(band);
          guessPrompt();
        } else {
          console.log("Come Back Soon!");
        }
      });
  }
}

function isAlpha(ch) {
  return /^[a-z]$/i.test(ch);
}

randomBand.toString(band);
guessPrompt();
