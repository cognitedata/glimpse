import { fork, take, race, put, select, delay } from 'redux-saga/effects';

import { RootState } from 'StoreTypes';
import { setTsDps } from '../actions/root-action';
import * as actionTypes from '../actions/actionTypes';

import pollUpdateEventInfo from './widgetSagas/eventsFetcher';
import pollUpdateDataLatestPoint from './widgetSagas/latestDataPointFetcher';

/**
 * Polling time series data points for given configuratin for given time period.
 * @param action
 */

const getCdfClient = (state: RootState) => state.appState.cdfClient;

function* pollUpdateTsDpsInfo(action: any) {
  while (true) {
    const { actionKey } = action.payload;
    const cdfClient = yield select(getCdfClient);
    const tsDataPointsObj = yield cdfClient.datapoints.retrieve({
      items: [
        {
          start: action.payload.start,
          end: 'now',
          limit: action.payload.granularity.limit,
          aggregates: ['average'],
          granularity: action.payload.granularity,
          id: action.payload.id,
        },
      ],
    });
    yield put(setTsDps({ [actionKey]: tsDataPointsObj[0].datapoints }));
    const { cancel } = yield race({
      delay: delay(action.payload.pollingInterval),
      cancel: take(
        (stopAction: any) =>
          stopAction.type === actionTypes.STOP_UPDATE_TS_DPS &&
          stopAction.payload === action.payload.actionKey
      ),
    });

    if (cancel) {
      return;
    }
  }
}

/* Watcher function for TSDps update polling */
export function* pollUpdateTsDpsWatcher() {
  while (true) {
    const action = yield take(actionTypes.START_UPDATE_TS_DPS);
    yield fork(pollUpdateTsDpsInfo, action);
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
