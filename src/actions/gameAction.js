export const updateHistory = history => ({
  type: 'UPDATE_HISTORY',
  history
});

export const reverse = () => ({
  type: 'REVERSE'
});

export const updateStepNumber = stepNumber => ({
  type: 'UPDATE_STEP_NUMBER',
  stepNumber
});

export const updateWinner = winner => ({
  type: 'UPDATE_WINNER',
  winner
});

export const updateWinSquares = winSquares => ({
  type: 'UPDATE_WIN_SQUARES',
  winSquares
});

export const updateNextPlayer = nextPlayer => ({
  type: 'UPDATE_NEXT_PLAYER',
  nextPlayer
});

export const nextPlayer = () => ({
  type: 'NEXT_PLAYER'
});

export const reset = () => ({
  type: 'RESET'
});
