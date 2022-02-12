document.querySelector("button").addEventListener("click", convert)

function convert() {
  const fahrenheit = document.querySelector("input").value
  const celsius = (fahrenheit-32)*5/9
  document.querySelector("h1").textContent = `The current temperature is ${fahrenheit}°F or ${celsius}°C`
}

