import { Dispatch as ReduxDispatch, AnyAction } from 'redux';

export type BibleInfo = { name: string; value: string }[];

export type BibleBooks = { name: string; value: string }[];

export type BibleVerses = { name: string; value: string }[];

export interface BibleState {
  info: BibleInfo;
  books: BibleBooks;
  verses: BibleVerses;
}

export type Dispatch = ReduxDispatch<AnyAction>;
