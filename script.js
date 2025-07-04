const board = document.getElementById("gameBoard");
const status = document.getElementById("status");

let currentPlayer = "X";
let gameState = Array(9).fill("");
let gameActive = true;

const winningConditions = [
  [0,1,2], [3,4,5], [6,7,8], // rows
  [0,3,6], [1,4,7], [2,5,8], // columns
  [0,4,8], [2,4,6]           // diagonals
];

// Create 9 cells
for (let i = 0; i < 9; i++) {
  const cell = document.createElement("div");
  cell.classList.add("cell");
  cell.setAttribute("data-index", i);
  cell.addEventListener("click", handleCellClick);
  board.appendChild(cell);
}

function handleCellClick(e) {
  const index = e.target.getAttribute("data-index");
  if (!gameActive || gameState[index] !== "") return;

  gameState[index] = currentPlayer;
  e.target.textContent = currentPlayer;

  if (checkWin()) {
    status.textContent = `Player ${currentPlayer} wins!`;
    gameActive = false;
  } else if (!gameState.includes("")) {
    status.textContent = "It's a draw!";
    gameActive = false;
  } else {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    status.textContent = `Player ${currentPlayer}'s turn`;
  }
}

function checkWin() {
  return winningConditions.some(condition => {
    const [a, b, c] = condition;
    return (
      gameState[a] &&
      gameState[a] === gameState[b] &&
      gameState[b] === gameState[c]
    );
  });
}

function restartGame() {
  gameState = Array(9).fill("");
  currentPlayer = "X";
  gameActive = true;
  document.querySelectorAll(".cell").forEach(cell => (cell.textContent = ""));
  status.textContent = `Player ${currentPlayer}'s turn`;
}
