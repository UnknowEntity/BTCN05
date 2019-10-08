import React from 'react';
import PropType from 'prop-types';

const Status = ({ winner, xIsNext }) => {
  let status;
  if (winner) {
    status = `Winner: ${winner}`;
  } else {
    status = `Next player: ${xIsNext ? 'X' : 'O'}`;
  }
  return <div>{status}</div>;
};

Status.PropType = {
  winner: PropType.string.isRequired,
  xIsNext: PropType.bool.isRequired
};

export default Status;
