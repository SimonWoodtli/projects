//Write your pseduo code first!
//first get the value as an int from the user
//second convert the value to fahrenheit
//third put the converted value back to the dom
//
document.querySelector("#convert").addEventListener("click", convert)


function convert() {
  let celsius = document.querySelector("#temp").value
  let fahrenheit = celsius * 1.8 + 32
  document.querySelector("#result").innerText = fahrenheit

}
