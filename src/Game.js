import React from 'react';
import './Game.css';
import Board from './Board';

class Game extends React.Component {
  static calculateWinnerCol(a, b, squares) {
    const turn = squares[a][b];
    let aend = a;
    let astart = a;
    let end = null;
    let start = null;
    while (aend > 0 && squares[aend][b] === turn) {
      aend -= 1;
    }

    if (squares[aend][b] === null) {
      end = true;
    } else {
      end = false;
    }

    while (astart < 19 && squares[astart][b] === turn) {
      astart += 1;
    }

    if (squares[astart][b] === null) {
      start = true;
    } else {
      start = false;
    }
    const winCol = [];
    if (end || start) {
      if (astart - aend >= 6) {
        for (let index = aend + 1; index < astart; index += 1) {
          winCol.push({ a: index, b });
        }
        return {
          result: true,
          win: winCol
        };
      }
      if (
        ((aend === 0 && squares[aend][b] === turn) ||
          (astart === 19 && squares[astart][b] === turn)) &&
        astart - aend >= 5
      ) {
        let colEnd = aend;
        let colStart = astart;
        if (!end) {
          colEnd -= 1;
        } else {
          colStart += 1;
        }
        for (let index = colEnd + 1; index < colStart; index += 1) {
          winCol.push({ a: index, b });
        }
        return {
          result: true,
          win: winCol
        };
      }
    }
    return false;
  }

  static calculateWinnerRow(a, b, squares) {
    const turn = squares[a][b];
    let bend = b;
    let bstart = b;
    let end = null;
    let start = null;
    while (bend > 0 && squares[a][bend] === turn) {
      bend -= 1;
    }

    if (squares[a][bend] === null) {
      end = true;
    } else {
      end = false;
    }

    while (bstart < 19 && squares[a][bstart] === turn) {
      bstart += 1;
    }

    if (squares[a][bstart] === null) {
      start = true;
    } else {
      start = false;
    }
    const winRow = [];
    if (end || start) {
      if (bstart - bend >= 6) {
        for (let index = bend + 1; index < bstart; index += 1) {
          winRow.push({ a, b: index });
        }
        return {
          result: true,
          win: winRow
        };
      }
      if (
        ((bend === 0 && squares[a][bend] === turn) ||
          (bstart === 19 && squares[a][bstart] === turn)) &&
        bstart - bend >= 5
      ) {
        let rowEnd = bend;
        let rowStart = bstart;
        if (!end) {
          rowEnd -= 1;
        } else {
          rowStart += 1;
        }
        for (let index = rowEnd + 1; index < rowStart; index += 1) {
          winRow.push({ a, b: index });
        }
        return {
          result: true,
          win: winRow
        };
      }
    }
    return false;
  }

  static calculateWinnerLeftCross(a, b, squares) {
    const turn = squares[a][b];
    let aLU = a;
    let aRD = a;
    let bLU = b;
    let bRD = b;
    let end = null;
    let start = null;
    while (aLU > 0 && bLU > 0 && squares[aLU][bLU] === turn) {
      aLU -= 1;
      bLU -= 1;
    }

    if (squares[aLU][bLU] === null) {
      end = true;
    } else {
      end = false;
    }

    while (aRD < 19 && bRD < 19 && squares[aRD][bRD] === turn) {
      aRD += 1;
      bRD += 1;
    }

    if (squares[aRD][bRD] === null) {
      start = true;
    } else {
      start = false;
    }
    const winCrossLeft = [];
    let tempa = aLU;
    let tempb = bLU;
    if (end || start) {
      if (bRD - bLU >= 6) {
        while (tempb !== bRD - 1) {
          tempb += 1;
          tempa += 1;
          winCrossLeft.push({ a: tempa, b: tempb });
        }
        return {
          result: true,
          win: winCrossLeft
        };
      }
      if (
        (aRD === 19 || aLU === 0 || bRD === 19 || bLU === 0) &&
        bRD - bLU >= 5 &&
        (squares[aRD][bRD] === turn || squares[aLU][bLU] === turn)
      ) {
        let tempbrd = bRD;
        if (!end) {
          tempb -= 1;
          tempa -= 1;
        } else {
          tempbrd += 1;
        }
        while (tempb < tempbrd - 1) {
          tempb += 1;
          tempa += 1;
          winCrossLeft.push({ a: tempa, b: tempb });
        }
        return {
          result: true,
          win: winCrossLeft
        };
      }
    }
    return false;
  }

  static calculateWinnerRightCross(a, b, squares) {
    const turn = squares[a][b];
    let aRU = a;
    let aLD = a;
    let bRU = b;
    let bLD = b;
    let end = null;
    let start = null;
    while (aRU > 0 && bRU < 19 && squares[aRU][bRU] === turn) {
      aRU -= 1;
      bRU += 1;
    }

    if (squares[aRU][bRU] === null) {
      end = true;
    } else {
      end = false;
    }

    while (aLD < 19 && bLD > 0 && squares[aLD][bLD] === turn) {
      aLD += 1;
      bLD -= 1;
    }

    if (squares[aLD][bLD] === null) {
      start = true;
    } else {
      start = false;
    }
    const winCrossRight = [];
    let tempa = aLD;
    let tempb = bLD;
    if (end || start) {
      if (aLD - aRU >= 6) {
        while (tempb !== bRU - 1) {
          tempb += 1;
          tempa -= 1;
          winCrossRight.push({ a: tempa, b: tempb });
        }
        return {
          result: true,
          win: winCrossRight
        };
      }
      if (
        (aLD === 19 || aRU === 0 || bLD === 0 || bRU === 19) &&
        aLD - aRU >= 5 &&
        (squares[aLD][bLD] === turn || squares[aRU][bRU] === turn)
      ) {
        let tempbru = bRU;
        if (end) {
          tempb -= 1;
          tempa += 1;
        } else {
          tempbru += 1;
        }
        while (tempb < tempbru - 1) {
          tempb += 1;
          tempa -= 1;
          winCrossRight.push({ a: tempa, b: tempb });
        }
        return {
          result: true,
          win: winCrossRight
        };
      }
    }
    return false;
  }

  constructor(props) {
    super(props);
    this.state = {
      history: [{ a: null, b: null }],
      xIsNext: true,
      winner: null,
      stepNumber: 0,
      reverse: false,
      winSquares: []
    };
  }

  handleClick(a, b) {
    const { stepNumber, history, winner, xIsNext } = this.state;
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
      this.setState(() => ({
        winner: null,
        winSquares: []
      }));
    }

    const thisWinner = temp;

    if (squares[a][b] != null || thisWinner != null) {
      return;
    }
    squares[a][b] = xIsNext ? 'X' : 'O';

    this.calculateWinner(a, b, squares);
    this.setState({
      history: thisHistory.concat([{ a, b }]),
      xIsNext: !xIsNext,
      stepNumber: thisHistory.length
    });
  }

  calculateWinner(a, b, squares) {
    const { winSquares } = this.state;
    const winCol = Game.calculateWinnerCol(a, b, squares);
    const winRow = Game.calculateWinnerRow(a, b, squares);
    const winCrossLeft = Game.calculateWinnerLeftCross(a, b, squares);
    const winCrossRight = Game.calculateWinnerRightCross(a, b, squares);
    if (winCol.result) {
      const winResult = winCol.win;
      this.setState({
        winner: squares[a][b],
        winSquares: winSquares.concat(winResult)
      });
    } else if (winRow.result) {
      const winResult = winRow.win;
      this.setState({
        winner: squares[a][b],
        winSquares: winSquares.concat(winResult)
      });
    } else if (winCrossLeft.result) {
      const winResult = winCrossLeft.win;
      this.setState({
        winner: squares[a][b],
        winSquares: winSquares.concat(winResult)
      });
    } else if (winCrossRight.result) {
      const winResult = winCrossRight.win;
      this.setState({
        winner: squares[a][b],
        winSquares: winSquares.concat(winResult)
      });
    }
    return false;
  }

  Reset() {
    this.setState({
      xIsNext: true,
      winner: null,
      stepNumber: 0,
      history: [{ a: null, b: null }],
      winSquares: []
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: step % 2 === 0
    });
  }

  Reverse() {
    const { reverse } = this.state;
    this.setState({
      reverse: !reverse
    });
  }

  render() {
    const {
      history,
      stepNumber,
      reverse,
      xIsNext,
      winSquares,
      winner
    } = this.state;
    const currentHistory = history.slice(0, stepNumber + 1);
    const current = Array(20)
      .fill(null)
      // eslint-disable-next-line no-unused-vars
      .map(_row => new Array(20).fill(null));
    for (let index = 1; index < currentHistory.length; index += 1) {
      const temp = currentHistory[index];
      if (index % 2 === 1) {
        current[temp.a][temp.b] = 'X';
      } else {
        current[temp.a][temp.b] = 'O';
      }
    }
    const winResult = Array(20)
      .fill(null)
      // eslint-disable-next-line no-unused-vars
      .map(row => new Array(20).fill('square'));
    for (let index = 0; index < winSquares.length; index += 1) {
      const temp = winSquares[index];
      winResult[temp.a][temp.b] = 'square win';
    }
    const temp = history.map((step, move) => {
      const row = step.a + 1;
      const col = step.b + 1;
      const desc = move
        ? `Go to move #${move} Column: ${col} Row: ${row}`
        : 'Go to game start';
      let classBtn = 'Step Btn';
      if (move === stepNumber) {
        classBtn += ' Choose';
      }
      return (
        <li key={desc}>
          <button
            type="button"
            className={classBtn}
            value={move}
            onClick={() => this.jumpTo(move)}
          >
            {desc}
          </button>
        </li>
      );
    });
    let result = null;
    if (reverse) {
      result = temp.reverse();
    } else {
      result = temp;
    }
    const moves = result;
    let status;
    if (winner) {
      status = `Winner: ${winner}`;
    } else {
      status = `Next player: ${xIsNext ? 'X' : 'O'}`;
    }
    return (
      <div className="App">
        <header className="App-header">
          <div className="game">
            <div className="game-board">
              <Board
                winSquares={winResult}
                squares={current}
                onClick={(a, b) => this.handleClick(a, b)}
              />
            </div>
            <div className="game-info">
              <button
                type="button"
                className="Reset Btn"
                onClick={() => this.Reset()}
              >
                Reset
              </button>
              <div>
                <button
                  type="button"
                  className="Reverse Btn"
                  onClick={() => this.Reverse()}
                >
                  Reverse
                </button>
              </div>
              <div>{status}</div>
              <ol>{moves}</ol>
            </div>
          </div>
        </header>
      </div>
    );
  }
}

export default Game;
