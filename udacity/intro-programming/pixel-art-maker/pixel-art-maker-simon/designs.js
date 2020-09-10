/* Events are about when something happens do something!
   When, not if! user submits size -> call function: makeGrid()
   get the table element in your HTML and create the grid with <tr>/row <td>/cells
*/
function makeGrid(height, width) {
  // get reference to 'pixelCanvas' Id
  const table = document.getElementById("pixelCanvas");
  // never use var in a loop/function, they are function scoped and can
  // not only be re-assigned but also re-declared!
  let grid = "";

  // loop to create rows/rectangle with i to give each row an own id
  for (let i = 0; i < height; i++) {
    grid += '<tr class="row-' + i + '">';
    // loop to create cells/grid with j to give each cell an own id
    for (let j = 0; j < width; j++) {
      grid += '<td class="cell" id="row-' + i + '_cell-' + j + '"></td>';
    }
    grid += '</tr>';
  }
  // assign grid so that it adds it to index.html at the table
  table.innerHTML = grid;

  // Add click-event after the grid cells are created
  clickEventsCells();
}


// adding click events to all cells with a loop that iterates over the
// amount of cells in the currently created grid.
function clickEventsCells() {
  // get reference to 'colorPicker' Id
  const colorPicker = document.getElementById("colorPicker");
  // get reference to all classes with 'cell' in it
  const cells = document.getElementsByClassName('cell');
  for (let i = 0; i < cells.length; i++) {
    // check for all cells if mouseclick happens, when it does
    // change/assign the picked color
    cells[i].addEventListener("click", ev => {
      // use picked color to change when clicked on cell
      ev.target.style.backgroundColor = colorPicker.value;
    });
  }
}


// when submit is clicked assign users values for width and height and call
// makeGrid with these values
sizePicker.addEventListener("submit", ev => {
  /* prevent default behavior of the browser to redirecting to
     a different page to post the form even there is no action/method
     attribute the browser will still attempt to submit the form to
     a different page or same page. (without this the browser refreshes
     the page!)
  */
  ev.preventDefault();
  //console.log("Form has been submitted")
  // get reference to the HTML with inputHeight/Width Id
  const height = document.getElementById('inputHeight').value;
  const width = document.getElementById('inputWidth').value;
  makeGrid(height,width);
});


// create a 10x10 grid as default
makeGrid(10, 10);
