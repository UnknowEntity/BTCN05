import { connect } from 'react-redux';
import { reverse } from '../actions';
import Reverse from '../components/Reverse';

const mapDispatchToProps = dispatch => ({
  onClick: () => {
    dispatch(reverse());
  }
});

export default connect(
  null,
  mapDispatchToProps
)(Reverse);
