// https://slides.com/leonnoel/javascript-more-basics-again-100devs#/48
// get all the paragraphs from the homework section and make them
// lowercase
let paragraphs = document.querySelectorAll(".sl-block-content > p")
Array.from(paragraphs).forEach( paragraph => paragraph.style.textTransform = "lowercase")
