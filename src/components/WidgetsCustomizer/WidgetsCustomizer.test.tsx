// Copyright 2020 Cognite AS
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import WIDGET_SETTINGS from 'constants/widgetSettings';
import { AppState, initialState as appInitialState } from 'store/reducers/app';
import { createStore } from 'redux';
import rootReducer from 'store/reducers/root-reducer';
import { Provider } from 'react-redux';
import { assetList } from 'mocks/assetList';
import WidgetCustomizer from './WidgetsCustomizer';

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

describe('Widget Customizer', () => {
  test('Render add button intially ', async () => {
    const { getByText } = renderWithRedux(<WidgetCustomizer />, {
      appState: { ...appInitialState },
    });
    expect(getByText('+')).toBeInTheDocument();
  });

  test('Display popup on button click ', async () => {
    const { getByText, getByTestId } = renderWithRedux(<WidgetCustomizer />, {
      appState: { ...appInitialState, asset: assetList[0] },
    });
    fireEvent.click(getByTestId('add-button'));
    expect(getByText('Add Widget')).toBeInTheDocument();
  });

  test('Display widget list ', async () => {
    const { getByTestId, findAllByText } = renderWithRedux(
      <WidgetCustomizer />,
      {
        appState: { ...appInitialState, asset: assetList[0] },
      }
    );
    fireEvent.click(getByTestId('add-button'));
    let items = await findAllByText(WIDGET_SETTINGS['1'].name);
    expect(items).toHaveLength(1);
    items = await findAllByText(WIDGET_SETTINGS['2'].name);
    expect(items).toHaveLength(1);
    items = await findAllByText(WIDGET_SETTINGS['3'].name);
    expect(items).toHaveLength(1);
    items = await findAllByText(WIDGET_SETTINGS['4'].name);
    expect(items).toHaveLength(1);
  });

  test('Auto select first widget ', async () => {
    const { getByTestId, findAllByText } = renderWithRedux(
      <WidgetCustomizer />,
      {
        appState: { ...appInitialState, asset: assetList[0] },
      }
    );
    fireEvent.click(getByTestId('add-button'));
    const items = await findAllByText(WIDGET_SETTINGS['0'].name);
    expect(items).toHaveLength(2);
  });

  test('Show preview on widget click ', async () => {
    const { getByTestId, findAllByText, findAllByAltText } = renderWithRedux(
      <WidgetCustomizer />,
      {
        appState: { ...appInitialState, asset: assetList[0] },
      }
    );
    fireEvent.click(getByTestId('add-button'));
    let items = await findAllByText(WIDGET_SETTINGS['2'].name);
    const listItem = items[0].parentElement?.parentElement;
    if (listItem) {
      fireEvent.click(listItem);
      items = await findAllByAltText(WIDGET_SETTINGS['2'].name);
      expect(items).toHaveLength(2);
    }
  });
});
