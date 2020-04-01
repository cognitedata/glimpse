// Copyright 2020 Cognite AS
import { put } from 'redux-saga/effects';
import { AlertsPropsType } from 'components/UI/Alerts/interfaces';
import {
  setLoading,
  setAssets,
  setAsset,
  setLoaded,
  setAlerts,
} from '../actions/root-action';

import { MockCogniteClient } from '../../mocks';
import { assetList } from '../../mocks/assetList';

import { updateAssets } from './app';

class CogniteClient extends MockCogniteClient {
  loginWithOAuth: any = jest.fn();
  authenticate = jest.fn();
  assets: any = {
    retrieve: jest.fn(),
  };
}

const client = new CogniteClient({ appId: 'mock app' });

beforeEach(() => {
  client.assets.retrieve.mockReturnValue(assetList);
});

afterEach(() => {
  jest.clearAllMocks();
});

const alert: AlertsPropsType = {
  hideApp: false,
  text: 'Unable to get machines. Please contact the administrator',
  type: 'error',
};

describe('App Sagas', () => {
  test('should fetch assets and set to state', () => {
    const gen = updateAssets();
    expect(gen.next().value).toEqual(put(setLoading()));
    gen.next();
    expect(gen.next(client).value).toEqual(assetList);
    expect(gen.next(assetList).value).toEqual(put(setAssets(assetList)));
    expect(gen.next().value).toEqual(put(setAsset(assetList[0])));
    expect(gen.next().value).toEqual(put(setLoaded()));
    expect(gen.next().done).toBeTruthy();
  });

  test('should set alert on error', () => {
    const gen = updateAssets();
    expect(gen.next().value).toEqual(put(setLoading()));
    gen.next();
    expect(gen.next(null).value).toEqual(put(setAlerts(alert)));
    expect(gen.next().value).toEqual(put(setLoaded()));
    expect(gen.next().done).toBeTruthy();
  });
});
