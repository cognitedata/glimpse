import { put, select } from 'redux-saga/effects';
import { RootState } from 'StoreTypes';
import {
  showLoader,
  setAssets,
  hideLoader,
  setAsset,
  setAlerts,
} from '../actions/root-action';
import { MACHINE_EXTERNAL_IDS } from '../../constants/appData';

import { MESSAGES } from '../../constants/messages';

const getCdfClient = (state: RootState) => state.appState.cdfClient;

export function* updateAssets() {
  yield put(showLoader());
  const cdfClient = yield select(getCdfClient);

  try {
    const assets = yield cdfClient.assets.retrieve(
      MACHINE_EXTERNAL_IDS.map(id => ({ id }))
    );
    yield put(setAssets(assets));
    yield put(setAsset(assets[0]));
  } catch (error) {
    yield put(
      setAlerts({
        type: 'error',
        text: MESSAGES.ASSETS_FETCH_ERROR,
        hideApp: false,
      })
    );
  } finally {
    yield put(hideLoader());
  }
}
