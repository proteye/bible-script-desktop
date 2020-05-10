import React, { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

export default function Settings() {
  return (
    <div className="navbar" data-tid="navbar">
      <div className="navbar__wrapper" data-tid="wrapper">
        <div className="navbar__row">
          <div className="navbar__container" data-tid="container" />
        </div>
      </div>
    </div>
  );
}
