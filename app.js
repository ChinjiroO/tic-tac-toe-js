const myConst = {
  cellElement: document.querySelectorAll(".cell"),
  playerTurn: document.getElementById("playerTurn"),
  winning_combinations: [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
  ],
};

const arr = [...myConst.cellElement];
let turn = true;
start();

function start() {
  arr.forEach(function (cell, index) {
    console.log(`${index}: ${cell.classList.length}`);
    myConst.playerTurn.innerHTML = "Player 1 turn";
    cell.classList.remove("cross");
    cell.classList.remove("circle");
    cell.removeEventListener("click", handleClick);
    cell.addEventListener("click", handleClick, { once: true });
    // TODO: check classList of element if !== circle then add circle class
  });
}
function handleClick(e) {
  const cell = e.target;
  const mask = turn ? "cross" : "circle";
  addMask(cell, mask);
  if (!turn) {
    myConst.playerTurn.innerHTML = "Player 1 turn";
  } else {
    myConst.playerTurn.innerHTML = "Player 2 turn";
  }
  turn = !turn;

  // * comment line below------
  window.console.clear();
  arr.forEach(function (cell, index) {
    console.log(`${index}: ${cell.classList.length}`);
  });
  // * comment line above------

  draw();
  if (draw()) {
    window.alert("draw!!!");
  }
}
function draw(a) {
  // every cell that has length of classList > 2
  return arr.every((cell) => cell.classList.length > 2);
}

function addMask(cell, mask) {
  cell.classList.add(mask);
}
