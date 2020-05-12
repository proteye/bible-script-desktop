import React, { ReactNode } from 'react';
import { ResizableBox } from 'react-resizable';
import IconButton from '@material-ui/core/IconButton';
import Close from '@material-ui/icons/Close';
import { WorkspaceInfo } from '../reducers/workspace/types';

type Props = {
  workspace: WorkspaceInfo;
  workspaceRemove: (id: string) => void;
  children: ReactNode;
};

export default function WorkSpace(props: Props) {
  const { workspace, workspaceRemove, children } = props;

  const topbar = (
    <div className="workspace__topbar">
      <div className="workspace__topbar-actions">
        <IconButton
          className="workspace__topbar-actions-button"
          aria-label="delete"
          size="small"
          onClick={() => workspaceRemove(workspace.id)}
        >
          <Close className="workspace__topbar-actions-icon" fontSize="small" />
        </IconButton>
      </div>
    </div>
  );

  return (
    <ResizableBox
      className="workspace__box"
      width={workspace.width}
      height={workspace.height}
      handleSize={[8, 8]}
      handle={h => (
        <span className={`workspace__box-handle workspace__box-handle_${h}`} />
      )}
      resizeHandles={workspace.resizeHandles}
      minConstraints={[100, 100]}
      maxConstraints={[1000, 1000]}
    >
      {topbar}
      {children}
    </ResizableBox>
  );
}
