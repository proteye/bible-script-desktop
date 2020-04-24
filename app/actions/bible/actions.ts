import { BibleInfo, Dispatch } from '../../reducers/bible/types';
import db from '../../utils/db';

export const types = {
  READ_INFO: Symbol('READ_INFO'),
  READ_BOOKS: Symbol('READ_BOOKS'),
  READ_VERSES: Symbol('READ_VERSES')
};

const actions = {
  readInfo: () => {
    return (dispatch: Dispatch) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      db.all('SELECT name, value FROM info', (_: any, rows: BibleInfo) => {
        dispatch({ type: types.READ_INFO, payload: rows });
      });
    };
  },

  readBooks: () => {
    return (dispatch: Dispatch) => {
      dispatch({ type: types.READ_BOOKS });
    };
  },

  readVersesBy: () => {
    return (dispatch: Dispatch) => {
      dispatch({ type: types.READ_VERSES });
    };
  }
};

export default actions;
