import React from 'react';
import './Game.css';
import MovesList from '../containers/MovesList';
import GameStatus from '../containers/GameStatus';
import GameSquares from '../containers/GameSquares';
import ResetBtn from '../containers/ResetBtn';
import ReverseBtn from '../containers/ReverseBtn';

function Game() {
  return (
    <div className="App">
      <header className="App-header">
        <div className="game">
          <div className="game-board">
            <GameSquares />
          </div>
          <div className="game-info">
            <ResetBtn />
            <div>
              <ReverseBtn />
            </div>
            <GameStatus />
            <MovesList />
          </div>
        </div>
      </header>
    </div>
  );
}

export default Game;
