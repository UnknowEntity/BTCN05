import { connect } from 'react-redux';
import { handleClick, aIClick } from '../actions';
import Board from '../components/Board';

const mapStateToProps = state => {
  const { history, stepNumber, winSquares } = state;
  const currentHistory = history.slice(0, stepNumber + 1);
  const current = Array(20)
    .fill(null)
    // eslint-disable-next-line no-unused-vars
    .map(_row => new Array(20).fill(null));
  for (let index = 1; index < currentHistory.length; index += 1) {
    const temp = currentHistory[index];
    if (index % 2 === 1) {
      current[temp.a][temp.b] = 'X';
    } else {
      current[temp.a][temp.b] = 'O';
    }
  }
  const winResult = Array(20)
    .fill(null)
    // eslint-disable-next-line no-unused-vars
    .map(row => new Array(20).fill('square'));
  for (let index = 0; index < winSquares.length; index += 1) {
    const temp = winSquares[index];
    winResult[temp.a][temp.b] = 'square win';
  }
  return {
    winSquares: winResult,
    squares: current
  };
};

const mapDispatchToProps = dispatch => ({
  onClick: (a, b) => {
    dispatch(handleClick(a, b));
    dispatch(aIClick());
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Board);
