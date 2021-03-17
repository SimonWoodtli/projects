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
  // get & set are both required
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

class Owner {
  constructor(name, address) {
    this.name = name;
    this.address = address;
  }
  set phone(phone) {
    const phoneNormalized = phone.replace(/[^0-9]/g, "");
    this._phone = phoneNormalized
  }
  get phone() {
    return this._phone
  }
}

const ernie = new Pet('dog', 1, 'pug', 'yip yip');
const vera = new Pet('dog', 8, 'border collie', 'woof woof');

ernie.owner = new  Owner("Ashley", "123 Main Street") // ernie.owner represents an object now
ernie.owner.phone = "(555) 555-5555"
console.log(ernie.owner)
console.log(ernie.owner.phone)
console.log(ernie.owner.name)
