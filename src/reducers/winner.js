const winner = (state = null, action) => {
  switch (action.type) {
    case 'UPDATE_WINNER':
      return action.winner;
    case 'RESET':
      return null;
    default:
      return state;
  }
};

export default winner;
