import { connect } from 'react-redux';
import Status from '../components/Status';

const mapStateToProps = state => ({
  winner: state.winner,
  xIsNext: state.xIsNext
});

export default connect(mapStateToProps)(Status);
