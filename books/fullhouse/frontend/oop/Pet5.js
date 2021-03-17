#!/usr/bin/node
class Pet {
  constructor(animal, age, breed, sound) {
    this.animal = animal;
    this.age = age;
    this.breed = breed;
    this.sound = sound;
  }
  get activity() {
    const today = new Date();
    const hour = today.getHours();

    if (hour > 8 && hour <= 20) {
      return 'playing';
    } else {
      return 'sleeping';
    }
  }
  get owner() {
    return this._owner;
  }
  // setter alone won't suffice get needed too!
  set owner(owner) {
    this._owner = owner;
    console.log(`setter called: ${owner}`)
  }
  speak() {
    console.log(this.sound);
  }
}

const ernie = new Pet('dog', 1, 'pug', 'yip yip');
const vera = new Pet('dog', 8, 'border collie', 'woof woof');

console.log(ernie);
ernie.owner = "Ashley" // a setter creates values same way as .dot notation
console.log(ernie.owner)
