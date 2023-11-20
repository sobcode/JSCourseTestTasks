"use strict";

let randomNumber = giveRandomNumber();
console.log(randomNumber); // created to test the game
let score = 20;
let highscore = 0;

document.querySelector(".check").addEventListener("click", function () {
  let guess = Number(document.querySelector(".guess").value);
  let message;

  if (score === 0 || score === -1) {
    // when player has already won(-1) or lost(0) the game
  } else if (!guess) {
    message = "⛔No number!";
  } else if (guess < 1 || guess > 20) {
    message = "⛔Out of bounds";
  } else if (guess === randomNumber) {
    message = "🎉You won";
    document.querySelector(".number").textContent = randomNumber;
    document.querySelector("body").style.backgroundColor = "#60b347";

    if (score > highscore) {
      highscore = score;
      document.querySelector(".highscore").textContent = highscore;
    }
    score = -1; // in order player can not continue the game after winning
  } else if (guess !== randomNumber) {
    message = guess > randomNumber ? "📈Too high!" : "📉Too low!";
    decreaseScore();
  }

  if (score === 0) {
    message = `💥You lost! Correct number: ${randomNumber} 😊`;
  }

  document.querySelector(".message").textContent = message;
});

function decreaseScore() {
  score--;
  document.querySelector(".score").textContent = score;
}

function giveRandomNumber() {
  return Math.trunc(Math.random() * 20) + 1;
}

document.querySelector(".again").addEventListener("click", function () {
  randomNumber = giveRandomNumber();
  score = 20;

  document.querySelector(".score").textContent = score;
  document.querySelector(".message").textContent = "Start guessing...";
  document.querySelector(".guess").value = "";
  document.querySelector(".number").textContent = "?";

  document.querySelector("body").style.backgroundColor = "#222";
});
