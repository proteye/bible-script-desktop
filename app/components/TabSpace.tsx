import React, { ReactNode, UIEvent } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';
import { createStyles, Theme } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import withStyles from '@material-ui/core/styles/withStyles';
import { TabInfo } from '../reducers/workspace/types';
import { TabRemoveParams, TabSelectParams } from '../actions/workspace/actions';
import TabPanel from './TabPanel';

type Props = {
  tabs: TabInfo[];
  workspaceId: string;
  selectedTabId: string | null;
  selectedTabIndex: number | null;
  tabAdd: (id: string) => void;
  tabRemove: (params: TabRemoveParams) => void;
  tabSelect: (params: TabSelectParams) => void;
  children?: ReactNode;
};

function tabProps(id: string) {
  return {
    id: `tab-${id}`,
    'data-id': id,
    'aria-controls': `tabpanel-${id}`
  };
}

interface StyledTabsProps {
  value: number | null;
  onChange: (event: React.ChangeEvent<{}>, newValue: number) => void;
  indicatorColor?: string | undefined;
  textColor?: string | undefined;
  variant?: string | undefined;
  scrollButtons?: string | undefined;
}

const StyledTabs = withStyles(() =>
  createStyles({
    root: {
      height: 30,
      minHeight: 30
    }
  })
)((props: StyledTabsProps) => <Tabs {...props} />);

interface StyledTabProps {
  component?: string;
  label?: string | ReactNode;
  icon?: ReactNode;
}

const StyledTab = withStyles((theme: Theme) =>
  createStyles({
    root: {
      height: 30,
      minHeight: 30,
      fontWeight: theme.typography.fontWeightRegular,
      fontSize: theme.typography.pxToRem(10),
      opacity: 0.5,
      '&:focus': {
        opacity: 1
      }
    }
  })
)((props: StyledTabProps) => <Tab disableRipple {...props} />);

export default function TabSpace(props: Props) {
  const {
    tabs,
    workspaceId,
    selectedTabId,
    selectedTabIndex,
    tabAdd,
    tabRemove,
    tabSelect,
    children
  } = props;

  const onTabRemove = (params: { id: string; tabId: string }) => (
    e: UIEvent
  ) => {
    e.stopPropagation();
    tabRemove({ id: params.id, tabId: params.tabId });
  };

  const tabLabel = (tab: TabInfo, index: number) => (
    <div>
      <span>{`Tab ${index + 1}`}</span>
      <IconButton onClick={onTabRemove({ id: workspaceId, tabId: tab.id })}>
        <CloseIcon fontSize="small" />
      </IconButton>
    </div>
  );

  return (
    <div className="tabspace" data-tid="tabspace">
      <AppBar position="static" color="default">
        <StyledTabs
          value={selectedTabIndex}
          onChange={(_e, index: number) => {
            if (index === tabs.length) {
              tabAdd(workspaceId);
              return;
            }
            tabSelect({ id: workspaceId, tabIndex: index });
          }}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="auto"
        >
          {tabs.map((tab, index) => (
            <StyledTab
              key={tab.id}
              component="div"
              label={tabLabel(tab, index)}
              // eslint-disable jsx-props-no-spreading
              {...tabProps(tab.id)}
            />
          ))}
          <StyledTab
            key="new"
            icon={<AddIcon fontSize="small" />}
            arial-label="Add"
            // ignore: eslint-disable jsx-props-no-spreading
            {...tabProps('new')}
          />
        </StyledTabs>
      </AppBar>
      {tabs.map(tab => (
        <TabPanel key={tab.id} id={tab.id} selectedId={selectedTabId}>
          {tab.id}
        </TabPanel>
      ))}
      {children}
    </div>
  );
}
