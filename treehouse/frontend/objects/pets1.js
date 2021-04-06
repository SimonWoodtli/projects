/*
  Create an array of 'pet' objects.
  Each object should have the following properties:
  name, type, breed, age, and photo
*/
const pets = [
  {
    name: 'Joey',
    type: 'Dog',
    breed: 'Australian Shepherd',
    age: 8,
    photo: 'img/aussie.jpg'
  },
  {
    name: 'Patches',
    type: 'Cat',
    breed: 'Domestic Shorthair',
    age: 1,
    photo: 'img/tabby.jpg'
  },
  {
    name: 'Pugsley',
    type: 'Dog',
    breed: 'Pug',
    age: 6,
    photo: 'img/pug.jpg'
  },
  {
    name: 'Simba',
    type: 'Cat',
    breed: 'Persian',
    age: 5,
    photo: 'img/persian.jpg'
  },
  {
    name: 'Comet',
    type: 'Dog',
    breed: 'Golden Retriever',
    age: 3,
    photo: 'img/golden.jpg'
  }
];


let name = []
let type = []
//let breed = []
let age = []
let photo = []
for (let i in pets) {
  name.push(`<h2>${pets[i].name}</h2>`)
  type.push(`<h3>${pets[i].type} | ${pets[i].breed}</h3>`)
  age.push(`<p>Age: ${pets[i].age}</p>`)
  //breed.push(`${pets[i].breed}`)
  photo.push(`<img src="${pets[i].photo}" alt="${pets[i].breed}">`)
  document.querySelector("main").innerHTML += `${name[i]} ${type[i]} ${age[i]} ${photo[i]}`
}
//
//
console.log(name)
console.log(type)
console.log(age)
console.log(photo)
//console.log(breed) not needed
