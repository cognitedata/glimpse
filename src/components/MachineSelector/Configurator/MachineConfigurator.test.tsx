// Copyright 2020 Cognite AS
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { AppState, initialState as appInitialState } from 'store/reducers/app';
import rootReducer from 'store/reducers/root-reducer';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import MachineConfigurator from './MachineConfigurator';

const renderWithRedux = (
  ui: JSX.Element,
  initialState: { appState: AppState }
) => {
  const store = createStore(rootReducer, initialState);
  return {
    ...render(<Provider store={store}>{ui}</Provider>),
    store,
  };
};

describe('Machine Configuration', () => {
  test('Render configuration button intially', async () => {
    const { getByTestId } = renderWithRedux(<MachineConfigurator />, {
      appState: { ...appInitialState },
    });
    expect(getByTestId('machine-configurator-btn')).toBeInTheDocument();
  });

  test('Display popup on button click ', async () => {
    const { getByText, getByTestId } = renderWithRedux(
      <MachineConfigurator />,
      {
        appState: { ...appInitialState },
      }
    );
    fireEvent.click(getByTestId('machine-configurator-btn'));
    expect(getByText('Machine Configuration')).toBeInTheDocument();
  });

  test('Display form field ', async () => {
    const { getByText, getByTestId } = renderWithRedux(
      <MachineConfigurator />,
      {
        appState: { ...appInitialState },
      }
    );
    fireEvent.click(getByTestId('machine-configurator-btn'));
    expect(getByText('Asset External Id')).toBeInTheDocument();
  });
});
