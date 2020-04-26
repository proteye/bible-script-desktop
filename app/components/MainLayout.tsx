import React, { ReactNode } from 'react';
// import './MainLayout.scss';

type Props = {
  sidebar?: ReactNode;
  children: ReactNode;
};

export default function MainLayout(props: Props) {
  const { sidebar, children } = props;
  return (
    <div className="main-layout" data-tid="main-layout">
      <div className="main-layout__wrapper" data-tid="wrapper">
        <div className="main-layout__row">
          {sidebar && (
            <div className="main-layout__sidebar" data-tid="sidebar">
              {sidebar}
            </div>
          )}
          <div className="main-layout__container" data-tid="container">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
