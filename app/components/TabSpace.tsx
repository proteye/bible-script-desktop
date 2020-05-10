import React, { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

export default function TabSpace(props: Props) {
  const { children } = props;
  return (
    <div className="tabspace" data-tid="tabspace">
      <div className="tabspace__wrapper" data-tid="wrapper">
        <div className="tabspace__row">
          <div className="tabspace__container" data-tid="container">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
