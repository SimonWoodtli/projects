let total = 0

document.querySelector('#pumpkin').addEventListener('click', makeZero)
document.querySelector('#dominosPizza').addEventListener('click', jumanji)
document.querySelector('#zebra').addEventListener('click', add9)
document.querySelector('#cantThinkOfAnything').addEventListener('click', sub2)
document.querySelector('#add15').addEventListener('click', addFiveteen)
document.querySelector('#add30').addEventListener('click', addThirty)

function makeZero() {
  total = 0
  document.querySelector('#placeToPutResult').innerText = total
}

function jumanji() {
  total = total + 3
  document.querySelector('#placeToPutResult').innerText = total
}

function add9() {
  total = total + 9
  document.querySelector('#placeToPutResult').innerHTML = total
}

function sub2() {
  total = total - 2
  document.querySelector('#placeToPutResult').innerHTML = total
}
function addFiveteen() {
  total = total + 15
  document.querySelector('#placeToPutResult').innerHTML = total
}
function addThirty() {
  total = total + 30
  document.querySelector('#placeToPutResult').innerHTML = total
}
