// Copyright 2020 Cognite AS
import { take, race, put, select, delay } from 'redux-saga/effects';
import { CogniteEvent } from '@cognite/sdk';

import { RootState, RootAction } from 'StoreTypes';
import { setEvent } from '../../actions/root-action';
import * as actionTypes from '../../actions/actionTypes';

const getCdfClient = (state: RootState) => state.appState.cdfClient;
const getAssetId = (state: RootState) => state.appState.asset?.id;

/**
 *
 * Event fetcher
 */
export default function* pollUpdateEventInfo(action: RootAction) {
  while (true) {
    const cdfClient = yield select(getCdfClient);
    const assetId = yield select(getAssetId);
    const { ongoing, type, subtype } = action.payload.queryParams;
    const eventsResults = yield cdfClient.events
      .list({
        sort: { [ongoing ? 'startTime' : 'endTime']: 'desc' },
        limit: ongoing ? 100 : 1,
        filter: {
          assetIds: [assetId],
          type,
          subtype,
        },
      })
      .catch(() => {
        return { items: [] };
      });

    let events: CogniteEvent[] = eventsResults.items;

    if (ongoing) {
      events = events.filter(event => !event.endTime);
    }

    const { actionKey } = action.payload;

    if (events.length > 0) {
      yield put(setEvent({ [actionKey]: events[0] }));
    }
    const { cancel } = yield race({
      delay: delay(action.payload.pollingInterval),
      cancel: take(
        (stopAction: RootAction) =>
          stopAction.type === actionTypes.STOP_UPDATE_EVENT_INFO &&
          stopAction.payload === actionKey
      ),
    });

    if (cancel) {
      return;
    }
  }
}
