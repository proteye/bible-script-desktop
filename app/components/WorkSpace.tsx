import React, { ReactNode, useCallback } from 'react';
import { ResizableBox, ResizeHandle } from 'react-resizable';
import IconButton from '@material-ui/core/IconButton';
import Close from '@material-ui/icons/Close';
import { WorkspaceInfo } from '../reducers/workspace/types';
import { WorkspaceChangeParams } from '../actions/workspace/actions';

type Props = {
  workspace: WorkspaceInfo;
  workspaceRemove: (id: string) => void;
  workspaceChange: (params: WorkspaceChangeParams) => void;
  children: ReactNode;
};

export default function WorkSpace(props: Props) {
  const { workspace, workspaceRemove, workspaceChange, children } = props;

  const callbacks = {
    onResize: useCallback((_event, { size }) => {
      workspaceChange({
        id: workspace.id,
        width: size.width,
        height: size.height
      });
    }, [])
  };

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

  const handle: (resizeHandle: ResizeHandle) => React.ReactNode = h => (
    <div className={`workspace__box-handle workspace__box-handle_${h}`} />
  );

  return (
    <ResizableBox
      className="workspace__box"
      width={workspace.width}
      height={workspace.height}
      handleSize={[8, 8]}
      handle={handle}
      resizeHandles={workspace.resizeHandles}
      minConstraints={workspace.minConstraints}
      maxConstraints={workspace.maxConstraints}
      onResize={callbacks.onResize}
    >
      {topbar}
      {children}
    </ResizableBox>
  );
}
