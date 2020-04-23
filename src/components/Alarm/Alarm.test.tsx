// Copyright 2020 Cognite AS
import React from 'react';
import { render } from '@testing-library/react';
import { AppState, initialState as appInitialState } from 'store/reducers/app';
import rootReducer from 'store/reducers/root-reducer';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import Alarm from './Alarm';
import { AlarmType } from './interfaces';

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

const alarms: AlarmType[] = [
  {
    id: 134,
    type: 'Alarm',
    subType: 'Air Pressure Down',
    value: '103',
  },
  {
    id: 148,
    type: 'Alarm',
    subType: 'Air Pressure Up',
    value: '100',
  },
];

describe('Alarm Widget', () => {
  test('Render one alarm', async () => {
    const { getByText } = renderWithRedux(<Alarm />, {
      appState: { ...appInitialState, alarms: [alarms[0]] },
    });
    expect(getByText('Air Pressure Down')).toBeInTheDocument();
    expect(getByText('Alarm')).toBeInTheDocument();
    expect(getByText('103')).toBeInTheDocument();
  });

  test('Show alarms count when multiple alarms are available', async () => {
    const { getByText } = renderWithRedux(<Alarm />, {
      appState: { ...appInitialState, alarms },
    });
    expect(getByText('2')).toBeInTheDocument();
  });

  test('Show multiple alarms', async () => {
    const { getByText } = renderWithRedux(<Alarm />, {
      appState: { ...appInitialState, alarms },
    });
    expect(getByText('Air Pressure Up')).toBeInTheDocument();
    expect(getByText('100')).toBeInTheDocument();
  });
});
