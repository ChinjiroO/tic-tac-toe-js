const cellElement = document.querySelectorAll(".cell");
const arr = [...cellElement];
const playerTurn = document.getElementById("playerTurn");
const winning_combinations = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];
let turn = true;
start();

function start() {
  arr.forEach(function (cell, index) {
    playerTurn.innerHTML = "Player 1 turn";
    cell.classList.remove("cross");
    cell.classList.remove("circle");
    cell.removeEventListener("click", handleClick);
    cell.addEventListener("click", handleClick, { once: true });
  });
}
function handleClick(e) {
  const cell = e.target;
  const mask = turn ? "cross" : "circle";
  addMask(cell, mask);
  if (winner(mask)) {
    start();
  } else if (draw()) {
    window.alert("draw!!!");
  } else {
    player_turn();
  }
}

function draw() {
  //* every cell that has length of classList > 2
  return arr.every((cell) => cell.classList.length > 2);
}

function player_turn() {
  if (arr.every((cell) => cell.classList.length > 2)) {
    playerTurn.innerHTML = "end";
  } else {
    if (!turn) {
      playerTurn.innerHTML = "Player 1 turn";
    } else {
      playerTurn.innerHTML = "Player 2 turn";
    }
    turn = !turn;
  }
}
function winner(mask) {
  return winning_combinations.some((combination) => {
    return combination.every((index) => {
      return cellElement[index].classList.contains(mask);
    });
  });
}

function addMask(cell, mask) {
  cell.classList.add(mask);
}
