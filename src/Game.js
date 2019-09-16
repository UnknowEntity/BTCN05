import React from 'react';
import './Game.css';



function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(20).fill(null).map(row => new Array(20).fill(null)),
      xIsNext: true,
      winner:null,
    };
  }

  renderTable() {
    const items = []

    for (let index = 0; index < 20; index++) {
      items.push(this.renderRow(index));
    }
    return (items)
  }

  renderRow(a) {
    const items = []

    for (let index = 0; index < 20; index++) {
      items.push(<Square key={a+"_"+index}  value={this.state.squares[a][index]} onClick={() => this.handleClick(a,index)}
      />)
      
    }

    return (
      <div className="board-row" key={a}>
        {items}
      </div>
    )
  }

  handleClick(a,b) {
    const squares = this.state.squares.slice();
    const winner= this.state.winner;
    if (squares[a][b]!=null || winner!=null) {
      return;
    }
    squares[a][b] = this.state.xIsNext ? 'X' : 'O';
    
    this.calculateWinner(a,b,squares)
    this.setState({
      squares: squares,
      xIsNext: !this.state.xIsNext,
    });
  }

  calculateWinner(a,b,squares) {
    
    
    if (this.calculateWinnerCol(a,b,squares)) {
      this.setState({winner:squares[a][b]})
    } else if (this.calculateWinnerRow(a,b,squares)) {
      this.setState({winner:squares[a][b]})
    } else if (this.calculateWinnerLeftCross(a,b,squares)) {
      this.setState({winner:squares[a][b]})
    } else if (this.calculateWinnerRightCross(a,b,squares)) {
      this.setState({winner:squares[a][b]})
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

    if (end||start) {
      if ((astart-aend)>=6) {
        return true
      } else if (((aend===0&&squares[aend][b]===turn)||(astart===19&&squares[astart][b]===turn))&&(astart-aend)>=5) {
        return true
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

    if (end||start) {
      if ((bstart-bend)>=6) {
        return true
      } else if (((bend===0&&squares[a][bend]===turn)||(bstart===19&&squares[a][bstart]===turn))&&(bstart-bend)>=5) {
        return true
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

    if (end||start) {
      if ((bRD-bLU)>=6) {
        return true
      } else if ((aRD===19||aLU===0||bRD===19||bLU===0)&&(bRD-bLU)>=5&&(squares[aRD][bRD]===turn||squares[aLU][bLU]===turn)) {
        return true
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

    if (end||start) {
      if ((aLD-aRU)>=6) {
        return true
      } else if ((aLD===19||aRU===0||bLD===0||bRU===19)&&(aLD-aRU)>=5&&(squares[aLD][bLD]===turn||squares[aRU][bRU]===turn)) {
        return true
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
    });
  }

  render() {
    const winner = this.state.winner;
    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      <div>
        <button type="button" className="ResetBtn" onClick={() => this.Reset()}>Reset</button>
        <div className="status">{status}</div>
        {this.renderTable()}
      </div>
    );
  }
}



class Game extends React.Component {
  render() {
    return (
      
      <div className="App">
        <header className="App-header">
          <div className="game">
            <div className="game-board">
              <Board />
            </div>
            <div className="game-info">
              <div>{/* status */}</div>
              <ol>{/* TODO */}</ol>
            </div>
            
          </div>
        </header>
      </div>
    );
  }
}

export default Game;
