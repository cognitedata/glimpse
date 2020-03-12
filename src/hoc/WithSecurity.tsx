import React, { useEffect, useContext } from 'react';
import { CogniteClient, REDIRECT, Group } from '@cognite/sdk';
import { AppContext, AppContextType } from '../context/AppContextManager';
import {
  APP_NAME,
  APP_VERSION,
  MACHINE_EXTERNAL_IDS,
  ADMIN_GROUPS,
  USER_REQUIRED_CAPABILITIES,
  CDF_PROJECT as project,
} from '../constants/appData';
import { MESSAGES } from '../constants/messages';

type Capability = {
  [key: string]: {
    actions: string[];
  };
};

type withSecurityPropType =
  | {
      sdk?: CogniteClient;
    }
  | undefined;

// console.log(UserInfo)

const authResultsKey = `${APP_NAME}_${APP_VERSION}_storage/${project}/authResult`;

const deafultClient = new CogniteClient({ appId: APP_NAME });

const getUserCapabilities = (groups: Group[]) =>
  groups
    .map(group =>
      group.capabilities?.map((capability: Capability) =>
        Object.keys(capability).map(capabilityKey =>
          capability[capabilityKey].actions.map(
            (action: string) => `${capabilityKey}:${action}`
          )
        )
      )
    )
    .toString()
    .split(',');

const hasPermissions = (userCapabilities: string[]) =>
  USER_REQUIRED_CAPABILITIES.filter(userRequiredCapability =>
    userCapabilities.includes(userRequiredCapability)
  ).length === USER_REQUIRED_CAPABILITIES.length;

const isAdmin = (groups: Group[]) =>
  groups.filter(group => ADMIN_GROUPS.includes(group.name)).length > 0;

const withSecurity = (props?: withSecurityPropType) => (
  WrappedComponet: React.ComponentType
) => {
  const WithSecurityComponent = () => {
    const appContext = useContext<AppContextType>(AppContext);

    const client = props?.sdk || deafultClient;

    client.loginWithOAuth({
      project,
      accessToken: localStorage.getItem(authResultsKey) || '',
      onAuthenticate: REDIRECT,
      onTokens: ({ accessToken }) => {
        localStorage.setItem(authResultsKey, accessToken);
      },
    });

    const login = async () => {
      appContext.setLoading(true);
      appContext.setLoggedIn(false);
      let status = await client.login.status();
      if (!status || !localStorage.getItem(authResultsKey)) {
        await client.authenticate();
        status = await client.login.status();
      }
      const groups = await client.groups.list();

      const userCapabilities = getUserCapabilities(groups);
      const isAdminUser = isAdmin(groups);
      appContext.setAdminUser(isAdminUser);
      appContext.setUserCapabilities(userCapabilities);
      const userHasPermissions = hasPermissions(userCapabilities);
      console.log('User Capabilities', userCapabilities);
      if (!userHasPermissions) {
        appContext.setAlerts({
          open: true,
          type: 'error',
          text: MESSAGES.NO_ACCESS_MSG,
          handleClose: errorHandleClose,
          duration: 10000,
          hideApp: true,
        });
      } else {
        appContext.setLoggedIn(!!status);
        const userInfo = { name: status?.user };
        appContext.setUserInfo(userInfo);
        try {
          const assets = await client.assets.retrieve(
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
        }
      }
      // console.log("userHasPermissions", userHasPermissions);
      appContext.setLoading(false);
    };

    const errorHandleClose = (
      event?: React.SyntheticEvent,
      reason?: string
    ) => {
      appContext.setAlerts(undefined);
      logout();
    };

    const logout = async () => {
      console.log('came to logout');
      const redirectUrl = `https://${window.location.host}/`;
      try {
        localStorage.removeItem(authResultsKey);
        appContext.setLoggedIn(false);
        await client.logout.getUrl({ redirectUrl });
        login();
      } catch (ex) {
        console.log('error on logout');
      }
    };

    useEffect(() => {
      appContext.setLogout(() => logout);
      login();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return <WrappedComponet />;
  };
  return WithSecurityComponent;
};

export default withSecurity;
