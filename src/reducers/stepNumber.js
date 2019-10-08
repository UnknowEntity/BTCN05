const stepNumber = (state = 0, action) => {
  switch (action.type) {
    case 'UPDATE_STEP_NUMBER':
      return action.stepNumber;
    case 'RESET':
      return 0;
    default:
      return state;
  }
};

export default stepNumber;
