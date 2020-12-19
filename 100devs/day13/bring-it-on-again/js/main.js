// *Variables*
// Declare a variable, assign it a value, and alert the value

let x
x = 3
alert(x)
// Create a variable, divide it by 10, and console log the value
let y = 100
y = y/10
console.log(y)
// *Functions*
// Create a function that multiplys 3 numbers and alerts the product
const multiThreeNum = (n1,n2,n3) => alert(n1*n2*n3)
// Create a function that takes in 4 numbers. Add the first two numbers and subtract the next two. Console log the result
const randomCalcFourNum = (n1,n2,n3,n4) => console.log((n1+n2)-n3-n4)
// *Conditionals*
// Create a function that takes in 3 numbers. Starting with 100 add the first number, subtract the second, and divide the third. If the value is greater then 25, console log "WE HAVE A WINNNA"
const randomCalcThreeNum = (n1,n2,n3) => {
  let result = 100
  result = (result+n1-n2)/n3
  if (result > 25) {
    console.log("We have a Winnnnnnnnnnaa")
  }
}
// Create a function that takes in a day of the week. If it is a weekend alert, "weekend" and if not alert "week day". Handle capitilization and if the user does not enter a day of the week alert "Try again!"
const weekday = day => {
  day = day.toLowerCase()
  if (day === "saturday" || day === "sunday") {
    alert("weekend")
  } else if (day === "monday" || day === "tuesday" || day === "wednesday" || day === "thursday" || day === "friday") {
    alert("week day")
  } else {
    alert("Try again!")
  }
}
//*Loops*
//Create a function that takes in a number. Console log all values from 1 to that number or greater, but count by 3
const loopNum = n1 => {
  for (let i = 0; i <= n1; i+=3;) {
    console.log(i)
  }
}
