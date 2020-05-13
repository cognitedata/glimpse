// Copyright 2020 Cognite AS
import { AlertsPropsType } from 'components/UI/Alerts/interfaces';
import { runSaga } from 'redux-saga';
import sinon from 'sinon';
import * as api from 'services/appCRUD/appConfService';
import { RootAction } from 'StoreTypes';
import {
  setLoading,
  setAssets,
  setAsset,
  setLoaded,
  setAlerts,
} from '../actions/root-action';

import { assetList } from '../../mocks/assetList';

import { updateAssets } from './app';

import * as selectors from '../selectors';

class CogniteClient {
  assets = {
    retrieve: () => assetList,
  };
}

const client = new CogniteClient();

const alert: AlertsPropsType = {
  hideApp: false,
  text: 'Unable to get machines. Please contact the administrator',
  type: 'error',
};

describe('App Sagas', () => {
  let getMachineIdsMock = null;
  let getCdfClientMock = null;

  it('should fetch assets and set to state', async () => {
    getMachineIdsMock = sinon
      .stub(api, 'getMachineIds')
      .callsFake(async () => '591296422005001,650646241084062');

    getCdfClientMock = sinon
      .stub(selectors, 'getCdfClient')
      .callsFake(() => client);

    const dispatched: RootAction[] = [];

    const result = await runSaga(
      {
        dispatch: action => dispatched.push(action),
        getState: () => ({}),
      },
      updateAssets,
      { payload: true }
    ).toPromise();

    expect(dispatched).toContainEqual(setLoading());
    expect(dispatched).toContainEqual(setAssets(assetList));
    expect(dispatched).toContainEqual(setAsset(assetList[0]));
    expect(dispatched).toContainEqual(setLoaded());

    getMachineIdsMock.restore();
    getCdfClientMock.restore();
  });

  it('should set alert on error', async () => {
    getMachineIdsMock = sinon
      .stub(api, 'getMachineIds')
      .callsFake(async () => '591296422005001,650646241084062');

    getCdfClientMock = sinon
      .stub(selectors, 'getCdfClient')
      .callsFake(() => null);

    const dispatched: RootAction[] = [];

    const result = await runSaga(
      {
        dispatch: action => dispatched.push(action),
        getState: () => ({}),
      },
      updateAssets,
      { payload: true }
    ).toPromise();

    expect(dispatched).toContainEqual(setLoading());
    expect(dispatched).toContainEqual(setAlerts(alert));
    expect(dispatched).toContainEqual(setLoaded());
  });
});
