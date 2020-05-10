import { Dispatch as ReduxDispatch, AnyAction } from 'redux';
import { ResizeHandle } from 'react-resizable';

export type TabInfo = {
  id: string;
  isFocused: boolean;
};

export type WorkspaceInfo = {
  id: string;
  tabs: TabInfo[];
  resizeHandles: ResizeHandle[];
  width: number;
  height: number;
  maxTabCount: number;
  isTabAddDisabled: boolean;
  isFocused: boolean;
};

export interface WorkspaceState {
  workspaces: WorkspaceInfo[];
  maxCount: number;
  isAddDisabled: boolean;
}

export type Dispatch = ReduxDispatch<AnyAction>;
