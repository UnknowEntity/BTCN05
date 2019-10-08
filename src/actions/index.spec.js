import * as actions from './index';

describe('update history actions', () => {
  it('updateHistory should create UPDATE_HISTORY action', () => {
    expect(
      actions.updateHistory([{ a: null, b: null }]).toEqual({
        type: 'UPDATE_HISTORY',
        history: [{ a: null, b: null }]
      })
    );
  });

  it('reverse should create REVERSE action', () => {
    expect(actions.reverse()).toEqual({
      type: 'REVERSE'
    });
  });

  it('updateStepNumber should create UPDATE_STEP_NUMBER action', () => {
    expect(
      actions.updateStepNumber(5).toEqual({
        type: 'UPDATE_STEP_NUMBER',
        stepNumber: 5
      })
    );
  });

  it('updateWinner should create UPDATE_WINNER action', () => {
    expect(
      actions.updateWinner('X').toEqual({
        type: 'UPDATE_WINNER',
        winner: 'X'
      })
    );
  });

  it('updateWinSquares should create UPDATE_WIN_SQUARES action', () => {
    expect(
      actions
        .updateWinSquares([
          { a: 0, b: 1 },
          { a: 0, b: 2 },
          { a: 0, b: 3 },
          { a: 0, b: 4 },
          { a: 0, b: 5 }
        ])
        .toEqual({
          type: 'UPDATE_WINSQUARES',
          winSquares: [
            { a: 0, b: 1 },
            { a: 0, b: 2 },
            { a: 0, b: 3 },
            { a: 0, b: 4 },
            { a: 0, b: 5 }
          ]
        })
    );
  });

  it('updateNextPlayer should create UPDATE_NEXT_PLAYER action', () => {
    expect(actions.updateNextPlayer(true)).toEqual({
      type: 'UPDATE_NEXT_PLAYER',
      nextPlayer: true
    });
  });

  it('nextPlayer should create NEXT_PLAYER action', () => {
    expect(actions.nextPlayer()).toEqual({
      type: 'NEXT_PLAYER'
    });
  });

  it('reset should create RESET action', () => {
    expect(actions.reset()).toEqual({
      type: 'RESET'
    });
  });
});
