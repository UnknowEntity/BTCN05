const history = (state = [{ a: null, b: null }], action) => {
  switch (action.type) {
    case 'UPDATE_HISTORY':
      return action.history;
    case 'RESET':
      return [{ a: null, b: null }];
    default:
      return state;
  }
};

export default history;
