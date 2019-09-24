import React from 'react';
import Square from './Square'

class Board extends React.Component {
  
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
        items.push(<Square className={this.props.winSquares[a][index]} key={a+"_"+index}  value={this.props.squares[a][index]} onClick={() => this.props.onClick(a,index)}
        />)
        
      }
  
      return (
        <div className="board-row" key={a}>
          {items}
        </div>
      )
    }
  
    
  
    render() {
      return (
        <div>
          {this.renderTable()}
        </div>
      );
    }
  }

export default Board;