document.querySelector("#purple").addEventListener("click", purple)
document.querySelector("#green").addEventListener("click", green)
document.querySelector("#blue").addEventListener("click", blue)
document.querySelector("#gray").addEventListener("click", gray)

function purple() {
  document.querySelector("body").style.color = "white"
  document.querySelector("body").style.backgroundColor = "rgba(241,63,247,1)"
}
function green() {
  document.querySelector("body").style.color = "white"
  document.querySelector("body").style.backgroundColor = "rgba(0,253,81,1)"
}
function blue() {
  document.querySelector("body").style.color = "white"
  document.querySelector("body").style.backgroundColor = "rgba(0,254,255)"
}
function gray() {
  document.querySelector("body").style.color = "white"
  document.querySelector("body").style.backgroundColor = "gray"
}
