import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import React, { useEffect } from 'react';
import { workspace as workspaceActions } from '../actions';
import { RootState, WorkspaceState } from '../reducers/stateTypes';
import MainLayout from '../components/MainLayout';
import Navbar from '../components/Navbar';
// import TabSpace from '../components/TabSpace';
import BiblePage from './BiblePage';
import { TabRemoveParams } from '../actions/workspace/actions';
import WorkSpace from '../components/WorkSpace';

type Props = {
  workspaceState: WorkspaceState;
  workspaceAdd: () => void;
  workspaceRemove: (id: string) => void;
  tabAdd: (id: string) => void;
  tabRemove: (params: TabRemoveParams) => void;
};

function mapStateToProps(state: RootState) {
  return {
    workspaceState: state.workspace
  };
}

function mapDispatchToProps(dispatch: Dispatch) {
  return bindActionCreators({ ...workspaceActions }, dispatch);
}

function HomePage(props: Props) {
  const {
    workspaceState,
    workspaceAdd
    // workspaceRemove,
    // tabAdd,
    // tabRemove
  } = props;

  useEffect(() => {}, []);

  const workspaces = workspaceState.workspaces.map(workspace => {
    return (
      <WorkSpace key={workspace.id} workspace={workspace}>
        {workspace.tabs.map(tab => (
          <BiblePage key={tab.id} />
        ))}
      </WorkSpace>
    );
  });

  const navbar = (
    <Navbar workspaceState={workspaceState} workspaceAdd={workspaceAdd} />
  );

  return <MainLayout navbar={navbar}>{workspaces}</MainLayout>;
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
