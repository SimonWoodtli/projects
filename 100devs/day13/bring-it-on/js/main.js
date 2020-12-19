// *Variables*
// Create a variable and console log the value
const x = 0
console.log(x)

// Create a variable, add 10 to it, and alert the value
const num = 5
num += 10
// *Functions*
// Create a function that subtracts 4 numbers and alerts the difference
const subFourNum = (n1,n2,n3,n4) => alert(n1-n2-n3-n4)
// Create a function that divides one number by another and returns the remainder
const remainder = (n1,n2) => n1 % n2
// *Conditionals*
// Create a function that adds two numbers and if the sum is greater than 50 alert Jumanji
const addTwoNum = (n1,n2) => {
  if (n1+n2 > 50) {
    alert("Jumanji")
  }
}
// Create a function that multiplys three numbers and if the product is divisible by 3 alert ZEBRA
const multiThreeNum = (n1,n2,n3) => {
  if (n1*n2*n3 % 3 === 0) {
    alert("Zebra")
  }
}
//*Loops*
//Create a function that takes in a word and a number. Console log the word x times where x was the number passed in
const concatonator = (word, n1) => {
  for (let i = 0; i < n1; i++) {
    console.log(word)
  }
}
