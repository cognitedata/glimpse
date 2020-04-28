// Copyright 2020 Cognite AS
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { AppState, initialState as appInitialState } from 'store/reducers/app';
import rootReducer from 'store/reducers/root-reducer';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import AlarmConfigurator from './AlarmConfigurator';

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

describe('Alarm Configuration Popup', () => {
  test('Render configuration button intially', async () => {
    const { getByTestId } = renderWithRedux(<AlarmConfigurator />, {
      appState: { ...appInitialState },
    });
    expect(getByTestId('config-button')).toBeInTheDocument();
  });

  test('Display popup on button click ', async () => {
    const { getByText, getByTestId } = renderWithRedux(<AlarmConfigurator />, {
      appState: { ...appInitialState },
    });
    fireEvent.click(getByTestId('config-button'));
    expect(getByText('Alarm Configuration')).toBeInTheDocument();
  });

  test('Display field list ', async () => {
    const { getByText, getByTestId } = renderWithRedux(<AlarmConfigurator />, {
      appState: { ...appInitialState },
    });
    fireEvent.click(getByTestId('config-button'));
    expect(getByText('Event Type')).toBeInTheDocument();
    expect(getByText('Event Subtype')).toBeInTheDocument();
    expect(getByText('Metafield Key')).toBeInTheDocument();
    expect(getByText('Polling Interval (In Seconds)')).toBeInTheDocument();
    expect(getByText('Start Time')).toBeInTheDocument();
  });

  test('Set default value to Polling Interval ', async () => {
    const { getByTestId } = renderWithRedux(<AlarmConfigurator />, {
      appState: { ...appInitialState },
    });
    fireEvent.click(getByTestId('config-button'));
    expect(getByTestId('pollingInterval').innerHTML).toContain('value="10"');
    expect(getByTestId('startTime').innerHTML).toContain('value="24"');
  });
});
