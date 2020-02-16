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
  "better than ezra",
  "sevendust",
];
var rand = Math.floor(Math.random() * 10);
var randomBand = new Word(bandsToGuess[rand]);
var band = [];
var guessesRemaining = 7;
var usedLetters = [];

var guessPrompt = function() {
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
          randomBand.toString(bandsToGuess.slice(randomBand.wordArr.length + 1));
        } else {
          guessesRemaining--;
          console.log("\nSorry thats incorrect try again.\n");
          randomBand.checkGuess(answer.letter.toLowerCase());
          usedLetters.push(answer.letter.toLowerCase());
          randomBand.toString(bandsToGuess.slice(randomBand.wordArr.length + 1));
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
          resetGame();
          randomBand.toString(band);
          guessPrompt();
        } else {
          console.log("Come Back Soon!");
        }
      });
  }
};
var resetGame = function() {
  rand = Math.floor(Math.random() * 10);
  randomBand = new Word(bandsToGuess[rand]);
  band = [];
  guessesRemaining = 7;
  usedLetters = [];
};
var isAlpha = function(ch) {
  return /^[a-z]$/i.test(ch);
};

randomBand.toString(band);
guessPrompt();
