const xIsNext = (state = true, action) => {
  switch (action.type) {
    case 'NEXT_PLAYER':
      return !state;
    case 'UPDATE_NEXT_PLAYER':
      return action.nextPlayer;
    case 'RESET':
      return true;
    default:
      return state;
  }
};

export default xIsNext;
