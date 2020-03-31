// Copyright 2020 Cognite AS
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { initialLayoutMocked, mockedWidgetConfigs } from 'mocks/gridMocks';
import sizeMe from 'react-sizeme';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from '../../../store/reducers/root-reducer';
import {
  AuthState,
  initialState as authInitialState,
} from '../../../store/reducers/auth';
import {
  AppState,
  initialState as appInitialState,
} from '../../../store/reducers/app';
import GridLayout from './GridLayout';

sizeMe.noPlaceholders = true;

const onRemoveItem = jest.fn();
const onLayoutChange = jest.fn();

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

describe('GridLayout', () => {
  it('should initialize components correctly', () => {
    const { getByTestId } = renderWithRedux(
      <GridLayout
        layouts={initialLayoutMocked}
        widgetConfigs={mockedWidgetConfigs}
        onRemoveItem={onRemoveItem}
        onLayoutChange={onLayoutChange}
      />,
      {
        appState: { ...appInitialState },
        authState: { ...authInitialState, loggedIn: true },
      }
    );
    mockedWidgetConfigs.forEach(comp =>
      expect(getByTestId(comp.i)).toBeInTheDocument()
    );
  });

  it('should call onRemoveItem callback function correctly', () => {
    const { getByTestId } = renderWithRedux(
      <GridLayout
        layouts={initialLayoutMocked}
        widgetConfigs={mockedWidgetConfigs}
        onRemoveItem={onRemoveItem}
        onLayoutChange={onLayoutChange}
      />,
      {
        appState: { ...appInitialState },
        authState: { ...authInitialState, loggedIn: true },
      }
    );
    fireEvent.click(
      getByTestId(initialLayoutMocked[0].i).querySelector(
        'button'
      ) as HTMLInputElement
    );
    expect(onRemoveItem).toBeCalledTimes(1);
  });
});
