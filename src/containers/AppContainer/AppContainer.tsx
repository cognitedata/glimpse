// Copyright 2020 Cognite AS
import React, { FC, useEffect } from 'react';

import RemoveRedEyeIconOutlined from '@material-ui/icons/RemoveRedEyeOutlined';
import SettingsIconOutlined from '@material-ui/icons/SettingsOutlined';
import SmsIconOutlined from '@material-ui/icons/SmsOutlined';
import ExitToAppIconOutlined from '@material-ui/icons/ExitToAppOutlined';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';

import withErrorHandling from 'hoc/WithErrorHandling';
import withSecurity from 'hoc/WithSecurity';
import { RootState, RootAction } from 'StoreTypes';
import { RouterPaths } from 'constants/router';
import Loader from '../../components/UI/Loader/Loader';

import { NavListItem } from '../../components/home/NavList/NavList';

import Home from '../../components/home/Home';

import {
  setAlerts,
  updateAssets,
  logout,
} from '../../store/actions/root-action';

/**
 * This contains some major functions such as assets fetch etc.
 */
const AppContainer: FC<Props> = (props: Props) => {
  const onOverviewClick = () => {
    /**
     * On overview click, if there are no configured machines,
     * app will redirect back to settings page and show a warning.
     */
    if (props.assetsLength === 0) {
      props.setAlerts({
        type: 'warning',
        text: 'Machines are not configured!',
      });
    }
  };

  const navList: NavListItem[] = [
    {
      id: 1,
      text: 'Overview',
      icon: <RemoveRedEyeIconOutlined />,
      routeTo: RouterPaths.OVERVIEW,
      onClick: onOverviewClick,
    },
    {
      id: 2,
      text: 'Settings',
      icon: <SettingsIconOutlined />,
      routeTo: RouterPaths.SETTINGS,
    },
    {
      id: 3,
      text: 'Feedback',
      icon: <SmsIconOutlined />,
      routeTo: RouterPaths.FEEDBACK,
    },
    {
      id: 4,
      text: 'Log out',
      icon: <ExitToAppIconOutlined />,
      routeTo: RouterPaths.LOGOUT,
      onClick: props.logout,
    },
  ];

  useEffect(() => {
    props.updateAssets(true);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (props.loading) {
    return <Loader />;
  }
  return props.loggedIn ? <Home navList={navList} /> : null;
};

const mapStateToProps = (state: RootState) => ({
  loading: state.appState.loading,
  cdfClient: state.appState.cdfClient,
  assetsLength: state.appState.assets.length,
  loggedIn: state.authState.loggedIn,
});

const dispatchProps = {
  setAlerts,
  updateAssets,
  logout,
};

const mapDispatchToProps = (dispatch: Dispatch<RootAction>) =>
  bindActionCreators(dispatchProps, dispatch);

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

export default withErrorHandling(
  withSecurity()(connect(mapStateToProps, dispatchProps)(AppContainer))
);
