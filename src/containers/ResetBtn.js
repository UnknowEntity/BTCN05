import { connect } from 'react-redux';
import { reset } from '../actions';
import Reset from '../components/Reset';

const mapDispatchToProps = dispatch => ({
  onClick: () => {
    dispatch(reset());
  }
});

export default connect(
  null,
  mapDispatchToProps
)(Reset);
