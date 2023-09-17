let randomNum = parseInt(Math.random() * 100 + 1);


const submit = document.querySelector('#subt');
const userInput = document.querySelector('#guessField');
const guessSlot = document.querySelector('.guesses');
const remainingAttempt = document.querySelector('.lastResult');
const lowOrHi = document.querySelector('.lowOrHi');
const startOver = document.querySelector('.resultParas');

const p = document.createElement('p');

let prevGuess = [];
let numGuess = 1;

let playGame = true;

if (playGame) {
  submit.addEventListener('click', function(e){
    e.preventDefault();
    const guess = parseInt(userInput.value)
    validateGuess(guess);
  })
}

function validateGuess(guess) {
  if ( isNaN(guess)) {
    alert(`Please enter a valid number!`);
  } else if (guess < 1) {
    alert(`Please enter a number greater than 1.`);
  } else if (guess > 100) {
    alert(`Please enter a number less than 100`);
  } else {
    prevGuess.push(guess);
    displayGuess(guess);
    if (numGuess === 11) {
      displayMessage(`Game Over..!  Random number was ${randomNum}`);
      endGame();
    } else {
      checkGuess(guess);
    }
  }
}

function checkGuess(guess) {
  if (guess > randomNum) {
    displayMessage(`Wrong!`);
    displayMessage(`Last guess was Too High..!`);
  }
  else if (guess < randomNum) {
    displayMessage(`Wrong!`);
    displayMessage(`Last guess was Too low..!`);
  } else if (guess === randomNum) {
    displayMessage(`Congratulations! You got it right!`);
    endGame();
  } 
}

function displayGuess(guess) {
  userInput.value = '';
  guessSlot.innerHTML = `${prevGuess}`;
  numGuess++;
  remainingAttempt.innerHTML = `${11 - numGuess}`;
}

function displayMessage(message) {
  lowOrHi.innerHTML = `<h3>${message}</h3>`;
}

function endGame() {
  userInput.setAttribute('disabled', '');
  submit.setAttribute('disabled', '');
  p.classList.add('button');
  p.innerHTML = `<button id="newGame">Start New Game </button>`;
  startOver.appendChild(p);
  playGame = false;
  newGame()
}

function newGame() {
  const newGameBtn = document.querySelector('#newGame');
  newGameBtn.addEventListener('click', function(e) {
    randomNum = parseInt(Math.random() * 100 + 1);
    prevGuess = [];
    numGuess = 1;
    guessSlot.innerHTML = '';
    lowOrHi.innerHTML = '';
    remainingAttempt.innerHTML = `${11 - numGuess}`;
    startOver.removeChild(p);
    userInput.removeAttribute('disabled', '');
    submit.removeAttribute('disabled', '');
    
    playGame = true;
  })
}

