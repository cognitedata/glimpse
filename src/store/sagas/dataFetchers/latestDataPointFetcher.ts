// Copyright 2020 Cognite AS
import { take, race, put, select, delay } from 'redux-saga/effects';

import { RootState, RootAction } from 'StoreTypes';
import { setLatestDataPoint } from '../../actions/root-action';
import * as actionTypes from '../../actions/actionTypes';

const getCdfClient = (state: RootState) => state.appState.cdfClient;

/**
 *
 * Data point fetcher
 */
export default function* pollUpdateDataLatestPoint(action: RootAction) {
  while (true) {
    const cdfClient = yield select(getCdfClient);

    const response = yield cdfClient.datapoints
      .retrieveLatest([
        {
          ...action.payload.queryParams,
          before: 'now',
        },
      ])
      .catch(() => {
        return [{ datapoints: [] }];
      });

    const { actionKey } = action.payload;
    let dataPointObject = {};
    if (response.length > 0 && response[0].datapoints.length > 0) {
      dataPointObject = {
        value: response[0].datapoints[0].value,
        timestamp: response[0].datapoints[0].timestamp,
      };
    }
    yield put(setLatestDataPoint({ [actionKey]: dataPointObject }));

    const { cancel } = yield race({
      delay: delay(action.payload.pollingInterval),
      cancel: take(
        (stopAction: RootAction) =>
          stopAction.type === actionTypes.STOP_UPDATE_LATEST_DATAPOINT &&
          stopAction.payload === actionKey
      ),
    });

    if (cancel) {
      return;
    }
  }
}
