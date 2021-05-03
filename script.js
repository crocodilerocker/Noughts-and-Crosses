const X_CLASS = 'x';
const O_CLASS = 'o';
const WINNING_COMBINATIONS = [
    [0, 1, 2], 
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]
const winningMessageElement = document.getElementById('winningMessage');
const winningMessageTextElement = document.querySelector('[data-winning-message-text]')
const cellElements = document.querySelectorAll('[data-cell]');
const board = document.getElementById('board');
const restartButton = document.getElementById('restartButton');
let oTurn;
const playerA = {
    name: '',
    id: document.getElementById('playerA'),
    score: 0
}
const playerB = {
    name: '',
    id: document.getElementById('playerB'),
    score: 0
}

document.getElementById('startupForm').style.display = 'flex';
document.getElementById('submit').onclick = pressPlay;

function pressPlay(event) {
    playerA.name = document.getElementById('playerAName').value ? document.getElementById('playerAName').value : 'Player A'; 
    playerB.name = document.getElementById('playerBName').value ? document.getElementById('playerBName').value : 'Player B';
    document.getElementById('startupForm').style.display = 'none';
    startGame();
}

function startGame() {
    oTurn = false;
    cellElements.forEach(cell => {
        cell.classList.remove(X_CLASS);
        cell.classList.remove(O_CLASS);
        cell.addEventListener('click', handleClick, {once: true})
    })
    setBoardHoverClass();
    playerA.id.innerHTML = `${playerA.name} - ${playerA.score}`;
    playerB.id.innerHTML = `${playerB.name} - ${playerB.score}`;
    formatScores();
    winningMessageElement.classList.remove('show');
}

function handleClick(e) {
    const cell = e.target;
    const currentClass = oTurn ? O_CLASS : X_CLASS;
    placeMark(cell, currentClass)
    if(checkWin(currentClass)) {
        endGame(false);
        !oTurn ? playerA.score++: playerB.score++;
    } else if (isDraw()) {
        endGame(true) 
    } else {
        swapTurns();
        setBoardHoverClass();
    }
}

function placeMark(cell, currentClass) {
    cell.classList.add(currentClass)
}

function swapTurns() {
    oTurn = !oTurn;
    formatScores();
}

function setBoardHoverClass() {
    board.classList.remove(X_CLASS);
    board.classList.remove(O_CLASS);
    if (oTurn) {
        board.classList.add(O_CLASS);
    } else {
        board.classList.add(X_CLASS);
    }
}

function checkWin(currentClass) {
    return WINNING_COMBINATIONS.some(combination => {
        return combination.every(index => {
            return cellElements[index].classList.contains(currentClass);
        })
    })
}

function isDraw() {
    return [...cellElements].every(cell => {
        return cell.classList.contains(X_CLASS) || cell.classList.contains(O_CLASS);
    })
}

function endGame(draw) {
    if (draw) {
        winningMessageTextElement.innerHTML = 'Draw!';
    } else {
        winningMessageTextElement.innerHTML = `${!oTurn ? `${playerA.name}` : `${playerB.name}`} Wins!`;
    }
    winningMessageElement.classList.add('show');
}

function formatScores() {
    if(oTurn) {
        playerA.id.style.color = 'lightgray';
        playerB.id.style.color = 'black';
    } else {
        playerA.id.style.color = 'black';
        playerB.id.style.color = 'lightgray';
    }
}

restartButton.addEventListener('click', startGame);