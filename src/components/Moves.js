import React from 'react';
// import PropTypes from 'prop-types';

const Moves = ({ history, stepNumber, onClick, reverse }) => {
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
          onClick={() => onClick(move)}
        >
          {desc}
        </button>
      </li>
    );
  });
  let moves = temp;
  if (reverse) {
    moves = temp.reverse();
  }
  return <ol>{moves}</ol>;
};

// Moves.PropTypes = {
//   onClick: PropTypes.func.isRequired,
//   history: PropTypes.array.isRequired,
//   stepNumber: PropTypes.number.isRequired
// };
export default Moves;
