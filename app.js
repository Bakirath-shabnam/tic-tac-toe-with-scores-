const boxes = document.querySelectorAll('.box');
const turnDisplay = document.getElementById('turn');
const playAgainButton = document.getElementById('play-again');
const scoreXDisplay = document.getElementById('score-x');
const scoreODisplay = document.getElementById('score-o');
const winningConditionText = document.querySelector('.winning-condition');

let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let scoreX = 0;
let scoreO = 0;
const winningScore = 5;

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

function handleClick(index) {
    // Preventing a click on an already filled box
    if (board[index] !== '' || checkWin()) return;

    board[index] = currentPlayer;
    boxes[index].innerText = currentPlayer;

    // Check if the current player has won
    if (checkWin()) {
        highlightWinningCombination();
        // Update the score
        if (currentPlayer === 'X') {
            scoreX++;
            scoreXDisplay.innerText = scoreX;
            winningConditionText.innerText = `X Wins this round!`;
        } else {
            scoreO++;
            scoreODisplay.innerText = scoreO;
            winningConditionText.innerText = `O Wins this round!`;
        }
        // Check for overall winner
        checkOverallWinner();
    } else if (board.every(box => box !== '')) {
        // Check for a tie
        winningConditionText.innerText = 'It\'s a tie!';
    } else {
        // Switch turns
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        turnDisplay.innerText = `${currentPlayer}'s Turn`; // Updated turn display
    }
}

function checkWin() {
    return winningConditions.some(condition => {
        const [a, b, c] = condition;
        return board[a] === currentPlayer && board[b] === currentPlayer && board[c] === currentPlayer;
    });
}

function highlightWinningCombination() {
    winningConditions.forEach(condition => {
        const [a, b, c] = condition;
        if (board[a] === currentPlayer && board[b] === currentPlayer && board[c] === currentPlayer) {
            boxes[a].classList.add('winner');
            boxes[b].classList.add('winner');
            boxes[c].classList.add('winner');
        }
    });
}

function resetGame() {
    // Reset the board for a new round but keep the scores
    board = ['', '', '', '', '', '', '', '', ''];
    boxes.forEach(box => {
        box.innerText = '';
        box.classList.remove('winner');
    });
    currentPlayer = 'X';
    turnDisplay.innerText = `${currentPlayer}'s Turn`; // Updated turn display
    winningConditionText.innerText = 'Winning Condition: First to 5 points'; // Reset winning condition message
    playAgainButton.style.display = 'none'; // Hide Play Again button until needed
}

function displayOverallWinner(winner) {
    // Hide game board and display winner
    turnDisplay.innerText = `${winner} wins the game!`; // Show the overall winner
    winningConditionText.innerText = ''; // Clear the winning condition message
    playAgainButton.style.display = 'block'; // Show the Play Again button
}

function checkOverallWinner() {
    if (scoreX === winningScore) {
        displayOverallWinner('X');
    } else if (scoreO === winningScore) {
        displayOverallWinner('O');
    } else {
        // Show the Play Again button after each round
        playAgainButton.style.display = 'block';
    }
}

// Attach event listeners to each box
boxes.forEach((box, index) => {
    box.addEventListener('click', () => handleClick(index));
});

// Attach event listener for the Play Again button
playAgainButton.addEventListener('click', () => {
    // Reset the game board for a new round but keep the scores
    resetGame(); // Reset the game board
    document.getElementById('game-board').style.display = 'grid'; // Show the game board
    turnDisplay.innerText = `X's Turn`; // Reset turn display
});

// Initialize the game on load
resetGame();
