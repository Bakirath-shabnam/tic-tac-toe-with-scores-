const boxes = document.querySelectorAll('.box');
const turnDisplay = document.getElementById('turn');
const playAgainButton = document.getElementById('play-again');
const scoreXDisplay = document.getElementById('score-x');
const scoreODisplay = document.getElementById('score-o');
const winningConditionText = document.querySelector('.winning-condition');
const winnerMessage = document.getElementById('winner-message');

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
    if (board[index] !== '' || checkWin()) return;

    board[index] = currentPlayer;
    boxes[index].innerText = currentPlayer;

    if (checkWin()) {
        highlightWinningCombination();
        if (currentPlayer === 'X') {
            scoreX++;
            scoreXDisplay.innerText = scoreX;
            checkOverallWinner('X');
        } else {
            scoreO++;
            scoreODisplay.innerText = scoreO;
            checkOverallWinner('O');
        }
    }

    if (board.every(box => box !== '') && !checkWin()) {
        endGame("It's a Tie!");
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    turnDisplay.innerText = `${currentPlayer}'s Turn`;
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

function checkOverallWinner(player) {
    if (scoreX >= winningScore) {
        endGame(`X Wins the Game!`);
    } else if (scoreO >= winningScore) {
        endGame(`O Wins the Game!`);
    } else {
        playAgainButton.style.display = 'block';
    }
}

function endGame(message) {
    document.getElementById('game-board').style.display = 'none';
    winnerMessage.innerText = message;
    winnerMessage.style.display = 'block';
    playAgainButton.style.display = 'block';
    document.querySelector('.score-board').style.display = 'none';
    turnDisplay.style.display = 'none';
    winningConditionText.style.display = 'none';
}

function resetGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    boxes.forEach(box => {
        box.innerText = '';
        box.classList.remove('winner');
    });
    currentPlayer = 'X';
    turnDisplay.innerText = `${currentPlayer}'s Turn`;
    winningConditionText.innerText = 'First to score 5 wins';
    document.getElementById('game-board').style.display = 'grid';
    winnerMessage.style.display = 'none';
    playAgainButton.style.display = 'none';
    document.querySelector('.score-board').style.display = 'flex';
    turnDisplay.style.display = 'block';
    winningConditionText.style.display = 'block';
}

boxes.forEach((box, index) => {
    box.addEventListener('click', () => handleClick(index));
});

playAgainButton.addEventListener('click', () => {
    if (scoreX >= winningScore || scoreO >= winningScore) {
        scoreX = 0;
        scoreO = 0;
        scoreXDisplay.innerText = scoreX;
        scoreODisplay.innerText = scoreO;
    }
    resetGame();
    winnerMessage.style.display = 'none';
});

resetGame();
