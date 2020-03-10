import React, { useContext } from 'react';
import clsx from 'clsx';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

import RemoveRedEyeIcon from '@material-ui/icons/RemoveRedEye';
import SettingsIcon from '@material-ui/icons/Settings';
import SmsIcon from '@material-ui/icons/Sms';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { AppContext, AppContextType } from '../../context/AppContextManager';
import MachineSelector from '../MachineSelector/MachineSelector';
import Logo from '../Logo/Logo';
import Loader from '../Loader/Loader';

import './Base.css';

import NavList, { NavListItem } from './NavList/NavList';

import withSecurity from '../../hoc/withSecurity';
import withErrorHandling from '../../hoc/withErrorHandling';

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    hide: {
      display: 'none',
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
      whiteSpace: 'nowrap',
    },
    drawerOpen: {
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    drawerClose: {
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      overflowX: 'hidden',
      width: theme.spacing(7) + 1,
    },
    toolbar: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: theme.spacing(0, 1),
      ...theme.mixins.toolbar,
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
  })
);

const Base: React.FC = () => {
  const appContext = useContext<AppContextType>(AppContext);

  // console.log(appContext);

  const classes = useStyles();
  // const theme = useTheme();
  const [open, setOpen] = React.useState(true);

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  const errorHandleClose = (event?: React.SyntheticEvent, reason?: string) => {
    // appContext.setAlerts(null);
  };

  const showAlert = () => {
    appContext.setAlerts({
      open: true,
      type: 'error',
      text: 'Test message',
      handleClose: errorHandleClose,
      duration: 10000,
    });
  };

  const navList: NavListItem[] = [
    { id: 1, text: 'Overview', icon: <RemoveRedEyeIcon /> },
    { id: 2, text: 'Settings', icon: <SettingsIcon /> },
    { id: 3, text: 'Feedback', icon: <SmsIcon />, onClick: showAlert },
    {
      id: 4,
      text: 'Log out',
      icon: <ExitToAppIcon />,
      onClick: appContext.logout,
    },
  ];

  const baseHtml = appContext.loading ? (
    <Loader />
  ) : (
    <div className={classes.root}>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <Logo hide={!open} />
          <IconButton onClick={handleDrawerToggle}>
            {open ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
        <Divider />
        <NavList navList={navList} />
      </Drawer>
      <main className="widgetsHolder">
        <MachineSelector assets={appContext.assets} />
      </main>
    </div>
  );

  return baseHtml;
};

// export default Base;

export default withErrorHandling(withSecurity(Base));
