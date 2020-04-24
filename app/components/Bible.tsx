import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Bible.css';
import routes from '../constants/routes.json';
import { BibleInfo } from '../reducers/bible/types';

type Props = {
  info: BibleInfo;
  readInfo: () => void;
  readBooks: () => void;
  readVersesBy: () => void;
};

export default function Bible(props: Props) {
  const { info, readInfo, readBooks, readVersesBy } = props;
  const infoHtml = info.map(item => {
    return (
      <div key={item.name}>
        {item.name}
        <span> - </span>
        {item.value}
      </div>
    );
  });

  return (
    <div>
      <div className={styles.backButton} data-tid="backButton">
        <Link to={routes.HOME}>
          <i className="fa fa-arrow-left fa-3x" />
        </Link>
      </div>
      <div className={`counter ${styles.info}`} data-tid="info">
        {infoHtml}
      </div>
      <div className={styles.btnGroup}>
        <button
          className={styles.btn}
          onClick={readInfo}
          data-tclass="btn"
          type="button"
        >
          INFO
          <i className="fa fa-plus" />
        </button>
        <button
          className={styles.btn}
          onClick={readBooks}
          data-tclass="btn"
          type="button"
        >
          BOOKS
          <i className="fa fa-plus" />
        </button>
        <button
          className={styles.btn}
          onClick={readVersesBy}
          data-tclass="btn"
          type="button"
        >
          VERSES
        </button>
      </div>
    </div>
  );
}
