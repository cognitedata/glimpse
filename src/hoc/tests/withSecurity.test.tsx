// Copyright 2020 Cognite AS
import '@testing-library/jest-dom';
import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { render } from '@testing-library/react';
import withSecurity from 'hoc/WithSecurity';
import { groupList } from '../../mocks';

import rootReducer from '../../store/reducers/root-reducer';
import {
  AuthState,
  initialState as authInitialState,
} from '../../store/reducers/auth';
import {
  AppState,
  initialState as appInitialState,
} from '../../store/reducers/app';

const loginStatus = jest.fn();

loginStatus.mockReturnValueOnce(false).mockReturnValueOnce({
  user: 'test user',
  loggedIn: true,
  project: 'test project',
  projectId: 204967111817541,
});

class CogniteClient {
  loginWithOAuth = jest.fn();
  authenticate = jest.fn();
  login = {
    status: loginStatus,
  };
  groups = {
    list: jest.fn(),
  };
}

const client = new CogniteClient();

beforeEach(() => {
  client.groups.list.mockReturnValue(groupList);
});

afterEach(() => {
  jest.clearAllMocks();
});

const renderWithRedux = (
  ui: JSX.Element,
  initialState: { appState: AppState; authState: AuthState }
) => {
  const store = createStore(rootReducer, initialState);
  return {
    ...render(<Provider store={store}>{ui}</Provider>),
    store,
  };
};

describe('With Security', () => {
  test('Home component loaded successfully when the login status is updated', async () => {
    const Home = () => <div>Home Component</div>;
    const WrappedComponent = withSecurity({ sdk: client })(Home);
    const { getByText } = renderWithRedux(<WrappedComponent />, {
      appState: { ...appInitialState, cdfClient: client },
      authState: { ...authInitialState, loggedIn: true },
    });
    expect(getByText('Home Component')).toBeInTheDocument();
  });
});
