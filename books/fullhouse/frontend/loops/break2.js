#!/usr/bin/node
for ( let i = 5; i >= 1; i-- ) {
  let guess = prompt(`Enter the secret word. You have ${i} tries.`);
  if ( guess === secretWord ) {
    message = 'Welcome to the secret loop world!';
    break;  // immediately terminate the loop
  }
}

alert(message);
