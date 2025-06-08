export default {
  draw,
  highlight,
};

var diagonals = [];
var highlighted=[] ;
var tileDiagonals = new Map();

// ****************************

function draw(boardEl) {
  //setting my diagonals data structure
  for (let i = 0; i < 30; i++) {
    diagonals.push([]);
  }

  for (let i = 0; i < 8; i++) {
    let rowEl = document.createElement("div");
    for (let j = 0; j < 8; j++) {
      let tileEl = document.createElement("div");

      rowEl.appendChild(tileEl);
      let majorDiagonal = diagonals[7 - (i - j)];
      let minorDiagonal = diagonals[15 + (i + j)];

      majorDiagonal.push(tileEl);
      minorDiagonal.push(tileEl);
      tileDiagonals.set(tileEl, [majorDiagonal, minorDiagonal]);
    }
    boardEl.appendChild(rowEl);
  }
}

function highlight(tileEl) {
  //clear currently highlighted
  for (let diagonal of highlighted) {
      for (let el of diagonal) {
		el.classList.remove("highlighted");
      }
    }
  if (tileEl) {
     highlighted = tileDiagonals.get(tileEl);

    for (let diagonal of highlighted) {
      for (let el of diagonal) {
		el.classList.add("highlighted");
      }
    }
  }
}
