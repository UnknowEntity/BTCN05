const reverse = (state = false, action) => {
  switch (action.type) {
    case 'REVERSE':
      return !state;
    case 'RESET':
      return false;
    default:
      return state;
  }
};

export default reverse;
