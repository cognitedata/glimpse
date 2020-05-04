// Copyright 2020 Cognite AS
import { testSaga } from 'redux-saga-test-plan';
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
  test('Dumb test', async () => {
    expect(true).toBeTruthy();
  });
  // test('should fetch assets and set to state', async () => {
  //   const testGen = testSaga(updateAssets, { payload: true });
  //   return testGen
  //     .next()
  //     .put(setLoading())
  //     .next(client)
  //     .next(assetList)
  //     .next()
  //     .put(setLoaded())
  //     .next()
  //     .isDone();
  // });
  // test('should set alert on error', async () => {
  //   const testGen = testSaga(updateAssets, { payload: true });
  //   return testGen
  //     .next()
  //     .put(setLoading())
  //     .next()
  //     .next(assetList)
  //     .next(assetList[0])
  //     .put(setAlerts(alert))
  //     .next()
  //     .put(setLoaded())
  //     .next()
  //     .isDone();
  // });
});
