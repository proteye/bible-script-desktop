import createReducer from '../../utils/reducer';
import { BibleState } from '../stateTypes';
import { types } from '../../actions/bible/actions';

const initState: BibleState = {
  info: [],
  books: [],
  verses: []
};

export default createReducer<BibleState>(initState, {
  [types.READ_INFO]: (state, action) => {
    return {
      ...state,
      info: action.payload
    };
  },

  [types.READ_BOOKS]: (state, action) => {
    return {
      ...state,
      books: action.payload
    };
  },

  [types.READ_VERSES]: (state, action) => {
    return {
      ...state,
      verses: action.payload
    };
  }
});
