import { Dispatch, GetState } from '../../reducers/types';

export const INCREMENT_COUNTER = 'INCREMENT_COUNTER';
export const DECREMENT_COUNTER = 'DECREMENT_COUNTER';

const increment = () => {
  return {
    type: INCREMENT_COUNTER
  };
};

const decrement = () => {
  return {
    type: DECREMENT_COUNTER
  };
};

const actions = {
  increment,

  decrement,

  incrementIfOdd: () => {
    return (dispatch: Dispatch, getState: GetState) => {
      const { counter } = getState();

      if (counter.counter % 2 === 0) {
        return;
      }

      dispatch(increment());
    };
  },

  incrementAsync: (delay = 1000) => {
    return (dispatch: Dispatch) => {
      setTimeout(() => {
        dispatch(increment());
      }, delay);
    };
  }
};

export default actions;
