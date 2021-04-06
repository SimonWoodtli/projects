// 1. Create a multidimensional array to hold quiz questions and answers
const quiz = [
  ["What's your Name", "老板"]
  ["Who is watching?", "大哥盯着你"]
  ["Why do birds fly?", "Because they are awesome!"]
]

// 2. Store the number of questions answered correctly
const correctAnswer = ""

/*
  3. Use a loop to cycle through each question
      - Present each question to the user
      - Compare the user's response to answer in the array
      - If the response matches the answer, the number of correctly
        answered questions increments by 1
*/
for (let i = 0; i < quiz.length; i++) {
  const answer = prompt(quiz[i][0])
  if (answer === quiz[i][1]) {
    correctAnswer += 1
  }
}

// 4. Display the number of correct answers to the user
let html = `
  <h1>You got ${correctAnswer} question(s) correct</h1>
`

document.querySelector("main").innerHTML = html
