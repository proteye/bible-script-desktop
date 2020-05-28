import { Dispatch as ReduxDispatch, AnyAction } from 'redux';

export type BibleInfo = { name: string; value: string };

export type BibleBook = {
  bookNumber: number;
  shortName: string;
  longName: string;
  bookColor: string;
  isPresent: boolean;
};

export type BibleVerse = {
  bookNumber: number;
  chapter: number;
  verse: number;
  text: string;
}[];

export interface BibleState {
  info: BibleInfo;
  books: BibleBook[];
  verses: BibleVerse[];
}

export type Dispatch = ReduxDispatch<AnyAction>;
