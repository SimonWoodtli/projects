//Write your pseduo code first!
document.querySelector("button").addEventListener("click", convert)

function convert() {
  const fahrenheit = document.querySelector("input").value
  console.log(fahrenheit)
  const celsius = fahrenheit - 32 * 5/9
  console.log(celsius)
  document.querySelector("h2").textContent = `${celsius} Grad Celsius`
}

