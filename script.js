'use strict';

// WINNING_COMBOS, check, getNextPlayer, applyMove, createInitialState
// are provided by game.js, loaded before this script.

const cells    = document.querySelectorAll('.cell');
const status   = document.getElementById('status');
const restartBtn     = document.getElementById('restart');
const undoBtn = document.getElementById('undo');
const redoBtn = document.getElementById('redo')


let data = createInitialState();
const board = document.getElementById('board');

function render() {
  cells.forEach((cell, i) => {
    cell.textContent = data.board[i];
    cell.className   = 'cell' + (data.board[i] ? ` ${data.board[i].toLowerCase()}` : '');
    cell.disabled    = data.board[i] !== '' || data.gameOver;
  });
}

function setStatus(msg, cls = '') {
  status.textContent = msg;
  status.className   = 'status' + (cls ? ` ${cls}` : '');
}


//Função para aplicar o undomove de game.js no jogo

function handleClick(e) {
  const idx = Number(e.currentTarget.dataset.index);
  if (data.board[idx] || data.gameOver) return;

  const nextBoard = applyMove(data.board, idx, data.current);
  if (!nextBoard) return;
  data.board = nextBoard;
  render();

  // Animate the placed cell
  cells[idx].classList.add('placed');

  const result = check(data.board);

  if (result) {
    data.gameOver = true;
    if (result.winner) {
      result.combo.forEach(i => cells[i].classList.add('winning'));
      setStatus(`Player ${result.winner} wins!`, 'win');
    } else {
      setStatus("It's a draw!", 'draw');
    }
    // Disable all cells
    cells.forEach(c => (c.disabled = true));
    return;
  }

  data.current = getNextPlayer(data.current);
  setStatus(`Player ${data.current}'s turn`);
}

function restartGame() {
  data = createInitialState();
  render();
  setStatus(`Player ${data.current}'s turn`);
}


function undoPlay() {
  // Check if there are moves to undo
  if (data.board.every(cell => cell === '')) {
    setStatus("No moves to undo!", 'draw');
    return;
  }
}

cells.forEach(cell => cell.addEventListener('click', handleClick));
restartBtn.addEventListener('click', restartGame);

cells.forEach(cell => cell.addEventListener('click', handleClick));
redoBtn.addEventListener('click', redoPlay);

cells.forEach(cell => cell.addEventListener('click', handleClick));
undoBtn.addEventListener('click', undoPlay); // adicionando os eventos de redo e undo no jogo 

// Initial render
render();
setStatus(`Player ${data.current}'s turn`);


