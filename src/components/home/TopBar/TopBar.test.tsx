// Copyright 2020 Cognite AS
import React from 'react';
import { render } from '@testing-library/react';
import { AuthState, initialState } from 'store/reducers/auth';
import rootReducer from 'store/reducers/root-reducer';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import TopBar from './TopBar';

const renderWithRedux = (ui: JSX.Element, state: { authState: AuthState }) => {
  const store = createStore(rootReducer, state);
  return {
    ...render(<Provider store={store}>{ui}</Provider>),
    store,
  };
};

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: () => ({
    pathname: '/settings',
  }),
}));

let userInfo = { admin: false, name: '<User Name>' };

describe('Top Bar', () => {
  test('Display logged in user name', async () => {
    const { getByText } = renderWithRedux(<TopBar />, {
      authState: { ...initialState, userInfo },
    });
    expect(getByText(userInfo.name)).toBeInTheDocument();
  });

  test('Display widget configurator button', async () => {
    const { getByTestId } = renderWithRedux(<TopBar />, {
      authState: { ...initialState, userInfo },
    });
    expect(getByTestId('widget-add-button')).toBeInTheDocument();
  });

  test('Display alarm configurator button', async () => {
    const { getByTestId } = renderWithRedux(<TopBar />, {
      authState: { ...initialState, userInfo },
    });
    expect(getByTestId('alarm-config-button')).toBeInTheDocument();
  });

  test('Display machine configurator button for admin users', async () => {
    userInfo = { admin: true, name: '<User Name>' };
    const { getByTestId, container } = renderWithRedux(<TopBar />, {
      authState: { ...initialState, userInfo },
    });
    expect(getByTestId('machine-configurator-btn')).toBeInTheDocument();
  });
});
