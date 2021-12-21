'use strict';
// Defining secret number 'Between 1 and 20'
let correctNumber = Math.trunc(Math.random() * 20) + 1;

// Setting score/highscore starting point
let score = 10;
let highscore = 0;

// Message function
const displayMessage = function (message) {
    document.querySelector('.message').textContent = message;
};

// Color change function
const changeColor = function (newColor) {
    document.querySelector('.message').style.color = newColor;
};

// Guess function
document.querySelector('.check').addEventListener('click', function () {
    let guessNumber = document.querySelector('.guess').value;
    // empty value
    if (guessNumber == null || guessNumber == '') {
        displayMessage('Please write a number...');
        changeColor('rgb(197, 3, 3)');
    }
    //correct number
    else if (guessNumber == correctNumber) {
        displayMessage('You win! Great Job!');
        document.querySelector('.number').textContent = correctNumber;
        changeColor('rgb(224, 224, 4)');
        document.querySelector('.right').classList.add('win-message');
        document.body.style.backgroundColor = 'rgb(36, 94, 22)';
        document.querySelector('.left').style.display = 'none';
        if (score > highscore) {
            highscore = score;
            document.querySelector('.highscore').textContent = highscore;
        }
    }
    // number is too high/low
    else if (guessNumber !== correctNumber) {
        //score is over 0
        if (score > 1) {
            document.querySelector('.message').textContent =
                guessNumber > correctNumber ? 'Too high...' : 'Too low...';
            changeColor('rgb(224, 224, 4)');
            score--;
            document.querySelector('.score').textContent = score;
        }
        //score reached 0
        else {
            document.querySelector('.score').textContent = 0;
            displayMessage('You lost! Please restart...');
        }
    }
});

//Restart button
document.querySelector('.again').addEventListener('click', function () {
    score = 10;
    correctNumber = Math.trunc(Math.random() * 20) + 1;
    document.querySelector('.score').textContent = score;
    displayMessage('Start playing...');
    document.querySelector('.left').style.display = '';
    document.querySelector('.right').classList.remove('win-message');
    document.querySelector('.guess').value = '';
    changeColor('white');
    document.body.style.backgroundColor = '#222';
    document.querySelector('.number').textContent = '?';
});

//Save value with Enter
let saveButton = document.querySelector('.check');
document.querySelector('.guess').addEventListener('keypress', function (event) {
    if (event.keyCode == 13) {
        saveButton.click();
    }
});
