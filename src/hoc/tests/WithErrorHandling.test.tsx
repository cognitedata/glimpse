import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { render } from '@testing-library/react';
import { AlertsPropsType } from 'custom-types';
import rootReducer from '../../store/reducers/root-reducer';
import {
  AppState,
  initialState as appInitialState,
} from '../../store/reducers/app';
import withErrorHandling from '../WithErrorHandling';

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

describe('With Error Handling', () => {
  test('Render alert successfully ', async () => {
    const Home = () => <div>Home Component</div>;
    const WrappedComponent = withErrorHandling(Home);
    const alerts: AlertsPropsType = {
      type: 'error',
      text: 'Alert Test',
      duration: 10000,
      hideApp: false,
    };
    const { getByText } = renderWithRedux(<WrappedComponent />, {
      appState: { ...appInitialState, alerts },
    });
    expect(getByText('Alert Test')).toBeInTheDocument();
  });
});
