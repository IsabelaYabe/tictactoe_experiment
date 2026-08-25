'use strict';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Build a board from a 9-char string (' ', 'X', 'O'). */
function boardFrom(str) {
  return str.split('').map(c => (c === ' ' ? '' : c));
}

// ---------------------------------------------------------------------------
// WINNING_COMBOS
// ---------------------------------------------------------------------------

describe('WINNING_COMBOS', () => {
  test('has exactly 8 combos', () => {
    expect(WINNING_COMBOS).toHaveLength(8);
  });

  test('every combo contains exactly 3 unique indices in range 0-8', () => {
    WINNING_COMBOS.forEach(combo => {
      expect(combo).toHaveLength(3);
      combo.forEach(i => {
        expect(i).toBeGreaterThanOrEqual(0);
        expect(i).toBeLessThanOrEqual(8);
      });
      expect(new Set(combo).size).toBe(3);
    });
  });
});

// ---------------------------------------------------------------------------
// createInitialState
// ---------------------------------------------------------------------------

describe('createInitialState', () => {
  test('returns a board of 9 empty strings', () => {
    const { board } = createInitialState();
    expect(board).toHaveLength(9);
    expect(board.every(c => c === '')).toBe(true);
  });

  test('first player is X', () => {
    expect(createInitialState().current).toBe('X');
  });

  test('gameOver is false', () => {
    expect(createInitialState().gameOver).toBe(false);
  });

  test('each call returns a distinct board array', () => {
    const s1 = createInitialState();
    const s2 = createInitialState();
    expect(s1.board).not.toBe(s2.board);
  });
});

// ---------------------------------------------------------------------------
// getNextPlayer
// ---------------------------------------------------------------------------

describe('getNextPlayer', () => {
  test('X -> O', () => {
    expect(getNextPlayer('X')).toBe('O');
  });

  test('O -> X', () => {
    expect(getNextPlayer('O')).toBe('X');
  });
});

// ---------------------------------------------------------------------------
// applyMove
// ---------------------------------------------------------------------------

describe('applyMove', () => {
  test('places the player mark on the correct cell', () => {
    const board = Array(9).fill('');
    const next = applyMove(board, 4, 'X');
    expect(next[4]).toBe('X');
  });

  test('does not mutate the original board', () => {
    const board = Array(9).fill('');
    applyMove(board, 0, 'X');
    expect(board[0]).toBe('');
  });

  test('returns null when cell is already occupied', () => {
    const board = boardFrom('X        ');
    expect(applyMove(board, 0, 'O')).toBeNull();
  });

  test('returns null for index below 0', () => {
    expect(applyMove(Array(9).fill(''), -1, 'X')).toBeNull();
  });

  test('returns null for index above 8', () => {
    expect(applyMove(Array(9).fill(''), 9, 'X')).toBeNull();
  });

  test('all other cells remain unchanged', () => {
    const board = Array(9).fill('');
    const next = applyMove(board, 3, 'O');
    next.forEach((cell, i) => {
      if (i !== 3) expect(cell).toBe('');
    });
  });
});

// ---------------------------------------------------------------------------
// check
// ---------------------------------------------------------------------------

describe('check — in-progress games return null', () => {
  test('empty board', () => {
    expect(check(Array(9).fill(''))).toBeNull();
  });

  test('one move played', () => {
    const board = boardFrom('X        ');
    expect(check(board)).toBeNull();
  });

  test('no winner yet with several moves', () => {
    // X O X
    // O X O
    //       (game still going)
    const board = boardFrom('XOXOX    ');
    expect(check(board)).toBeNull();
  });
});

describe('check — X wins', () => {
  test('top row', () => {
    const board = boardFrom('XXXOO    ');
    const result = check(board);
    expect(result).not.toBeNull();
    expect(result.winner).toBe('X');
    expect(result.combo).toEqual([0, 1, 2]);
  });

  test('middle row', () => {
    //   O      <- 0-2
    // X X X    <- 3-5
    //   O      <- 6-8
    const board = boardFrom(' O XXXO  ');
    const result = check(board);
    expect(result.winner).toBe('X');
    expect(result.combo).toEqual([3, 4, 5]);
  });

  test('bottom row', () => {
    const board = boardFrom('OO OOXXX ');
    //                       012 345 678
    // Wait: 'OO OOXXX ' -> indices 6,7,8 = X,X,X — no wait let me recount
    // 'OO OOXXX ' -> O O ' ' O O X X X ' '
    // Actually let me fix this properly
    const b = Array(9).fill('');
    b[6] = 'X'; b[7] = 'X'; b[8] = 'X';
    b[0] = 'O'; b[1] = 'O'; b[3] = 'O';
    const result = check(b);
    expect(result.winner).toBe('X');
    expect(result.combo).toEqual([6, 7, 8]);
  });

  test('left column', () => {
    const b = Array(9).fill('');
    b[0] = 'X'; b[3] = 'X'; b[6] = 'X';
    b[1] = 'O'; b[4] = 'O';
    const result = check(b);
    expect(result.winner).toBe('X');
    expect(result.combo).toEqual([0, 3, 6]);
  });

  test('middle column', () => {
    const b = Array(9).fill('');
    b[1] = 'X'; b[4] = 'X'; b[7] = 'X';
    b[0] = 'O'; b[3] = 'O';
    const result = check(b);
    expect(result.winner).toBe('X');
    expect(result.combo).toEqual([1, 4, 7]);
  });

  test('right column', () => {
    const b = Array(9).fill('');
    b[2] = 'X'; b[5] = 'X'; b[8] = 'X';
    b[0] = 'O'; b[1] = 'O';
    const result = check(b);
    expect(result.winner).toBe('X');
    expect(result.combo).toEqual([2, 5, 8]);
  });

  test('main diagonal (top-left to bottom-right)', () => {
    const b = Array(9).fill('');
    b[0] = 'X'; b[4] = 'X'; b[8] = 'X';
    b[1] = 'O'; b[2] = 'O';
    const result = check(b);
    expect(result.winner).toBe('X');
    expect(result.combo).toEqual([0, 4, 8]);
  });

  test('anti-diagonal (top-right to bottom-left)', () => {
    const b = Array(9).fill('');
    b[2] = 'X'; b[4] = 'X'; b[6] = 'X';
    b[0] = 'O'; b[1] = 'O';
    const result = check(b);
    expect(result.winner).toBe('X');
    expect(result.combo).toEqual([2, 4, 6]);
  });
});

describe('check — O wins', () => {
  test('top row', () => {
    const b = Array(9).fill('');
    b[0] = 'O'; b[1] = 'O'; b[2] = 'O';
    b[3] = 'X'; b[4] = 'X';
    const result = check(b);
    expect(result.winner).toBe('O');
    expect(result.combo).toEqual([0, 1, 2]);
  });

  test('left column', () => {
    const b = Array(9).fill('');
    b[0] = 'O'; b[3] = 'O'; b[6] = 'O';
    b[1] = 'X'; b[4] = 'X';
    const result = check(b);
    expect(result.winner).toBe('O');
    expect(result.combo).toEqual([0, 3, 6]);
  });
});

describe('check — draw', () => {
  test('full board with no winner returns { winner: null, combo: [] }', () => {
    // X O X
    // X X O
    // O X O  — no three in a row
    const b = boardFrom('XOXXXOOOO');
    // Wait let me think: X O X / X X O / O X O
    // Row 0: X O X - no
    // Row 1: X X O - no
    // Row 2: O X O - no
    // Col 0: X X O - no
    // Col 1: O X X - no
    // Col 2: X O O - no
    // Diag: X X O - no
    // Anti: X X O - no
    // Actually: XOXXXOOOO -> indices: X O X X X O O O O
    // That has XXX at 2,3,4 being X X X — that IS a win. Let me use a proper draw board.
    // Known draw: X O X / O O X / X X O
    const draw = boardFrom('XOXOOXXX O'.replace(' ', ''));
    // 'XOXOOXXXO' -> X O X / O O X / X X O
    // Row 0: X O X - no
    // Row 1: O O X - no
    // Row 2: X X O - no
    // Col 0: X O X - no
    // Col 1: O O X - no
    // Col 2: X X O - no
    // Diag: X O O - no
    // Anti: X O X - no  ✓ draw
    const result = check(draw);
    expect(result).not.toBeNull();
    expect(result.winner).toBeNull();
    expect(result.combo).toEqual([]);
  });

  test('another valid draw board', () => {
    // O X O
    // O X X
    // X O X
    const b = boardFrom('OXOOXXXOX');
    // Row 0: O X O - no
    // Row 1: O X X - no
    // Row 2: X O X - no
    // Col 0: O O X - no
    // Col 1: X X O - no
    // Col 2: O X X - no
    // Diag: O X X - no
    // Anti: O X X - no  ✓ draw
    const result = check(b);
    expect(result).not.toBeNull();
    expect(result.winner).toBeNull();
    expect(result.combo).toEqual([]);
  });
});

describe('check — result shape', () => {
  test('winning result has winner string and combo array', () => {
    const b = Array(9).fill('');
    b[0] = 'X'; b[1] = 'X'; b[2] = 'X';
    const result = check(b);
    expect(typeof result.winner).toBe('string');
    expect(Array.isArray(result.combo)).toBe(true);
    expect(result.combo).toHaveLength(3);
  });

  test('combo indices are valid board positions', () => {
    const b = Array(9).fill('');
    b[0] = 'O'; b[1] = 'O'; b[2] = 'O';
    const { combo } = check(b);
    combo.forEach(i => {
      expect(i).toBeGreaterThanOrEqual(0);
      expect(i).toBeLessThanOrEqual(8);
    });
  });
});

// ---------------------------------------------------------------------------
// Undo / Redo
// ---------------------------------------------------------------------------

function playSequence(indices) {
  return indices.reduce((state, index) => playTurn(state, index), createInitialState());
}

describe('Undo and Redo', () => {
  test('are unavailable at the start of a game', () => {
    const state = createInitialState();
    expect(undoTurn(state)).toBeNull();
    expect(redoTurn(state)).toBeNull();
  });

  test('undo removes only the last move and returns the turn to its player', () => {
    const state = playSequence([0, 1]);
    const undone = undoTurn(state);

    expect(undone.board[0]).toBe('X');
    expect(undone.board[1]).toBe('');
    expect(undone.current).toBe('O');
  });

  test('a second consecutive undo is unavailable', () => {
    const state = playSequence([0, 1]);
    expect(undoTurn(undoTurn(state))).toBeNull();
  });

  test('redo restores the undone move and corresponding turn', () => {
    const state = playSequence([0, 1]);
    const redone = redoTurn(undoTurn(state));

    expect(redone.board[1]).toBe('O');
    expect(redone.current).toBe('X');
    expect(redone.undoneMove).toBeNull();
  });

  test('a new move after undo invalidates redo', () => {
    const state = playSequence([0, 1]);
    const undone = undoTurn(state);
    const changed = playTurn(undone, 2);

    expect(changed.board[2]).toBe('O');
    expect(redoTurn(changed)).toBeNull();
  });

  test('undo reopens a won game and redo restores the win', () => {
    const won = playSequence([0, 3, 1, 4, 2]);
    expect(won.gameOver).toBe(true);

    const undone = undoTurn(won);
    expect(undone.gameOver).toBe(false);
    expect(undone.current).toBe('X');
    expect(check(undone.board)).toBeNull();

    const redone = redoTurn(undone);
    expect(redone.gameOver).toBe(true);
    expect(check(redone.board).winner).toBe('X');
  });

  test('undo reopens a draw and redo restores the draw', () => {
    const draw = playSequence([0, 1, 2, 4, 3, 5, 7, 6, 8]);
    expect(draw.gameOver).toBe(true);
    expect(check(draw.board).winner).toBeNull();

    const undone = undoTurn(draw);
    expect(undone.gameOver).toBe(false);
    expect(check(undone.board)).toBeNull();

    const redone = redoTurn(undone);
    expect(redone.gameOver).toBe(true);
    expect(check(redone.board).winner).toBeNull();
  });

  test('a new game has no history from the previous game', () => {
    const previousGame = playSequence([0, 1]);
    expect(previousGame.lastMove).not.toBeNull();

    const newGame = createInitialState();
    expect(newGame.lastMove).toBeNull();
    expect(newGame.undoneMove).toBeNull();
  });
});
