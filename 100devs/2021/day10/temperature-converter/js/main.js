//Write your pseduo code first!

/*
 1. listen to event submit
 2. store value from user
 3. do calculation on top of users value to convert
 4. display converted value in dom
*/

document.querySelector(".btn").addEventListener("click", convert)


function convert() {
  const celsius = document.querySelector("input").value
  const fahrenheit = (celsius*9/5)+32
  document.querySelector("h1").textContent = `${celsius} Grad Celsius are ${fahrenheit} Fahrenheit`
}
