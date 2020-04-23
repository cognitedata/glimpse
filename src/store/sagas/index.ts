// Copyright 2020 Cognite AS
import { takeEvery, all } from 'redux-saga/effects';
import * as actionTypes from '../actions/actionTypes';
import { updateAssets } from './app';
import { login, logout } from './auth';
import {
  pollUpdateEventInfoWatcher,
  pollUpdateTsDpsWatcher,
  pollUpdateDataLatestPointWatcher,
} from './widget';
import { pollUpdateAlarmsWatcher, saveRemovedAlarm } from './alarmSagas';

/**
 * watch app related sagas and fire on action dispatch
 */
export function* watchAppSagas() {
  yield takeEvery(actionTypes.UPDATE_ASSETS, updateAssets);
  yield takeEvery(actionTypes.SAVE_REMOVED_ALARM, saveRemovedAlarm);
  yield all([pollUpdateAlarmsWatcher()]);
}

/**
 * watch auth related sagas and fire on action dispatch
 */
export function* watchAuthSagas() {
  yield takeEvery(actionTypes.LOGIN, login);
  yield takeEvery(actionTypes.LOGOUT, logout);
}

/**
 * watch widgets related sagas and fire on action dispatch
 */
export function* watchWidgetSagas() {
  yield all([
    pollUpdateEventInfoWatcher(),
    pollUpdateTsDpsWatcher(),
    pollUpdateDataLatestPointWatcher(),
  ]);
}
