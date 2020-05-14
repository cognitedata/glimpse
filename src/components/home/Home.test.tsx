// Copyright 2020 Cognite AS
import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { RouterPaths } from 'constants/router';
import { AuthState, initialState } from 'store/reducers/auth';
import { createStore } from 'redux';
import rootReducer from 'store/reducers/root-reducer';
import { Provider } from 'react-redux';
import Home from './Home';

const renderWithRedux = (ui: JSX.Element, state: { authState: AuthState }) => {
  const store = createStore(rootReducer, state);
  return {
    ...render(
      <BrowserRouter>
        <Provider store={store}>{ui}</Provider>
      </BrowserRouter>
    ),
    store,
  };
};

const navList = [
  {
    id: 1,
    text: 'Overview',
    icon: <></>,
    routeTo: RouterPaths.OVERVIEW,
  },
  {
    id: 2,
    text: 'Settings',
    icon: <></>,
    routeTo: RouterPaths.SETTINGS,
  },
  {
    id: 3,
    text: 'Feedback',
    icon: <></>,
    routeTo: RouterPaths.FEEDBACK,
  },
  {
    id: 4,
    text: 'Log out',
    icon: <></>,
    routeTo: RouterPaths.LOGOUT,
  },
];

const userInfo = { admin: false, name: '<User Name>' };

describe('Home', () => {
  test('Display user', async () => {
    const { getByText } = renderWithRedux(<Home navList={navList} />, {
      authState: { ...initialState, userInfo },
    });
    expect(getByText(userInfo.name)).toBeInTheDocument();
  });

  test('Display navigation links', async () => {
    const { getByText } = renderWithRedux(<Home navList={navList} />, {
      authState: { ...initialState, userInfo },
    });
    navList.forEach(navLink => {
      expect(getByText(navLink.text).closest('a')).toHaveAttribute(
        'href',
        navLink.routeTo
      );
    });
  });

  test('Display logo', async () => {
    const { getByAltText } = renderWithRedux(<Home navList={navList} />, {
      authState: { ...initialState, userInfo },
    });
    expect(getByAltText('Aarbakke Logo')).toBeInTheDocument();
  });
});
