import React, { ReactNode } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import CreateNewFolderIcon from '@material-ui/icons/CreateNewFolder';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import NotesIcon from '@material-ui/icons/Notes';
import TranslateIcon from '@material-ui/icons/Translate';
import { WorkspaceState } from '../reducers/workspace/types';

type Props = {
  workspaceState: WorkspaceState;
  workspaceAdd: () => void;
};

export default function Navbar(props: Props) {
  const { workspaceState, workspaceAdd } = props;

  return (
    <div className="navbar" data-tid="navbar">
      <AppBar position="static">
        <Toolbar variant="dense">
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            disabled={workspaceState.isAddDisabled}
            onClick={workspaceAdd}
          >
            <CreateNewFolderIcon />
          </IconButton>
          <div className="navbar__margin" />
          <IconButton edge="start" color="inherit" aria-label="menu">
            <MenuBookIcon />
          </IconButton>
          <div className="navbar__margin" />
          <IconButton edge="start" color="inherit" aria-label="menu">
            <NotesIcon />
          </IconButton>
          <div className="navbar__margin" />
          <IconButton edge="start" color="inherit" aria-label="menu">
            <TranslateIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </div>
  );
}
