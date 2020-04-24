import createReducer from '../../utils/reducer';
import { CounterState } from '../stateTypes';
import {
  INCREMENT_COUNTER,
  DECREMENT_COUNTER
} from '../../actions/counter/actions';

const initState: CounterState = {
  counter: 0
};

export default createReducer<CounterState>(initState, {
  [INCREMENT_COUNTER]: state => {
    return {
      counter: state.counter + 1
    };
  },

  [DECREMENT_COUNTER]: state => {
    return {
      counter: state.counter - 1
    };
  }
});
