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
  const showAlert = () => {
    props.setAlerts({
      type: 'error',
      text: 'Test message',
    });
  };

  const navList: NavListItem[] = [
    {
      id: 1,
      text: 'Overview',
      icon: <RemoveRedEyeIconOutlined />,
      routeTo: '/overview',
    },
    {
      id: 2,
      text: 'Settings',
      icon: <SettingsIconOutlined />,
      routeTo: '/settings',
    },
    {
      id: 3,
      text: 'Feedback',
      icon: <SmsIconOutlined />,
      routeTo: '/feedback',
      onClick: showAlert,
    },
    {
      id: 4,
      text: 'Log out',
      icon: <ExitToAppIconOutlined />,
      routeTo: '/logout',
      onClick: props.logout,
    },
  ];

  useEffect(() => {
    props.updateAssets();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const homeHtml = props.loader ? <Loader /> : <Home navList={navList} />;

  return homeHtml;
};

const mapStateToProps = (state: RootState) => ({
  loader: state.appState.loader,
  cdfClient: state.appState.cdfClient,
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
