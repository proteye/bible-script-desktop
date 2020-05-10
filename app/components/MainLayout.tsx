import React, { ReactNode } from 'react';

type Props = {
  navbar: ReactNode;
  children: ReactNode;
};

export default function MainLayout(props: Props) {
  const { navbar, children } = props;

  return (
    <div className="main-layout" data-tid="main-layout">
      <div className="main-layout__navbar" data-tid="navbar">
        {navbar}
      </div>
      <div className="main-layout__wrapper" data-tid="wrapper">
        <div className="main-layout__row">{children}</div>
      </div>
    </div>
  );
}
