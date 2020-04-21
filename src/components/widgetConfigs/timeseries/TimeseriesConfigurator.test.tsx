// Copyright 2020 Cognite AS
import { eventList } from 'mocks/eventList';
import { render, fireEvent, waitForElement, act } from '@testing-library/react';
import React from 'react';
import rootReducer from 'store/reducers/root-reducer';
import { AppState, initialState as appInitialState } from 'store/reducers/app';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import TimeseriesBasicNumericConfigurator from './TimeseriesBasicNumericConfigurator';
import TimeseriesWideNumericConfigurator from './TimeseriesWideNumericConfigurator';

import * as timeseriesFetcher from './timeseriesFetcher';

jest.mock('./timeseriesFetcher.ts');

const mockTimeseries = {
  id: 35246780681261,
  externalId: 'VAL_23-LY-92529_SILch0_SC0_TYPSP:VALUE',
  name: 'VAL_23-LY-92529_SILch0_SC0_TYPSP:VALUE',
};
const fetchTimeseries = jest.fn().mockImplementation(async () => {
  return mockTimeseries;
});

// @ts-ignore
timeseriesFetcher.fetchTimeseries = fetchTimeseries;

const onCreate = jest.fn();

afterEach(() => {
  jest.clearAllMocks();
  // @ts-ignore
  timeseriesFetcher.fetchTimeseries = fetchTimeseries;
});

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

describe('Timeseries widgets Configurator', () => {
  it('should render default fields', async () => {
    const { getByText } = renderWithRedux(
      <TimeseriesBasicNumericConfigurator
        configFields={[]}
        onCreate={onCreate}
      />,
      {
        appState: { ...appInitialState },
      }
    );
    expect(getByText('Timeseries External Id')).toBeInTheDocument();
    expect(getByText('Timeseries Name')).toBeInTheDocument();
  });

  it('should render dynamic fields', async () => {
    const configFields = ['start', 'granularity'];
    const { getByText } = renderWithRedux(
      <TimeseriesWideNumericConfigurator
        configFields={configFields}
        onCreate={onCreate}
      />,
      {
        appState: { ...appInitialState },
      }
    );
    expect(getByText('Start Time')).toBeInTheDocument();
    expect(getByText('Granularity')).toBeInTheDocument();
  });

  it('should reset fields on reset button click', async () => {
    const { getByTestId, getByRole } = renderWithRedux(
      <TimeseriesBasicNumericConfigurator
        configFields={[]}
        onCreate={onCreate}
      />,
      {
        appState: { ...appInitialState },
      }
    );
    const timeseriesExternalId = getByRole('textbox', {
      name: 'Timeseries External Id *',
    });
    fireEvent.change(timeseriesExternalId, { target: { value: '1234567890' } });
    fireEvent.click(getByTestId('reset-button'));
    expect(timeseriesExternalId.getAttribute('value')).toEqual('');
  });

  it('should update timeseries name after user enter the timeseries external id', async () => {
    const { getByRole } = renderWithRedux(
      <TimeseriesBasicNumericConfigurator
        configFields={[]}
        onCreate={onCreate}
      />,
      {
        appState: { ...appInitialState },
      }
    );
    const timeseriesExternalId = getByRole('textbox', {
      name: 'Timeseries External Id *',
    });
    fireEvent.change(timeseriesExternalId, { target: { value: '1234567890' } });
    await act(async () => {
      fireEvent.blur(timeseriesExternalId);
      await new Promise(r => setTimeout(r, 1000));
      const timeseriesName = getByRole('textbox', {
        name: 'Timeseries Name *',
      });
      expect(timeseriesName.getAttribute('value')).toEqual(mockTimeseries.name);
    });
  });
});
