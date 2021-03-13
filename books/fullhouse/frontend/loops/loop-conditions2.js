const main = document.querySelector('main');
const randomNumber = getRandomNumber(10);
let guess;
let attempts = 0;

function getRandomNumber(upper) {
  return Math.floor( Math.random() * upper ) + 1;
}

do {
  guess = prompt('I am thinking of a number between 1 and 10. What is it?');
  attempts++;
  if ( parseInt(guess) === randomNumber ) {
    main.innerHTML = `
      <h1>You guessed the number!</h1>
      <h2>It took you ${attempts} tries to guess the number ${randomNumber}.</h2>
    `;
  }
} while ( parseInt(guess) !== randomNumber );



