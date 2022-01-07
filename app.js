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
const modal = document.getElementById("modal");
const restartBtn = document.getElementById("restartBtn");
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
  let player;
  if (mask == "cross") {
    player = "1";
  } else {
    player = "2";
  }
  addMask(cell, mask);
  if (winner(mask)) {
    // alert(`player ${player}'s winner`);
    restart(player);
  } else if (draw()) {
    restart();
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
function restart(player) {
  modal.style.display = "flex";
  const newModal = document.createElement("div");
  if (player !== undefined) {
    newModal.innerHTML = player;
  } else {
    newModal.innerHTML = "Draw";
  }
  modal.appendChild(newModal);
  restartBtn.addEventListener("click", function () {
    start();
    newModal.innerHTML = "";
    modal.style.display = "none";
  });
}
