document.querySelector('#check').addEventListener('click', check)

function check() {
  const day = document.querySelector('#day').value
  if (day.toLowerCase() === "monday") {
    console.log("Monday")
  }
  else if (day.toLowerCase() === "tuesday") {
    console.log("It's Class today!")
  }
  else if (day.toLowerCase() === "wednesday") {
    console.log("Wednesday")
  }
  else if (day.toLowerCase() === "thursday") {
    console.log("It's class today!")
  }
  else if (day.toLowerCase() === "friday") {
    console.log("Friday")
  }
  else if (day.toLowerCase() === "saturday") {
    console.log("Saturday")
  }
  else if (day.toLowerCase() === "sunday") {
    console.log("Sunday")
  }
  else {
    console.log("please type in a weekday")
  }
}
