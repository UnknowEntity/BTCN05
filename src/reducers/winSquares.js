const winSquares = (state = [], action) => {
  switch (action.type) {
    case 'UPDATE_WIN_SQUARES':
      return action.winSquares;
    case 'RESET':
      return [];
    default:
      return state;
  }
};

export default winSquares;
