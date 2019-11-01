import {
  updateHistory,
  updateStepNumber,
  updateWinner,
  updateWinSquares,
  nextPlayer
} from './gameAction';
import {
  calculateWinnerCol,
  calculateWinnerLeftCross,
  calculateWinnerRightCross,
  calculateWinnerRow
} from './calculateWinner';

export const aIClick = () => {
  return (dispatch, getState) => {
    const state = getState();
    const { stepNumber, history, winner, xIsNext, winSquares } = state;
    let temp = winner;
    const thisHistory = history.slice(0, stepNumber + 1);

    const current = Array(20)
      .fill(null)
      // eslint-disable-next-line no-unused-vars
      .map(_row => new Array(20).fill(null));

    let a = null;
    let b = null;

    do {
      a = Math.floor(Math.random() * 20);
      b = Math.floor(Math.random() * 20);
    } while (thisHistory.indexOf({ a, b }) !== -1);

    for (let index = 1; index < thisHistory.length; index += 1) {
      const temp1 = thisHistory[index];
      if (index % 2 === 1) {
        current[temp1.a][temp1.b] = 'X';
      } else {
        current[temp1.a][temp1.b] = 'O';
      }
    }
    const squares = current;

    if (stepNumber !== history.length - 1) {
      temp = null;
      dispatch(updateWinner(null));
      dispatch(updateWinSquares([]));
    }

    const thisWinner = temp;

    if (squares[a][b] != null || thisWinner != null || xIsNext === true) {
      return;
    }
    squares[a][b] = xIsNext ? 'X' : 'O';

    const winCol = calculateWinnerCol(a, b, squares);
    const winRow = calculateWinnerRow(a, b, squares);
    const winCrossLeft = calculateWinnerLeftCross(a, b, squares);
    const winCrossRight = calculateWinnerRightCross(a, b, squares);
    if (winCol.result) {
      const winResult = winCol.win;
      dispatch(updateWinner(squares[a][b]));
      dispatch(updateWinSquares(winSquares.concat(winResult)));
    } else if (winRow.result) {
      const winResult = winRow.win;
      dispatch(updateWinner(squares[a][b]));
      dispatch(updateWinSquares(winSquares.concat(winResult)));
    } else if (winCrossLeft.result) {
      const winResult = winCrossLeft.win;
      dispatch(updateWinner(squares[a][b]));
      dispatch(updateWinSquares(winSquares.concat(winResult)));
    } else if (winCrossRight.result) {
      const winResult = winCrossRight.win;
      dispatch(updateWinner(squares[a][b]));
      dispatch(updateWinSquares(winSquares.concat(winResult)));
    }
    dispatch(updateHistory(thisHistory.concat([{ a, b }])));
    dispatch(nextPlayer());
    dispatch(updateStepNumber(thisHistory.length));
  };
};

export const handleClick = (a, b) => {
  return (dispatch, getState) => {
    const state = getState();
    const { stepNumber, history, winner, xIsNext, winSquares } = state;
    let temp = winner;
    const thisHistory = history.slice(0, stepNumber + 1);

    const current = Array(20)
      .fill(null)
      // eslint-disable-next-line no-unused-vars
      .map(_row => new Array(20).fill(null));
    for (let index = 1; index < thisHistory.length; index += 1) {
      const temp1 = thisHistory[index];
      if (index % 2 === 1) {
        current[temp1.a][temp1.b] = 'X';
      } else {
        current[temp1.a][temp1.b] = 'O';
      }
    }
    const squares = current;

    if (stepNumber !== history.length - 1) {
      temp = null;
      dispatch(updateWinner(null));
      dispatch(updateWinSquares([]));
    }

    const thisWinner = temp;

    if (squares[a][b] != null || thisWinner != null || xIsNext === false) {
      return;
    }
    squares[a][b] = xIsNext ? 'X' : 'O';

    const winCol = calculateWinnerCol(a, b, squares);
    const winRow = calculateWinnerRow(a, b, squares);
    const winCrossLeft = calculateWinnerLeftCross(a, b, squares);
    const winCrossRight = calculateWinnerRightCross(a, b, squares);
    if (winCol.result) {
      const winResult = winCol.win;
      dispatch(updateWinner(squares[a][b]));
      dispatch(updateWinSquares(winSquares.concat(winResult)));
    } else if (winRow.result) {
      const winResult = winRow.win;
      dispatch(updateWinner(squares[a][b]));
      dispatch(updateWinSquares(winSquares.concat(winResult)));
    } else if (winCrossLeft.result) {
      const winResult = winCrossLeft.win;
      dispatch(updateWinner(squares[a][b]));
      dispatch(updateWinSquares(winSquares.concat(winResult)));
    } else if (winCrossRight.result) {
      const winResult = winCrossRight.win;
      dispatch(updateWinner(squares[a][b]));
      dispatch(updateWinSquares(winSquares.concat(winResult)));
    }
    dispatch(updateHistory(thisHistory.concat([{ a, b }])));
    dispatch(nextPlayer());
    dispatch(updateStepNumber(thisHistory.length));
  };
};
