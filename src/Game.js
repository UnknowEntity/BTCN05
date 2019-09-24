import React from 'react';
import './Game.css';
import Board from './Board';


class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{a:null,b:null}],
      xIsNext: true,
      winner: null,
      stepNumber: 0,
      reverse:false,
      winSquares:[],
    };
  }


  handleClick(a,b) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = Array(20).fill(null).map(row => new Array(20).fill(null));
    for (let index = 1; index < history.length; index++) {
      const temp=history[index];
      if (index%2===1) {
        current[temp.a][temp.b]='X';
      } else {
        current[temp.a][temp.b]='O';
      }
    }
    const squares = current;
    var temp=this.state.winner;
    if (this.state.stepNumber!==(this.state.history.length-1)) {
      temp=null;
      this.setState((state)=>({
        winner: null,
        winSquares: [],
      }))
    }

    const winner= temp;

    if (squares[a][b]!=null || winner!=null) {
      return;
    }
    squares[a][b] = this.state.xIsNext ? 'X' : 'O';
    
    this.calculateWinner(a,b,squares)
    this.setState({
      history: history.concat([{a:a,b:b}]),
      xIsNext: !this.state.xIsNext,
      stepNumber: history.length,
    });
  }

  calculateWinner(a,b,squares) {
    
    const winSquares=this.state.winSquares;
    const winCol=this.calculateWinnerCol(a,b,squares);
    const winRow=this.calculateWinnerRow(a,b,squares);
    const winCrossLeft=this.calculateWinnerLeftCross(a,b,squares);
    const winCrossRight=this.calculateWinnerRightCross(a,b,squares);
    if (winCol.result) {
      const winResult=winCol.win;
      this.setState({
        winner:squares[a][b],
        winSquares:winSquares.concat(winResult),
      })
    } else if (winRow.result) {
      const winResult=winRow.win;
      this.setState({
        winner:squares[a][b],
        winSquares:winSquares.concat(winResult),
      })
    } else if (winCrossLeft.result) {
      const winResult=winCrossLeft.win;
      this.setState({
        winner:squares[a][b],
        winSquares:winSquares.concat(winResult),
      })
    } else if (winCrossRight.result) {
      const winResult=winCrossRight.win;
      this.setState({
        winner:squares[a][b],
        winSquares:winSquares.concat(winResult),
      })
    }
    return false;
  }

  calculateWinnerCol(a,b,squares) {
    var turn=squares[a][b];
    var aend=a;
    var astart=a;
    var end=null;
    var start=null;
    while(aend>0 && squares[aend][b]===turn)  {
      aend--;
    }

    if (squares[aend][b]===null) {
      end=true;
    } else {
      end=false;
    }

    while(astart<19 && squares[astart][b]===turn)  {
      astart++;
    }

    if (squares[astart][b]===null) {
      start=true;
    } else {
      start=false;
    }
    var winCol=[];
    if (end||start) {
      if ((astart-aend)>=6) {
        for (let index = aend+1; index < astart; index++) {
          winCol.push({a:index,b:b});
        }
        return {
          result:true,
          win:winCol,
        };
      } else if (((aend===0&&squares[aend][b]===turn)||(astart===19&&squares[astart][b]===turn))&&(astart-aend)>=5) {
        var colEnd=aend;
        var colStart=astart;
        if (!end) {
          colEnd-=1;
        } else {
          colStart+=1;
        }
        for (let index = colEnd+1; index < colStart; index++) {
          winCol.push({a:index,b:b});
        }
        return {
          result:true,
          win:winCol,
        };
      }
    }
    return false;
  }

  calculateWinnerRow(a,b,squares) {
    var turn=squares[a][b];
    var bend=b;
    var bstart=b;
    var end=null;
    var start=null;
    while(bend>0 && squares[a][bend]===turn)  {
      bend--;
    }

    if (squares[a][bend]===null) {
      end=true;
    } else {
      end=false;
    }

    while(bstart<19 && squares[a][bstart]===turn)  {
      bstart++;
    }

    if (squares[a][bstart]===null) {
      start=true;
    } else {
      start=false;
    }
    var winRow=[];
    if (end||start) {
      if ((bstart-bend)>=6) {
        for (let index = bend+1; index < bstart; index++) {
          winRow.push({a:a,b:index});
        }
        return {
          result:true,
          win:winRow,
        };
      } else if (((bend===0&&squares[a][bend]===turn)||(bstart===19&&squares[a][bstart]===turn))&&(bstart-bend)>=5) {
        var rowEnd=bend;
        var rowStart=bstart;
        if (!end) {
          rowEnd-=1;
        } else {
          rowStart+=1;
        }
        for (let index = rowEnd+1; index < rowStart; index++) {
          winRow.push({a:a,b:index});
        }
        return {
          result:true,
          win:winRow,
        };
      }
    }
    return false;
  }

  calculateWinnerLeftCross(a,b,squares) {
    var turn=squares[a][b];
    var aLU=a;
    var aRD=a;
    var bLU=b;
    var bRD=b;
    var end=null;
    var start=null;
    while(aLU>0 && bLU>0 && squares[aLU][bLU]===turn)  {
      aLU--;
      bLU--;
    }

    if (squares[aLU][bLU]===null) {
      end=true;
    } else {
      end=false;
    }

    while(aRD<19 && bRD<19 && squares[aRD][bRD]===turn)  {
      aRD++;
      bRD++;
    }

    if (squares[aRD][bRD]===null) {
      start=true;
    } else {
      start=false;
    }
    var winCrossLeft=[];
    var tempa=aLU;
    var tempb=bLU;
    if (end||start) {
      if ((bRD-bLU)>=6) {
        while (tempb!==bRD) {
          tempb+=1;
          tempa+=1;
          winCrossLeft.push({a:tempa,b:tempb});
        }
        return {
          result:true,
          win:winCrossLeft,
        };
      } else if ((aRD===19||aLU===0||bRD===19||bLU===0)&&(bRD-bLU)>=5&&(squares[aRD][bRD]===turn||squares[aLU][bLU]===turn)) {
        var tempbrd=bRD;
        if (!end) {
          tempb-=1;
          tempa-=1;
        } else {
          tempbrd+=1;
        }
        while (tempb<tempbrd-1) {
          tempb+=1;
          tempa+=1;
          winCrossLeft.push({a:tempa,b:tempb});
        }
        return {
          result:true,
          win:winCrossLeft,
        };
      }
    }
    return false;
  }

  calculateWinnerRightCross(a,b,squares) {
    var turn=squares[a][b];
    var aRU=a;
    var aLD=a;
    var bRU=b;
    var bLD=b;
    var end=null;
    var start=null;
    while(aRU>0 && bRU<19 && squares[aRU][bRU]===turn)  {
      aRU--;
      bRU++;
    }

    if (squares[aRU][bRU]===null) {
      end=true;
    } else {
      end=false;
    }

    while(aLD<19 && bLD>0 && squares[aLD][bLD]===turn)  {
      aLD++;
      bLD--;
    }

    if (squares[aLD][bLD]===null) {
      start=true;
    } else {
      start=false;
    }
    var winCrossRight=[];
    var tempa=aLD;
    var tempb=bLD;
    if (end||start) {
      if ((aLD-aRU)>=6) {
        while (tempb!==bRU) {
          tempb+=1;
          tempa-=1;
          winCrossRight.push({a:tempa,b:tempb});
        }
        return {
          result:true,
          win:winCrossRight,
        };
      } else if ((aLD===19||aRU===0||bLD===0||bRU===19)&&(aLD-aRU)>=5&&(squares[aLD][bLD]===turn||squares[aRU][bRU]===turn)) {
        var tempbru=bRU;
        if (end) {
          tempb-=1;
          tempa+=1;
        } else {
          tempbru+=1;
        }
        while (tempb<tempbru-1) {
          tempb+=1;
          tempa-=1;
          winCrossRight.push({a:tempa,b:tempb});
        }
        return {
          result:true,
          win:winCrossRight,
        };
      }
    }
    return false;
  }

  Reset() {
    const squares = Array(20).fill(null).map(row => new Array(20).fill(null));
    this.setState({
      squares: squares,
      xIsNext: true,
      winner:null,
      stepNumber:0,
      history: [{a:null,b:null}],
      winSquares:[],
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    });
  }

  Reverse() {
    this.setState({
      reverse:!this.state.reverse,
    })
  }

  render() {
    const history = this.state.history;
    const currentHistory = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = Array(20).fill(null).map(row => new Array(20).fill(null));
    for (let index = 1; index < currentHistory.length; index++) {
      const temp=currentHistory[index];
      if (index%2===1) {
        current[temp.a][temp.b]='X';
      } else {
        current[temp.a][temp.b]='O';
      }
    }
    const winSquares= this.state.winSquares;
    const winResult=Array(20).fill(null).map(row => new Array(20).fill("square"));
    for (let index = 0; index < winSquares.length; index++) {
      const temp=winSquares[index];
      winResult[temp.a][temp.b]="square win";
    }
    const winner = this.state.winner;
    
    var temp = history.map((step, move) => {
      var row=step.a+1;
      var col=step.b+1;
      const desc = move ?
        'Go to move #' + move + ' Column: ' + col + ' Row: ' + row:
        'Go to game start';
      var classBtn="Step Btn";
      if (move===this.state.stepNumber) {
        classBtn+=" Choose"
      }
      return (
        <li key={move}>
          <button className={classBtn} value={move} onClick={()=>this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });
    var result=null;
    if (this.state.reverse) {
      result=temp.reverse();
    } else {
      result=temp;
    }
    const moves=result;
    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }
    return (
      
      <div className="App">
        <header className="App-header">
          <div className="game">
            <div className="game-board">
              <Board
                winSquares={winResult}
                squares={current}
                onClick={(a,b) => this.handleClick(a,b)}
              />
            </div>
            <div className="game-info">
              <button type="button" className="Reset Btn" onClick={() => this.Reset()}>Reset</button>
              <div>
                <button type="button" className="Reverse Btn" onClick={() => this.Reverse()}>Reverse</button>
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
