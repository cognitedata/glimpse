// Copyright 2020 Cognite AS
import { take, race, put, select, delay, fork, call } from 'redux-saga/effects';
import { CogniteEvent } from '@cognite/sdk';

import { RootState } from 'StoreTypes';
import get from 'lodash/get';
import { AlarmType } from 'components/Alarm/interfaces';
import { APP_NAME } from 'constants/appData';
import { AppAction } from 'store/reducers/app';
import includes from 'lodash/includes';
import * as actionTypes from '../actions/actionTypes';
import { setAlarms } from '../actions/root-action';

const getCdfClient = (state: RootState) => state.appState.cdfClient;
const getAssetId = (state: RootState) => state.widgetState.asset?.id;
const getAlarms = (state: RootState) => state.appState.alarms;

const ALARM_DOC_NAME = `${APP_NAME}_ALARM_CONFIG`;
const REMOVED_ALARMS_DOC_NAME = `${APP_NAME}_REMOVED_ALARMS`;

/**
 *
 * Alarms fetcher
 */
export default function* pollUpdateAlarms(alarmConfig: {
  [key: string]: string;
}) {
  while (true) {
    const cdfClient = yield select(getCdfClient);
    const assetId = yield select(getAssetId);
    if (assetId != null) {
      const eventsResults = yield cdfClient.events.list({
        sort: { lastUpdatedTime: 'desc' },
        filter: {
          assetIds: [assetId],
          type: alarmConfig.eventType,
          subtype: alarmConfig.eventSubtype,
        },
      });
      const events: CogniteEvent[] = eventsResults.items;

      const alarms: AlarmType[] = events.map(event => ({
        id: event.id,
        type: event.type ? event.type : '',
        subType: event.subtype ? event.subtype : '',
        value: get(event, alarmConfig.metafieldKey, '').toString(),
      }));
      yield call(setFilteredAlarms, alarms);
      yield call(clearRemovedAlarmIds, alarms);
    }

    const { cancel } = yield race({
      delay: delay(Number(alarmConfig.pollingInterval)),
      cancel: take(
        (stopAction: AppAction) =>
          stopAction.type === actionTypes.STOP_UPDATE_ALARMS
      ),
    });

    if (cancel) {
      return;
    }
  }
}

/* Watcher function for alarms update polling */
export function* pollUpdateAlarmsWatcher() {
  while (true) {
    yield take(actionTypes.START_UPDATE_ALARMS);
    const savedAlarmConfigStr = yield localStorage.getItem(ALARM_DOC_NAME);
    if (savedAlarmConfigStr) {
      yield fork(pollUpdateAlarms, JSON.parse(savedAlarmConfigStr));
    }
  }
}

// Set filtered alarms in the state
function* setFilteredAlarms(alarms?: AlarmType[]) {
  const rawAlarms = alarms || (yield select(getAlarms));
  let removedAlarms = yield localStorage.getItem(REMOVED_ALARMS_DOC_NAME);
  removedAlarms = removedAlarms ? removedAlarms.split(',') : [];
  const filteredAlarms = rawAlarms.filter((alarm: AlarmType) => {
    return !includes(removedAlarms, alarm.id.toString());
  });
  yield put(setAlarms(filteredAlarms));
}

// remove alarm ids from removed alarmids list if its not available in newly fetched event list
function* clearRemovedAlarmIds(alarms: AlarmType[]) {
  const fetchedAlarmIds = alarms.map(alarm => alarm.id);
  let removedAlarmIds = yield localStorage.getItem(REMOVED_ALARMS_DOC_NAME);
  removedAlarmIds = removedAlarmIds ? removedAlarmIds.split(',') : [];
  const filteredAlarmIds = removedAlarmIds.filter((removedAlarmId: string) => {
    return includes(fetchedAlarmIds, Number(removedAlarmId));
  });
  yield localStorage.setItem(
    REMOVED_ALARMS_DOC_NAME,
    filteredAlarmIds.join(',')
  );
}

/**
 * Remove alarm
 */
export function* removeAlarm(action: any) {
  let removedAlarms = yield localStorage.getItem(REMOVED_ALARMS_DOC_NAME);
  removedAlarms = removedAlarms ? removedAlarms.split(',') : [];
  removedAlarms.push(action.payload);
  yield localStorage.setItem(REMOVED_ALARMS_DOC_NAME, removedAlarms.join(','));
  yield call(setFilteredAlarms);
}
