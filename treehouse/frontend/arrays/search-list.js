#!/usr/bin/node
const inStock = ['pizza', 'cookies', 'eggs', 'apples', 'milk', 'cheese', 'bread', 'lettuce', 'carrots', 'broccoli', 'potatoes', 'crackers', 'onions', 'tofu', 'limes', 'cucumbers'];
const search = prompt('Search for a product.').toLowerCase();
let message;

if { !search ) {
  message = `<strong>In stock:</strong> ${inStock.join(", ")}`
else if ( inStock.includes(search) ) {
  message = `Yes, we have <strong>${search}</strong>. It's #${inStock.indexOf(search) + 1} on the list!`
} else {
  message = `Sorry, we don not have <strong>${search}</strong>.`
}

document.querySelector("main").innerHTML = `<p>${message}</p>`
