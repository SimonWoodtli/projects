const contestants = document.querySelectorAll(".contestant")

Array.from(contestants).forEach( contestant => contestant.addEventListener("click", winner) )

function winner(click) {
  if (click.target.classList.contains("rose")) {
    document.querySelector("#nikki").classList.toggle("hidden")
  } else {
    alert("wrong!")
  }
}
