'use strict';

const WINNING_COMBOS = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
  [0, 4, 8], [2, 4, 6],            // diagonals
];

/**
 * Returns the initial game state.
 */
function createInitialState() {
  return {
    board:   Array(9).fill(''),
    current: 'X',
    gameOver: false,
  };
}

/**
 * Returns the next player given the current one.
 * @param {'X'|'O'} current
 * @returns {'X'|'O'}
 */
function getNextPlayer(current) {
  return current === 'X' ? 'O' : 'X';
}

/**
 * Returns a new board with the move applied, or null if the move is invalid.
 * @param {string[]} board
 * @param {number}   index  0-8
 * @param {'X'|'O'} player
 * @returns {string[]|null}
 */
function applyMove(board, index, player) {
  if (index < 0 || index > 8) return null;
  if (board[index] !== '')    return null;
  const next = board.slice();
  next[index] = player;
  return next;
}

/**
 * Checks the board for a winner or draw.
 * @param {string[]} board
 * @returns {{ winner: string, combo: number[] }|{ winner: null, combo: [] }|null}
 *   - Object with winner ('X'|'O') and winning combo indices if someone won.
 *   - Object with winner null and empty combo if the board is full (draw).
 *   - null if the game is still in progress.
 */
function check(board) {
  for (const combo of WINNING_COMBOS) {
    const [a, b, c] = combo;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return { winner: board[a], combo };
    }
  }
  if (board.every(cell => cell !== '')) return { winner: null, combo: [] };
  return null;
}

// Allow require() in Node.js (Jest) while remaining a plain script in the browser.
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { WINNING_COMBOS, createInitialState, getNextPlayer, applyMove, check };
}





// Função undo 
/**
 * o Undo deve desfazer somente a última jogada realizada;
 * após um Undo, o tabuleiro deve voltar à situação anterior àquela jogada e o turno deve retornar ao jogador que a realizou;
 * após realizar um Undo, não deve ser possível desfazer uma segunda jogada consecutivamente;
 * ao desfazer uma jogada que resultou em vitória ou empate, a partida deve voltar a permitir novas jogadas;
 * se uma nova jogada for realizada após um Undo, a jogada anteriormente disponível para Redo não deve mais poder ser refeita;
 * o controle de Undo deve ficar indisponível quando não houver uma jogada que possa ser desfeita;
 * ao iniciar uma nova partida, não deve ser possível desfazer ou refazer jogadas da partida anterior.
 */
function undoMove(board, lastMoveIndex) {
  if (lastMoveIndex < 0 || lastMoveIndex > 8) return null; // se o index do ultimo movimento for invalido
  if (board[lastMoveIndex] === '') return null; // sem movimento para desfazer 
  const next = board.slice(); // cria uma copia do tabuleiro
  next[lastMoveIndex] = ''; //atualiza a posição do ultimo movimento do tabuleiro para vazio, desocupando aquela casa
  return next; // retorna o tabuleiro
}




//Função redo
/**
 * o Redo deve refazer a jogada desfeita pelo Undo, restaurando o tabuleiro e o jogador da vez correspondentes;
 * ao refazer uma jogada que resulte em vitória ou empate, o resultado correspondente deve voltar a ser reconhecido e
 *  a partida deve permanecer encerrada;
 * o controle de Redo deve ficar indisponível quando não houver uma jogada que possa ser refeita;
  ao iniciar uma nova partida, não deve ser possível desfazer ou refazer jogadas da partida anterior.
 * 
*/

function redoMove(board, lastMoveIndex, player) {
  if (lastMoveIndex < 0 || lastMoveIndex > 8) return null;
  if (board[lastMoveIndex] !== '') return null; // se a posição do ultimo movimento não estiver vazia, não é possível refazer
  const next = board.slice(); // cria uma copia do tabuleiro
  next[lastMoveIndex] = player; // atualiza a posição do ultimo movimento do tabuleiro com o jogador que realizou a jogada
  return next; // retorna o tabuleiro
}