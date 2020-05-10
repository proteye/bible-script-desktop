import React, { ReactNode } from 'react';
import { ResizableBox } from 'react-resizable';
import { WorkspaceInfo } from '../reducers/workspace/types';

type Props = {
  workspace: WorkspaceInfo;
  children: ReactNode;
};

export default function WorkSpace(props: Props) {
  const { workspace, children } = props;

  return (
    <ResizableBox
      className="custom-box box"
      width={workspace.width}
      height={workspace.height}
      handleSize={[8, 8]}
      resizeHandles={workspace.resizeHandles}
      minConstraints={[100, 100]}
      maxConstraints={[1000, 1000]}
    >
      {children}
    </ResizableBox>
  );
}
