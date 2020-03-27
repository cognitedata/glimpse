import React, { useEffect } from 'react';
import { CogniteClient, REDIRECT } from '@cognite/sdk';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { RootState } from 'StoreTypes';

import {
  APP_NAME,
  APP_VERSION,
  CDF_PROJECT as project,
} from '../constants/appData';
import Loader from '../components/UI/Loader/Loader';
import { setCdfClient, login } from '../store/actions/root-action';

type withSecurityPropType =
  | {
      sdk?: CogniteClient;
    }
  | undefined;

const authResultsKey = `${APP_NAME}_${APP_VERSION}_storage/${project}/authResult`;

const deafultClient = new CogniteClient({ appId: APP_NAME });

/**
 * This hoc manages all the auth operations
 */
const withSecurity = (props?: withSecurityPropType) => (
  WrappedComponet: React.ComponentType
) => {
  const WithSecurityComponent = (compProps: CompProps) => {
    const cogniteClient = props?.sdk || deafultClient;

    compProps.setCdfClient(cogniteClient);

    cogniteClient.loginWithOAuth({
      project,
      accessToken: localStorage.getItem(authResultsKey) || '',
      onAuthenticate: REDIRECT,
      onTokens: ({ accessToken }) => {
        localStorage.setItem(authResultsKey, accessToken);
      },
    });

    useEffect(() => {
      compProps.login();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    let html = null;
    if (compProps.loggedIn) {
      html = <WrappedComponet />;
    } else if (compProps.loading) {
      html = <Loader />;
    }
    return html;
  };
  return connect(mapStateToProps, mapDispatchToProps)(WithSecurityComponent);
};

const mapStateToProps = (state: RootState) => ({
  loading: state.appState.loading,
  loggedIn: state.authState.loggedIn,
});

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    setCdfClient: (client: CogniteClient) => dispatch(setCdfClient(client)),
    login: () => dispatch(login()),
  };
};

type CompProps = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

export default withSecurity;
