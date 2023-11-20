"use strict";

const score0El = document.querySelector("#score--0");
const score1El = document.querySelector("#score--1");
const diceEl = document.querySelector(".dice");
const rollBtn = document.querySelector(".btn--roll");
const holdBtn = document.querySelector(".btn--hold");
const newBtn = document.querySelector(".btn--new");
const player0 = document.querySelector(".player--0");
const player1 = document.querySelector(".player--1");
const current0El = document.querySelector("#current--0");
const current1El = document.querySelector("#current--1");

let scores = [0, 0];
let currentScore = 0;
let activePlayer = 0;
let isGameActive = true;

score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add("hidden");

rollBtn.addEventListener("click", function () {
  if (isGameActive) {
    const roll = Math.trunc(Math.random() * 6) + 1;
    diceEl.classList.remove("hidden");
    diceEl.src = `dice-${roll}.png`;

    if (roll !== 1) {
      currentScore += roll;
    } else {
      currentScore = 0;
    }

    document.querySelector(`#current--${activePlayer}`).textContent =
      currentScore;

    if (roll === 1) {
      changeActivePlayer();
    }
  }
});

holdBtn.addEventListener("click", function () {
  if (isGameActive) {
    scores[activePlayer] += currentScore;
    document.querySelector(`#score--${activePlayer}`).textContent =
      scores[activePlayer];
    document.querySelector(`#current--${activePlayer}`).textContent = 0;
    currentScore = 0;

    if (scores[activePlayer] >= 100) {
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");

      diceEl.classList.add("hidden");
      isGameActive = false;
    } else {
      changeActivePlayer();
    }
  }
});

function changeActivePlayer() {
  player0.classList.toggle("player--active");
  player1.classList.toggle("player--active");

  activePlayer = activePlayer === 0 ? 1 : 0;
}

newBtn.addEventListener("click", function () {
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.add("player--active");
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove("player--winner");
  isGameActive = true;

  if (activePlayer === 1) {
    changeActivePlayer();
  }

  scores = [0, 0];
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;
  diceEl.classList.add("hidden");
});
