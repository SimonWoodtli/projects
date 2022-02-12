//Create a conditonal that checks their age
let check = () => {
  let age = Number(document.querySelector("#danceDanceRevolution").value)
  if (age < 16) {
    return "you aint old enough to drive bro!"
  } else if (age < 18) {
      return "bounce hater"
  } else if (age < 21) {
      return "no booze for you"
  } else if (age < 25) {
      return "sorry no cheap cars for you"
  } else if (age < 30) {
      return "sorry no fancy cars for rent"
  } else if (age >= 30) {
      return "game over"
  }
}


//If under 16, tell them they can not drive
//If under 18, tell them they can't hate from outside the club, because they can't even get in
//If under 21, tell them they can not drink
//If under 25, tell them they can not rent cars affordably
//If under 30, tell them they can not rent fancy cars affordably
//If under over 30, tell them there is nothing left to look forward too


//--- Harder
//On click of the h1
//Take the value from the input
//Place the result of the conditional in the paragraph
document.querySelector("h1").addEventListener("click", () => {
  document.querySelector("p").textContent = check()
})



