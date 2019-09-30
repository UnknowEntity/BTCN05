import React from 'react';
import Square from './Square';

class Board extends React.Component {
  renderTable() {
    const items = [];

    for (let index = 0; index < 20; index += 1) {
      items.push(this.renderRow(index));
    }
    return items;
  }

  renderRow(a) {
    const { squares, onClick, winSquares } = this.props;
    const items = [];

    for (let index = 0; index < 20; index += 1) {
      items.push(
        <Square
          className={winSquares[a][index]}
          key={`${a}_${index}`}
          value={squares[a][index]}
          onClick={() => onClick(a, index)}
        />
      );
    }

    return (
      <div className="board-row" key={a}>
        {items}
      </div>
    );
  }

  render() {
    return <div>{this.renderTable()}</div>;
  }
}

export default Board;
