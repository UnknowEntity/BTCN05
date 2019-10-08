import { connect } from 'react-redux';
import { updateStepNumber, updateNextPlayer } from '../actions';
import Moves from '../components/Moves';

const mapStateToProps = state => ({
  history: state.history,
  stepNumber: state.stepNumber,
  reverse: state.reverse
});

const mapDispatchToProps = dispatch => ({
  onClick: move => {
    dispatch(updateStepNumber(move));
    dispatch(updateNextPlayer(move % 2 === 0));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Moves);
