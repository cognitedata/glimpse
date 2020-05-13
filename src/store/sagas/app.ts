// Copyright 2020 Cognite AS
import { put, select, fork, take } from 'redux-saga/effects';
import { getMachineIds } from 'services/appCRUD/appConfService';
import { RootAction } from 'StoreTypes';
import { getCdfClient } from '../selectors';
import {
  setLoading,
  setAssets,
  setLoaded,
  setAsset,
  setAlerts,
  restartUpdateAlarms,
} from '../actions/root-action';

import { MESSAGES } from '../../constants/messages';

import * as actionTypes from '../actions/actionTypes';

import pollUpdateEventInfo from './dataFetchers/eventsFetcher';
import pollUpdateDataLatestPoint from './dataFetchers/latestDataPointFetcher';
import pollUpdateTsDps from './dataFetchers/dataPointsFetcher';

/**
 * Assets list fetcher
 */
export function* updateAssets(action: RootAction) {
  /**
   * Show loader only if its requested in input parameters
   */
  if (action.payload) {
    yield put(setLoading());
  }

  try {
    const savedMachineConfigStr = yield getMachineIds();

    const MACHINE_EXTERNAL_IDS = savedMachineConfigStr
      ? savedMachineConfigStr.split(',')
      : [];

    if (MACHINE_EXTERNAL_IDS.length > 0) {
      const cdfClient = yield select(getCdfClient);
      const assets = yield cdfClient.assets.retrieve(
        MACHINE_EXTERNAL_IDS.map((id: string) => ({ id }))
      );
      yield put(setAssets(assets));
      yield put(setAsset(assets[0]));
      yield put(restartUpdateAlarms());
    }
  } catch (error) {
    yield put(
      setAlerts({
        type: 'error',
        text: MESSAGES.ASSETS_FETCH_ERROR,
        hideApp: false,
      })
    );
  } finally {
    if (action.payload) {
      yield put(setLoaded());
    }
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
