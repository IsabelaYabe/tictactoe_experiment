'use strict';

// check, createInitialState, playTurn, undoTurn and redoTurn are provided by
// game.js, which is loaded before this script.

const cells = document.querySelectorAll('.cell');
const status = document.getElementById('status');
const restartBtn = document.getElementById('restart');
const undoBtn = document.getElementById('undo');
const redoBtn = document.getElementById('redo');

let data = createInitialState();

function render() {
  cells.forEach((cell, i) => {
    cell.textContent = data.board[i];
    cell.className = 'cell' + (data.board[i] ? ` ${data.board[i].toLowerCase()}` : '');
    cell.disabled = data.board[i] !== '' || data.gameOver;
  });

  undoBtn.disabled = data.lastMove === null;
  redoBtn.disabled = data.undoneMove === null;
}

function setStatus(message, className = '') {
  status.textContent = message;
  status.className = 'status' + (className ? ` ${className}` : '');
}

function renderGame() {
  render();

  const result = check(data.board);
  if (!result) {
    setStatus(`Player ${data.current}'s turn`);
    return;
  }

  if (result.winner) {
    result.combo.forEach(i => cells[i].classList.add('winning'));
    setStatus(`Player ${result.winner} wins!`, 'win');
  } else {
    setStatus("It's a draw!", 'draw');
  }
}

function handleClick(event) {
  const index = Number(event.currentTarget.dataset.index);
  const next = playTurn(data, index);
  if (!next) return;

  data = next;
  renderGame();
  cells[index].classList.add('placed');
}

function undoPlay() {
  const previous = undoTurn(data);
  if (!previous) return;

  data = previous;
  renderGame();
}

function redoPlay() {
  const next = redoTurn(data);
  if (!next) return;

  data = next;
  renderGame();
}

function restartGame() {
  data = createInitialState();
  renderGame();
}

cells.forEach(cell => cell.addEventListener('click', handleClick));
restartBtn.addEventListener('click', restartGame);
undoBtn.addEventListener('click', undoPlay);
redoBtn.addEventListener('click', redoPlay);

renderGame();
