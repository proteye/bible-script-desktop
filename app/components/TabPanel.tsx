import React, { ReactNode } from 'react';

type Props = {
  id: string;
  selectedId: string | null;
  children?: ReactNode;
};

export default function TabPanel(props: Props) {
  const { id, selectedId, children } = props;

  return (
    <div
      role="tabpanel"
      hidden={selectedId !== id}
      id={`tabpanel-${id}`}
      className="tabpanel"
      data-tid="tabpanel"
    >
      <div className="tabpanel__wrapper" data-tid="wrapper">
        <div className="tabpanel__row">
          <div className="tabpanel_container" data-tid="container">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
