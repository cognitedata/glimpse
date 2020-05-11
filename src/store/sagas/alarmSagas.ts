// Copyright 2020 Cognite AS
import { take, race, put, select, delay, fork, call } from 'redux-saga/effects';
import { CogniteEvent } from '@cognite/sdk';

import get from 'lodash/get';
import { AlarmType } from 'components/Alarm/interfaces';
import { AppAction } from 'store/reducers/app';
import includes from 'lodash/includes';
import moment from 'moment';
import {
  getAlarmConfigurations,
  persistRemovedAlarmIds,
} from 'services/alarmCRUD/alarmConfService';
import {
  getCdfClient,
  getAssetId,
  getAlarms,
  getRemovedAlarmIds,
} from 'store/selectors';
import { MESSAGES } from 'constants/messages';
import {
  setAlarms,
  startUpdateAlarms,
  stopUpdateAlarms,
  setAlerts,
  setRemovedAlarmId,
  setRemovedAlarmIds,
} from '../actions/root-action';
import * as actionTypes from '../actions/actionTypes';

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
      const eventsResults = yield cdfClient.events
        .list({
          sort: { createdTime: 'desc' },
          filter: {
            createdTime: { min: minStartTime },
            assetIds: [assetId],
            type: alarmConfig.eventType,
            subtype: alarmConfig.eventSubtype,
          },
        })
        .catch(() => {
          return { items: [] };
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
      delay: delay(Number(alarmConfig.pollingInterval) * 1000),
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
    try {
      const alarmConfig = yield getAlarmConfigurations();
      /**
       * Set removed alarm ids in the sate
       */
      const removedAlarmsIds = alarmConfig.removedAlarmsIds
        ? alarmConfig.removedAlarmsIds
        : [];
      yield put(setRemovedAlarmIds(removedAlarmsIds));

      /**
       * Pass alarm fetch configurations to events fetcher
       */
      const alarmFetchConfig = alarmConfig.alarmFetchConfig
        ? alarmConfig.alarmFetchConfig
        : {};
      if (Object.keys(alarmFetchConfig).length > 0) {
        yield fork(pollUpdateAlarms, alarmFetchConfig);
      } else {
        yield call(setFilteredAlarms, []);
      }
    } catch (error) {
      yield call(setFilteredAlarms, []);
      yield put(
        setAlerts({
          type: 'error',
          text: MESSAGES.ALARMS_FETCH_ERROR,
          hideApp: false,
        })
      );
    }
  }
}

/**
 *
 * This will filter out the removed alarms and other alarms will be set in the state.
 */
function* setFilteredAlarms(alarms?: AlarmType[]) {
  const rawAlarms = alarms || (yield select(getAlarms));
  const removedAlarmIds = yield select(getRemovedAlarmIds);
  const filteredAlarms = rawAlarms.filter((alarm: AlarmType) => {
    return !includes(removedAlarmIds, alarm.id);
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
  const removedAlarmIds = yield select(getRemovedAlarmIds);
  const filteredAlarmIds = removedAlarmIds.filter((removedAlarmId: number) => {
    return includes(fetchedAlarmIds, removedAlarmId);
  });
  yield put(setRemovedAlarmIds(filteredAlarmIds));
}

/**
 * This saga is used to persist the removed alarms ids
 */
export function* saveRemovedAlarmIds() {
  try {
    yield persistRemovedAlarmIds();
  } catch (error) {
    yield put(
      setAlerts({
        type: 'error',
        text: MESSAGES.ALARM_REMOVE_ERROR,
        hideApp: false,
        duration: 2000,
      })
    );
    /**
     * Reset removed alarms on alarm remove failure
     */
    yield call(restartAlarmsPolling);
  }
}

/**
 * This saga is used to save the removed alarms ids
 */
export function* saveRemovedAlarm(action: any) {
  yield put(setRemovedAlarmId(action.payload.alarmId));
  yield call(setFilteredAlarms);
  if (action.payload.persist) {
    yield call(saveRemovedAlarmIds);
  }
}

/**
 * This saga is used to restart alarms polling
 */
export function* restartAlarmsPolling() {
  yield put(stopUpdateAlarms());
  yield put(startUpdateAlarms());
}
