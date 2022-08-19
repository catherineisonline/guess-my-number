"use strict";
//Text content
const message = document.querySelector(".message");
const scoreText = document.querySelector(".score");
const hiddenNumber = document.querySelector(".hidden-number");
//Sections
const mainContainer = document.querySelector(".main-container");
const rightSection = document.querySelector(".right");
const leftSection = document.querySelector(".left");
const bodyElement = document.body;
//Buttons
const restartBtn = document.querySelector(".again");
const checkBtn = document.querySelector(".submit-number");
//Input
const numberInput = document.querySelector(".number-input");
//Colors
const redColor = "rgb(197, 3, 3)";
const yellowColor = "rgb(224, 224, 4)";
const greenColor = "rgb(36, 94, 22)";
//
let secretNumber = Math.trunc(Math.random() * 20) + 1;
// Setting score/highscore starting point
let score = 10;
let highscore = 0;
// Display message function
const displayMessage = function (messageText) {
  message.textContent = messageText;
};
// Change color function
const changeColor = function (newColor) {
  message.style.color = newColor;
};
//Winner announcement
const winnerAnnouncement = function () {
  //Display winner message
  rightSection.classList.add("win-message");
  displayMessage("You win! Great Job!");
  //Change styles
  changeColor(yellowColor);
  bodyElement.style.backgroundColor = greenColor;
  leftSection.style.display = "none";
  mainContainer.classList.add("winner");
  //Reveal hidden number
  hiddenNumber.value = secretNumber;
  //Confetti
  fireConfetti();
};
// Guess function
checkBtn.addEventListener("click", function () {
  // empty value
  console.log(numberInput.value);
  if (numberInput.value == null || numberInput.value == "") {
    displayMessage("Please write a number...");
    changeColor(redColor);
  }
  //correct number
  else if (numberInput.value == secretNumber) {
    winnerAnnouncement();
    if (score > highscore) {
      highscore = score;
      document.querySelector(".highscore").textContent = highscore;
    }
  }
  // number is too high/low
  else if (numberInput.value !== secretNumber) {
    //score is over 0
    if (score > 1) {
      message.textContent =
        numberInput.value > secretNumber ? "Too high..." : "Too low...";
      changeColor(yellowColor);
      score--;
      scoreText.textContent = score;
    }
    //score reached 0
    else {
      scoreText.textContent = 0;
      displayMessage("You lost! Please restart...");
    }
  }
});

//Restart button
restartBtn.addEventListener("click", function () {
  score = 10;
  secretNumber = Math.trunc(Math.random() * 20) + 1;
  scoreText.textContent = score;
  displayMessage("Start playing...");
  leftSection.style.display = "";
  rightSection.classList.remove("win-message");
  numberInput.value = "";
  changeColor("white");
  bodyElement.style.backgroundColor = "#222";
  hiddenNumber.textContent = "?";
  mainContainer.classList.remove("winner");
});

//Save value with Enter
numberInput.addEventListener("keypress", function (event) {
  if (event.keyCode == 13) {
    checkBtn.click();
  }
});

//Confetti function
const fireConfetti = function () {
  let count = 200;
  let defaults = {
    origin: { y: 0.7 },
  };

  function fire(particleRatio, opts) {
    confetti(
      Object.assign({}, defaults, opts, {
        particleCount: Math.floor(count * particleRatio),
      })
    );
  }

  fire(0.25, {
    spread: 26,
    startVelocity: 55,
  });
  fire(0.2, {
    spread: 60,
  });
  fire(0.35, {
    spread: 100,
    decay: 0.91,
    scalar: 0.8,
  });
  fire(0.1, {
    spread: 120,
    startVelocity: 25,
    decay: 0.92,
    scalar: 1.2,
  });
  fire(0.1, {
    spread: 120,
    startVelocity: 45,
  });
};
