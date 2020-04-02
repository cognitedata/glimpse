// Copyright 2020 Cognite AS
import React, { FC } from 'react';
import clsx from 'clsx';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

import Logo from '../UI/Logo/Logo';
import CogniteLogo from '../UI/CogniteLogo/CogniteLogo';

import './Home.css';

import NavList, { NavListItem } from './NavList/NavList';
import TopBar from './TopBar/TopBar';
import ComponentRouter from './ComponentRouter/ComponentRouter';

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

type Props = {
  navList: NavListItem[];
};

/**
 *
 * This is the Home component where it binds all the main components together
 *  such as Left navigation, App header etc
 */
const Home: FC<Props> = ({ navList }: Props) => {
  const classes = useStyles();

  const [open, setOpen] = React.useState(true);

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  const homeHtml = (
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
        <div className={`${classes.toolbar} Drawer-Header`}>
          <Logo hide={!open} />
          <IconButton onClick={handleDrawerToggle}>
            {open ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
        <Divider />
        <NavList navList={navList} expanded={open} />
        <CogniteLogo width={open ? '50px' : '20px'} />
      </Drawer>
      <main className="widgetsHolder">
        <div className="topBarHolder">
          <TopBar />
        </div>
        <div style={{ height: '80vh', padding: '10px' }}>
          <ComponentRouter />
        </div>
      </main>
    </div>
  );

  return homeHtml;
};

export default Home;
