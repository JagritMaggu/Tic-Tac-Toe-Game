

const cells = document.querySelectorAll('.cell');
const restartBtn = document.getElementById('restart');
const moveSound = document.getElementById('move-sound');
const winSound = document.getElementById('win-sound');
const resetSound = document.getElementById('reset');

let winImageContainer = document.querySelector(".winImg");

let currentPlayer = 'x'; 
let board = ['', '', '', '', '', '', '', '', '']; 

const winPatterns = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

// Initialize game
function startGame() {
  board = ['', '', '', '', '', '', '', '', ''];
  currentPlayer = 'x';
  cells.forEach(cell => {
    cell.textContent = '';
    cell.classList.remove('x', 'o', 'win-cell');
    cell.addEventListener('click', handleCellClick);
    winImageContainer.style.display = "none";
    
    
  
  });
  
}

function handleCellClick(event) {
  const index = event.target.getAttribute('data-cell');
  if (board[index] !== '') return; 

  board[index] = currentPlayer;
  event.target.textContent = currentPlayer.toUpperCase();
  event.target.classList.add(currentPlayer);
  
  moveSound.play(); 

  if (checkWinner()) {
    winImageContainer.style.display="block";
    endGame();
  } else {
    currentPlayer = currentPlayer === 'x' ? 'o' : 'x'; 
  }
}

function checkWinner() {
  for (const pattern of winPatterns) {
    const [a, b, c] = pattern;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      highlightWinningCells(pattern);
      return true;
    }
  }
  return false;
}

function highlightWinningCells(pattern) {
  pattern.forEach(index => {
    cells[index].classList.add('win-cell');
  });
  winSound.play(); 
}

function endGame() {
  cells.forEach(cell => cell.removeEventListener('click', handleCellClick));
  
}

// Restart game
function restartSound(){
    resetSound.play();
    startGame();

}


restartBtn.addEventListener('click', restartSound);

// Start the game
startGame();
