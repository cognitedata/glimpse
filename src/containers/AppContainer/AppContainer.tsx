import React, { useContext, FC, useEffect } from 'react';

import RemoveRedEyeIconOutlined from '@material-ui/icons/RemoveRedEyeOutlined';
import SettingsIconOutlined from '@material-ui/icons/SettingsOutlined';
import SmsIconOutlined from '@material-ui/icons/SmsOutlined';
import ExitToAppIconOutlined from '@material-ui/icons/ExitToAppOutlined';
import { CogniteClient } from '@cognite/sdk';

import withErrorHandling from 'hoc/WithErrorHandling';
import withSecurity from 'hoc/WithSecurity';
import { AppContext, AppContextType } from '../../context/AppContextManager';
import Loader from '../../components/UI/Loader/Loader';

import { NavListItem } from '../../components/home/NavList/NavList';

import Home from '../../components/home/Home';

import { MACHINE_EXTERNAL_IDS } from '../../constants/appData';
import { MESSAGES } from '../../constants/messages';

/**
 * This contains some major functions such as assets fetch etc.
 */
const AppContainer: FC = () => {
  const appContext = useContext<AppContextType>(AppContext);

  const errorHandleClose = (event?: React.SyntheticEvent, reason?: string) => {
    appContext.setAlerts(undefined);
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
    { id: 1, text: 'Overview', icon: <RemoveRedEyeIconOutlined /> },
    { id: 2, text: 'Settings', icon: <SettingsIconOutlined /> },
    { id: 3, text: 'Feedback', icon: <SmsIconOutlined />, onClick: showAlert },
    {
      id: 4,
      text: 'Log out',
      icon: <ExitToAppIconOutlined />,
      onClick: appContext.logout,
    },
  ];

  const fetchAssets = async (cogniteClient: CogniteClient) => {
    appContext.setLoading(true);
    try {
      const assets = await cogniteClient.assets.retrieve(
        MACHINE_EXTERNAL_IDS.map(id => ({ externalId: id }))
      );
      appContext.setAssets(assets);
    } catch (error) {
      appContext.setAlerts({
        open: true,
        type: 'error',
        text: MESSAGES.ASSETS_FETCH_ERROR,
        handleClose: errorHandleClose,
        duration: 10000,
        hideApp: true,
      });
    } finally {
      appContext.setLoading(false);
    }
  };

  useEffect(() => {
    console.log(appContext.cogniteClient);
    if (appContext.cogniteClient) {
      fetchAssets(appContext.cogniteClient);
    }
  }, [appContext.cogniteClient]);

  const homeHtml = appContext.loading ? <Loader /> : <Home navList={navList} />;

  return homeHtml;
};

export default withErrorHandling(withSecurity()(AppContainer));
