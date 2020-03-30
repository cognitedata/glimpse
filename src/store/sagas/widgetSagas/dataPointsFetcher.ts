import { RootState } from 'StoreTypes';
import { select, put, race, delay, take } from 'redux-saga/effects';
import { setTsDps } from 'store/actions/widget';
import * as actionTypes from '../../actions/actionTypes';

/**
 * Polling time series data points for given configuratin for given time period.
 * @param action
 */
const getCdfClient = (state: RootState) => state.appState.cdfClient;

export function* pollUpdateTsDpsInfo(action: any) {
  while (true) {
    const { actionKey } = action.payload;
    const cdfClient = yield select(getCdfClient);
    const { pollingInterval, queryParams } = action.payload;
    const tsDataPointsObj = yield cdfClient.datapoints.retrieve({
      items: [
        {
          end: 'now',
          aggregates: ['average'],
          ...queryParams,
        },
      ],
    });
    yield put(setTsDps({ [actionKey]: tsDataPointsObj[0].datapoints }));
    const { cancel } = yield race({
      delay: delay(pollingInterval),
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
