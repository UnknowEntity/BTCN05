import { combineReducers } from 'redux';
import history from './history';
import xIsNext from './xIsNext';
import winner from './winner';
import stepNumber from './stepNumber';
import reverse from './reverse';
import winSquares from './winSquares';

export default combineReducers({
  history,
  xIsNext,
  winner,
  stepNumber,
  reverse,
  winSquares
});
