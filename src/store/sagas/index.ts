// Copyright 2020 Cognite AS
import { takeEvery, all } from 'redux-saga/effects';
import * as actionTypes from '../actions/actionTypes';
import {
  updateAssets,
  pollUpdateEventInfoWatcher,
  pollUpdateTsDpsWatcher,
  pollUpdateDataLatestPointWatcher,
} from './app';
import { login, logout } from './auth';

import {
  pollUpdateAlarmsWatcher,
  saveRemovedAlarm,
  restartAlarmsPolling,
} from './alarmSagas';

/**
 * watch app related sagas and fire on action dispatch
 */
export function* watchAppSagas() {
  yield takeEvery(actionTypes.UPDATE_ASSETS, updateAssets);
  yield takeEvery(actionTypes.SAVE_REMOVED_ALARM, saveRemovedAlarm);
  yield takeEvery(actionTypes.RESTART_UPDATE_ALARMS, restartAlarmsPolling);

  yield all([
    pollUpdateEventInfoWatcher(),
    pollUpdateTsDpsWatcher(),
    pollUpdateDataLatestPointWatcher(),
    pollUpdateAlarmsWatcher(),
  ]);
}

/**
 * watch auth related sagas and fire on action dispatch
 */
export function* watchAuthSagas() {
  yield takeEvery(actionTypes.LOGIN, login);
  yield takeEvery(actionTypes.LOGOUT, logout);
}
