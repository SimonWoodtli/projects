/* Select color input
//
// Select size input

// When size is submitted by the user, call makeGrid()
//
Define your variables by selecting the DOM elements that the user will interact with. This is where your JavaScript variables can come into play! For instance, the submit button, the table, and the color picker need to be accessed. The value of the color selected needs to be stored as well, since the clicked cell in the table needs to be set to the selected color.
Add event listeners to the relevant DOM elements, so that user input can be color values and table sizes can be dynamically set by the user.
Set the size of the cross stitch canvas as an _N_ by _M_ grid with the makeGrid() function. Use your knowledge of JavaScript loops to dynamically clear and create the table based on user input. Each cell should have an event listener that sets the background color of the cell to the selected color.
*/

function makeGrid() {
  // get the table into js
  let grabTable = document.getElementById("pixelCanvas");
  // add some rows and cells to it
  for (let x = 0; x < 11; x++) {
    let makeRow = document.createElement("tr");
    makeRow.id = "row" + x;

    grabTable.appendChild(makeRow);
    let grabRow = document.getElementById("row" + x);

    for (let y = 0; y < 11; y++) {
      let makeCell = document.createElement("td");

      grabRow.appendChild(makeCell);
    }
  }
}



