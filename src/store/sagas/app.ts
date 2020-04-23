// Copyright 2020 Cognite AS
import { put, select, fork, take } from 'redux-saga/effects';
import { RootState } from 'StoreTypes';
import {
  setLoading,
  setAssets,
  setLoaded,
  setAsset,
  setAlerts,
} from '../actions/root-action';
import { MACHINE_EXTERNAL_IDS } from '../../constants/appData';

import { MESSAGES } from '../../constants/messages';

import * as actionTypes from '../actions/actionTypes';

import pollUpdateEventInfo from './dataFetchers/eventsFetcher';
import pollUpdateDataLatestPoint from './dataFetchers/latestDataPointFetcher';
import pollUpdateTsDps from './dataFetchers/dataPointsFetcher';

const getCdfClient = (state: RootState) => state.appState.cdfClient;

/**
 * Assets list fetcher
 */
export function* updateAssets() {
  yield put(setLoading());
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
    yield put(setLoaded());
  }
}

/* Watcher function for TSDps update polling */
export function* pollUpdateTsDpsWatcher() {
  while (true) {
    const action = yield take(actionTypes.START_UPDATE_TS_DPS);
    yield fork(pollUpdateTsDps, action);
  }
}

/* Watcher function for event update polling */
export function* pollUpdateEventInfoWatcher() {
  while (true) {
    const action = yield take(actionTypes.START_UPDATE_EVENT_INFO);
    yield fork(pollUpdateEventInfo, action);
  }
}

/* Watcher function for event update polling */
export function* pollUpdateDataLatestPointWatcher() {
  while (true) {
    const action = yield take(actionTypes.START_UPDATE_LATEST_DATAPOINT);
    yield fork(pollUpdateDataLatestPoint, action);
  }
}
