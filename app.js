var myConst = {
  cellElement: document.querySelectorAll(".cell"),
  playerTurn: document.getElementById("playerTurn"),
};
let turn = true;
start();

function start() {
  myConst.cellElement.forEach(function (cell) {
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
}

function addMask(cell, mask) {
  cell.classList.add(mask);
}
