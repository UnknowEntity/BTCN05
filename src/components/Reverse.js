import React from 'react';

const Reverse = ({ onClick }) => {
  return (
    <button type="button" className="Reverse Btn" onClick={() => onClick()}>
      Reverse
    </button>
  );
};

export default Reverse;
