// *Variables*
// Create a variable and console log the value

let x = "Hello World"
console.log(x)

// Create a variable, add 10 to it, and alert the value
let y = 5
y += 10
alert(y)

// *Functions*
// Create a function that subtracts 4 numbers and alerts the difference
function substrNums(a,b,c,d) {
  alert(a-b-c-d)
}
substrNums(20,2,5,6)

// Create a function that divides one number by another and returns the remainder
function numModNum(a,b) {
  return a % b
}

numModNum(5,3)
// *Conditionals*
// Create a function that adds two numbers and if the sum is greater than 50 alert Jumanji
function addNums(a,b) {
  if ( a + b > 50 ) {
    alert("Jumanji")
  }
}
addNums(50+3)
// Create a function that multiplys three numbers and if the product is divisible by 3 alert ZEBRA
function multiNums(a,b,c) {
  if ( a*b*c % 3 === 0 ) {
    alert("ZEBRA")
  }
}
multiNums(3,6,9)

//*Loops*
//Create a function that takes in a word and a number. Console log the word x times where x was the number passed in
function repeatWord(word, num) {
  for (let i = 1; i <= num; i++) {
      console.log(word)
  }
}
repeatWord("Dominos", 21)
