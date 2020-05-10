import React, { useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import './Bible.scss';
// import routes from '../constants/routes.json';
import { BibleState } from '../reducers/bible/types';
import { ReadVersesParams } from '../actions/bible/actions';

type Props = {
  bible: BibleState;
  readInfo: () => void;
  readBooks: () => void;
  readVersesBy: (params: ReadVersesParams) => void;
};

export default function Bible(props: Props) {
  const { bible, readInfo, readBooks, readVersesBy } = props;

  useEffect(() => {
    readInfo();
    readBooks();
    readVersesBy({ bookNumber: 10, chapter: 1 });
  }, []);

  // const books = bible.books.map(item => {
  //   const onClick = () =>
  //     readVersesBy({ bookNumber: item.bookNumber, chapter: 1 });
  //   return (
  //     <div key={item.shortName}>
  //       <button onClick={onClick} data-tclass="btn" type="button">
  //         {item.shortName}
  //       </button>
  //     </div>
  //   );
  // });

  const verses = bible.verses?.map(item => {
    return (
      <div key={item.bookNumber + item.chapter + item.verse}>{item.text}</div>
    );
  });

  // const sidebar = <div>{books}</div>;

  return (
    <div className="bible">
      <div>{verses}</div>
    </div>
  );
}
