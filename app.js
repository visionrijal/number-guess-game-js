//game values

let min = 1,
    max = 5,
    winningNum = getRandomNumber(min,max),
    guessesLeft = 3;

//ui elements
const game = document.querySelector('#game');
const minNum = document.querySelector('.min-num');
const maxNum = document.querySelector('.max-num');
const guessBtn = document.querySelector('#guess-btn');
const guessInput = document.querySelector('#guess-input');
const message = document.querySelector('.message');

//focus guess input UI on load
document.addEventListener('DOMContentLoaded', () => { guessInput.focus() })

//play again event listener
game.addEventListener('mousedown', function(e){
    if(e.target.className === 'play-again'){
        window.location.reload();
    }
})

//assing UI min and max
minNum.textContent = min;
maxNum.textContent = max;

//Listen for Guess
guessBtn.addEventListener('click', () => {
    guessInput.focus();
    let guess = parseInt(guessInput.value);
    //focus ui input after submit


    // validate
    if (isNaN(guess) || guess < min || guess > max) {
        setMessage(`Please enter a number between ${min} & ${max}`, 'red');
    } else {
        //check if won
        if (guess === winningNum) {
            gamerOver(true, `${winningNum} is correct, you won`);
            //if incorrect guess
        } else {
            guessesLeft -= 1;
            //no guesses left
            if (guessesLeft === 0) {
                gamerOver(false, ` you lose correct number is ${winningNum}!`);
                //guesses availabe
            } else {
                setMessage(`${guess} is not correct, guesses left ${guessesLeft}`,'red');
            }
        }
    }
    guessInput.value = '';
    // guessInput.focus();
});
//game over function
function gamerOver(won, msg) {
    guessInput.disabled = true;
    let color;
    won === true ? color = 'green' : color = 'red'; 
    setMessage(msg, color);
    guessBtn.value = 'Play Again';
    guessBtn.className += 'play-again';
}
//set message
function setMessage(msg, color) {
    guessInput.style.borderColor = color;
    message.style.color = color;
    message.textContent = msg;
}
//get winning number
function getRandomNumber(min,max){
   return Math.floor(Math.random()*(max-min+1)+min);
}
