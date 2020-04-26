import { Dispatch as ReduxDispatch, AnyAction } from 'redux';

export type BibleInfo = { name: string; value: string }[];

export type BibleBooks = {
  bookNumber: number;
  shortName: string;
  longName: string;
  bookColor: string;
  isPresent: boolean;
}[];

export type BibleVerses = {
  bookNumber: number;
  chapter: number;
  verse: number;
  text: string;
}[];

export interface BibleState {
  info: BibleInfo;
  books: BibleBooks;
  verses: BibleVerses;
}

export type Dispatch = ReduxDispatch<AnyAction>;
