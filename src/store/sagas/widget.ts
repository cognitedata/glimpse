// Copyright 2020 Cognite AS
import { fork, take } from 'redux-saga/effects';

import * as actionTypes from '../actions/actionTypes';

import pollUpdateEventInfo from './widgetSagas/eventsFetcher';
import pollUpdateDataLatestPoint from './widgetSagas/latestDataPointFetcher';
import { pollUpdateTsDps } from './widgetSagas/dataPointsFetcher';

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
