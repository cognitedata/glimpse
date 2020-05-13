// Copyright 2020 Cognite AS
import React, { useEffect } from 'react';
import { CogniteClient, REDIRECT } from '@cognite/sdk';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import {
  APP_NAME,
  APP_VERSION,
  CDF_PROJECT as project,
} from '../constants/appData';
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

    return <WrappedComponet />;
  };
  return connect(null, mapDispatchToProps)(WithSecurityComponent);
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    setCdfClient: (client: CogniteClient) => dispatch(setCdfClient(client)),
    login: () => dispatch(login()),
  };
};

type CompProps = ReturnType<typeof mapDispatchToProps>;

export default withSecurity;
