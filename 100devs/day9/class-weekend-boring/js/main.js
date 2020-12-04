document.querySelector('#check').addEventListener('click', check)

function check() {

  const dayCase = document.querySelector('#day').value
  const day = dayCase.toLowerCase()

  //Conditionals go here
  if (day  === "monday" || day === "friday") {
    alert("it's a weekday")
  } else if (day === "saturday" || day === "sunday") {
    alert("yay finally weekend")
  } else if (day === "tuesday" || day === "thursday") {
    alert("class again...")
  } else {
    alert("another boring day")
  }

}
