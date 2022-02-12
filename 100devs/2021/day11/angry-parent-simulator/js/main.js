document.querySelector("#yell").addEventListener("click", printMsg)


function printMsg() {
  const firstName = document.querySelector("#firstName").value
  const firstMiddle = document.querySelector("#firstMiddle").value
  const lastMiddle = document.querySelector("#lastMiddle").value
  const lastName = document.querySelector("#lastName").value
  document.querySelector("#placeToYell").textContent = `${firstName} ${firstMiddle} ${lastMiddle} ${lastName}`
}
