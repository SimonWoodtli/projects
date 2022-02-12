document.querySelector("#pumpkin").addEventListener("click", setZero)
document.querySelector("#dominosPizza").addEventListener("click", addThree)
document.querySelector("#zebra").addEventListener("click", addNine)
document.querySelector("#cantThinkOfAnything").addEventListener("click", minusTwo)
document.querySelector("#rocka").addEventListener("click", multipleTwo)
let total = 0

function setZero() {
  total = 0
  document.querySelector("#placeToPutResult").textContent = total
}
function addThree() {
  total += 3
  document.querySelector("#placeToPutResult").textContent = total
}
function addNine() {
  total += 9
  document.querySelector("#placeToPutResult").textContent = total
}
function minusTwo() {
  total -= 2
  document.querySelector("#placeToPutResult").textContent = total
}
function multipleTwo() {
  total *= 2
  document.querySelector("#placeToPutResult").textContent = total
}
