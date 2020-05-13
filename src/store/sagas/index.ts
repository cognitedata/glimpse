// Copyright 2020 Cognite AS
import { takeEvery, all } from 'redux-saga/effects';
import { restartUpdateAlarms } from 'store/actions/root-action';
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
  saveRemovedAlarmIds,
  restartAlarmsPolling,
} from './alarmSagas';
import { machineIdChanged, saveWidgetConfigs } from './widgetConfig';

/**
 * watch app related sagas and fire on action dispatch
 */
export function* watchAppSagas() {
  yield takeEvery(actionTypes.UPDATE_ASSETS, updateAssets);
  yield takeEvery(actionTypes.SAVE_REMOVED_ALARM, saveRemovedAlarm);
  yield takeEvery(actionTypes.SAVE_REMOVED_ALARM_IDS, saveRemovedAlarmIds);
  yield takeEvery(actionTypes.RESTART_UPDATE_ALARMS, restartAlarmsPolling);
  yield takeEvery(actionTypes.SET_ASSET, restartUpdateAlarms);
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

export function* watchWidgetConfigs() {
  yield takeEvery(actionTypes.SET_WIDGET_CONFIGS, saveWidgetConfigs);
  yield takeEvery(actionTypes.SET_ASSET, machineIdChanged);
}
