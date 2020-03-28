import { fork, take, race, put, select, delay } from 'redux-saga/effects';
import { CogniteEvent } from '@cognite/sdk';

import { RootState } from 'StoreTypes';
import { setEvent, setTsDps } from '../actions/root-action';
import * as actionTypes from '../actions/actionTypes';

const getCdfClient = (state: RootState) => state.appState.cdfClient;
const getAssetId = (state: RootState) => state.widgetState.asset?.id;

/**
 *
 * Event fetcher
 */
function* pollUpdateEvenInfo(action: any) {
  while (true) {
    const cdfClient = yield select(getCdfClient);
    const assetId = yield select(getAssetId);
    const eventsResults = yield cdfClient.events.list({
      sort: { [action.payload.ongoing ? 'startTime' : 'endTime']: 'desc' },
      limit: action.payload.ongoing ? 100 : 1,
      filter: {
        assetIds: [assetId],
        type: action.payload.eventType,
        subtype: action.payload.eventSubType,
      },
    });

    let events: CogniteEvent[] = eventsResults.items;

    if (action.payload.ongoing) {
      events = events.filter(event => !event.endTime);
    }

    const { actionKey } = action.payload;

    if (events.length > 0) {
      yield put(setEvent({ [actionKey]: events[0] }));
    }

    const { cancel } = yield race({
      delay: delay(action.payload.pollingInterval),
      cancel: take(
        (stopAction: any) =>
          stopAction.type === actionTypes.STOP_UPDATE_EVENT_INFO &&
          stopAction.payload === actionKey
      ),
    });

    if (cancel) {
      return;
    }
  }
}

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
/* Watcher function for event update polling */
export function* pollUpdateEvenInfoWatcher() {
  while (true) {
    const action = yield take(actionTypes.START_UPDATE_EVENT_INFO);
    yield fork(pollUpdateEvenInfo, action);
  }
}

/* Watcher function for TSDps update polling */
export function* pollUpdateTsDpsWatcher() {
  while (true) {
    const action = yield take(actionTypes.START_UPDATE_TS_DPS);
    yield fork(pollUpdateTsDpsInfo, action);
  }
}
