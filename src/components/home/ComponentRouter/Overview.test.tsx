// Copyright 2020 Cognite AS
import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { AppState, initialState } from 'store/reducers/app';
import { createStore } from 'redux';
import rootReducer from 'store/reducers/root-reducer';
import { Provider } from 'react-redux';
import { assetList } from 'mocks/assetList';
import Overview from './Overview';

const renderWithRedux = (ui: JSX.Element, state: { appState: AppState }) => {
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

describe('Overview', () => {
  test('Display overview when assets availble', async () => {
    const { container } = renderWithRedux(<Overview />, {
      appState: { ...initialState, assets: assetList },
    });
    expect(container).not.toBeEmpty();
  });

  test("Shouldn't display overview when assets are not availble", async () => {
    const { container } = renderWithRedux(<Overview />, {
      appState: { ...initialState, assets: [] },
    });
    expect(container).toBeEmpty();
  });
});
