import {
  BibleBook,
  BibleInfo,
  BibleVerse,
  Dispatch
} from '../../reducers/bible/types';
import db from '../../utils/db';

export const types = {
  READ_INFO: Symbol('READ_INFO'),
  READ_BOOKS: Symbol('READ_BOOKS'),
  READ_VERSES: Symbol('READ_VERSES')
};

export type ReadVersesParams = {
  bookNumber: number;
  chapter?: number;
  verse?: number;
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
      db.all(
        'SELECT book_number AS bookNumber, short_name AS shortName, long_name AS longName, book_color AS bookColor, is_present AS isPresent FROM books_all',
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (_: any, rows: BibleBook[]) => {
          dispatch({ type: types.READ_BOOKS, payload: rows });
        }
      );
    };
  },

  readVersesBy: (params: ReadVersesParams) => {
    return (dispatch: Dispatch) => {
      let condition = `book_number = ${params.bookNumber}`;
      if (params.chapter) {
        condition += ` AND chapter = ${params.chapter}`;
      }
      if (params.verse) {
        condition += ` AND verse = ${params.verse}`;
      }
      db.all(
        `SELECT book_number AS bookNumber, chapter, verse, text FROM verses WHERE ${condition}`,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (_: any, rows: BibleVerse[]) => {
          dispatch({ type: types.READ_VERSES, payload: rows });
        }
      );
    };
  }
};

export default actions;
