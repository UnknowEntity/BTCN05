import React from 'react';

function Square(props) {
  const { className, onClick, value } = props;
  return (
    <button className={className} onClick={onClick} type="button">
      {value}
    </button>
  );
}

export default Square;
