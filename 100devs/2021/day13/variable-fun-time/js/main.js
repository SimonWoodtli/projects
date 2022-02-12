//--- Easy
//create a variable and assign it a number
let num = 20

//minus 10 from that number
num -= 10


//print that number to the console
console.log(num)

//--- Medium
//create a variable that holds a value from the input
let userVal = document.querySelector("#danceDanceRevolution").value

//add 25 to that number
userVal += 25

//alert that number
alert(userVal)

//--- Hard
//create a variable that holds the h1
const title = document.querySelector("h1")

//add an event listener to that element that console logs the sum of the two previous variables
title.addEventListener("click",  () => {
  console.log(userVal+num)
})

