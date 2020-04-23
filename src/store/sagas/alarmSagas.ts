// Copyright 2020 Cognite AS
import { take, race, put, select, delay, fork, call } from 'redux-saga/effects';
import { CogniteEvent } from '@cognite/sdk';

import { RootState } from 'StoreTypes';
import get from 'lodash/get';
import { AlarmType } from 'components/Alarm/interfaces';
import { APP_NAME } from 'constants/appData';
import { AppAction } from 'store/reducers/app';
import includes from 'lodash/includes';
import moment from 'moment';
import * as actionTypes from '../actions/actionTypes';
import { setAlarms } from '../actions/root-action';

const getCdfClient = (state: RootState) => state.appState.cdfClient;
const getAssetId = (state: RootState) => state.widgetState.asset?.id;
const getAlarms = (state: RootState) => state.appState.alarms;

const ALARM_DOC_NAME = `${APP_NAME}_ALARM_CONFIG`;
const REMOVED_ALARMS_DOC_NAME = `${APP_NAME}_REMOVED_ALARMS`;

/**
 * This saga is used to poll alarms and set in the state
 */
export default function* pollUpdateAlarms(alarmConfig: {
  [key: string]: string;
}) {
  while (true) {
    const cdfClient = yield select(getCdfClient);
    const assetId = yield select(getAssetId);
    if (assetId != null) {
      const minStartTime = moment()
        .subtract(alarmConfig.startTime, 'hours')
        .utc()
        .toDate();
      const eventsResults = yield cdfClient.events.list({
        sort: { createdTime: 'desc' },
        filter: {
          createdTime: { min: minStartTime },
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

/**
 * This is a watcher function running to activate the alarms polling saga
 */
export function* pollUpdateAlarmsWatcher() {
  while (true) {
    yield take(actionTypes.START_UPDATE_ALARMS);
    const savedAlarmConfigStr = yield localStorage.getItem(ALARM_DOC_NAME);
    if (savedAlarmConfigStr) {
      yield fork(pollUpdateAlarms, JSON.parse(savedAlarmConfigStr));
    }
  }
}

/**
 *
 * This will filter out the removed alarms and other alarms will be set in the state.
 */
function* setFilteredAlarms(alarms?: AlarmType[]) {
  const rawAlarms = alarms || (yield select(getAlarms));
  let removedAlarms = yield localStorage.getItem(REMOVED_ALARMS_DOC_NAME);
  removedAlarms = removedAlarms ? removedAlarms.split(',') : [];
  const filteredAlarms = rawAlarms.filter((alarm: AlarmType) => {
    return !includes(removedAlarms, alarm.id.toString());
  });
  yield put(setAlarms(filteredAlarms));
}

/**
 *
 * "Removed Alarm Ids" list will be updated when the new events are fetched.
 * If any of the removed alarm id is not available in the new events list,
 * that id will be removed from the list to save the space.
 */
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
 * This saga is used to save the removed alarms ids
 */
export function* saveRemovedAlarm(action: any) {
  let removedAlarms = yield localStorage.getItem(REMOVED_ALARMS_DOC_NAME);
  removedAlarms = removedAlarms ? removedAlarms.split(',') : [];
  removedAlarms.push(action.payload);
  yield localStorage.setItem(REMOVED_ALARMS_DOC_NAME, removedAlarms.join(','));
  yield call(setFilteredAlarms);
}
