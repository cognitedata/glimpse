// Copyright 2020 Cognite AS
import { eventList } from 'mocks/eventList';
import { render, fireEvent, waitForElement, act } from '@testing-library/react';
import React from 'react';
import rootReducer from 'store/reducers/root-reducer';
import { AppState, initialState as appInitialState } from 'store/reducers/app';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { assetList } from 'mocks/assetList';
import AssetInfoConfigurator from './AssetInfoConfigurator';

const onCreate = jest.fn();

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

describe('Asset Info widget Configurator', () => {
  it('should render default fields', async () => {
    const { getAllByText, container } = renderWithRedux(
      <AssetInfoConfigurator onCreate={onCreate} />,
      {
        appState: { ...appInitialState, asset: assetList[0] },
      }
    );
    expect(getAllByText('Custom Name').length).toBeGreaterThan(0);
    expect(getAllByText('Select Field').length).toBeGreaterThan(0);
  });

  test('should set default values ', async () => {
    const { container } = renderWithRedux(
      <AssetInfoConfigurator onCreate={onCreate} />,
      {
        appState: { ...appInitialState, asset: assetList[0] },
      }
    );
    expect(container.innerHTML).toContain('value="Current Machine"');
    expect(container.innerHTML).toContain('value="name"');
  });

  it('should reset fields on reset button click', async () => {
    const { getByTestId, getByRole } = renderWithRedux(
      <AssetInfoConfigurator onCreate={onCreate} />,
      {
        appState: { ...appInitialState, asset: assetList[0] },
      }
    );
    let customName = getByRole('textbox', {
      name: 'Custom Name',
    });
    fireEvent.change(customName, { target: { value: 'Test Name' } });
    fireEvent.click(getByTestId('reset-button'));
    await new Promise(r => setTimeout(r, 2000));
    customName = getByRole('textbox', {
      name: 'Custom Name',
    });
    expect(customName.getAttribute('value')).toEqual('Current Machine');
  });
});
