document.querySelector("#check").addEventListener("click", checkDay)

function checkDay() {
  const day = document.querySelector("#day").value.toLowerCase()
  if (day === "monday") {
    document.querySelector("#placeToSee").textContent = "Boring Monday"
  } else if (day === "tuesday" || day === "thurdsday") {
    document.querySelector("#placeToSee").textContent = "Yay class!"
  } else if (day === "wednesday") {
    document.querySelector("#placeToSee").textContent = "just another day"
  } else if (day === "saturday" || day === "sunday") {
    document.querySelector("#placeToSee").textContent = "weee weekend!!!"
  } else {
    document.querySelector("#placeToSee").textContent = "enter a weeekday please!"
  }
}

