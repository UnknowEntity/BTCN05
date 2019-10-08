import React from 'react';

const Reset = ({ onClick }) => {
  return (
    <button type="button" className="Reset Btn" onClick={() => onClick()}>
      Reset
    </button>
  );
};

export default Reset;
