'use strict';

// WINNING_COMBOS, check, getNextPlayer, applyMove, createInitialState
// are provided by game.js, loaded before this script.

const cells    = document.querySelectorAll('.cell');
const status   = document.getElementById('status');
const restartBtn     = document.getElementById('restart');
const undoBtn = document.getElementById('undo');
const redoBtn = document.getElementById('redo');


let data = createInitialState();

// Variaveis relacionadas ao undo e redo. Eu queria ter feito uma lista igual data mas sla nao tava indo
let undo_backup_board;
let undo_backup_current;
let undo_backup_gameOver;
let can_undo = false;

let redo_backup_board;
let redo_backup_current;
let redo_backup_gameOver;
let can_redo = false;
let redoOverFlag = false;

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

// New function. Unifies the winning turning cell process in a funciton so I can use it in the handleClick and in the redoGame
function winAnimate(result) {
  data.gameOver = true;
    if (result.winner) {
      result.combo.forEach(i => cells[i].classList.add('winning'));
      setStatus(`Player ${result.winner} wins!`, 'win');
    } else {
      setStatus("It's a draw!", 'draw');
    }
    // Disable all cells. Im removing the disabling part now due to the possibility of undoing of redoing
    // cells.forEach(c => (c.disabled = true));
    return;
}
function handleClick(e) {
  const idx = Number(e.currentTarget.dataset.index);

   if (data.board[idx] || data.gameOver || redoOverFlag) return;


  // Right before applying, lets save a backup. I tried undo_backup = data, idk why it does not work, so i created three ugly variables
  undo_backup_board = data.board;
  undo_backup_current = data.current;
  undo_backup_gameOver = data.gameOver;

  can_undo = true;
  // You shouldnt be able to redo right after making a new move.
  can_redo = false;

  const nextBoard = applyMove(data.board, idx, data.current);
  if (!nextBoard) return;
  data.board = nextBoard;
  render();

  // Animate the placed cell
  cells[idx].classList.add('placed');

  const result = check(data.board);

  // This can be put in a function. will be doing it. winAnimate name
  if (result) {
    winAnimate(result);
    return;
  }

  data.current = getNextPlayer(data.current);
  setStatus(`Player ${data.current}'s turn`);
}

function restartGame() {
  data = createInitialState();
  redoOverFlag = false;
  render();
  setStatus(`Player ${data.current}'s turn`);
}


// Preparando algo para o Undo
function undoGame() {

  // Checks "can_undo". If it has already been undone, cant do it again.

  if (!can_undo) return; 

  // Preparando o possivel redo, agora que este eh possivel

  redo_backup_board = data.board;
  redo_backup_current = data.current;
  redo_backup_gameOver = data.gameOver;

  // Voltando para o backup do redo
  data.board = undo_backup_board;
  data.current = undo_backup_current;
  data.gameOver = undo_backup_gameOver;

  render();
  setStatus(`Player ${data.current}'s turn`);

  // You should always be able to redo after undoing

  can_undo = false;


  can_redo = true;

}

function redoGame() {

  // Checks "can_redo". If it has already been undone, cant do it again.

  if (!can_redo) return; 

  data.board = redo_backup_board;
  data.current = redo_backup_current;
  data.gameOver = redo_backup_gameOver;

  render();
  setStatus(`Player ${data.current}'s turn`);

  can_undo = true;


  can_redo = false;

  // copying the possible winning logic from the click handling. now it has a function named winAnimate(result)
  const result = check(data.board);

  if (result) {
    
    winAnimate(result);
    redoOverFlag = true;
    can_undo = false;
    return;
  }
  
}

// Adding the listeners
cells.forEach(cell => cell.addEventListener('click', handleClick));
undoBtn.addEventListener('click', undoGame);
redoBtn.addEventListener('click', redoGame);
restartBtn.addEventListener('click', restartGame);

// Initial render
render();
setStatus(`Player ${data.current}'s turn`);
