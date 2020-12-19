//Create a function that grabs the number of snacks from the input and tells you to stop that many times
document.querySelector("#help").addEventListener("click", () => {
  const userVal = Number(document.querySelector("input").value)
  document.querySelector("#stops").textContent = ""
  for (let i = 0; i < userVal; i++) {
    document.querySelector("#stops").textContent += "stop snackin "
  }
})


