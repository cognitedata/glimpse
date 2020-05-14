// Copyright 2020 Cognite AS
import { getByUser, update } from 'components/widgetCRUD/repo/widgetConfLSRepo';
import { select, put, Effect } from 'redux-saga/effects';
import { RootState } from 'StoreTypes';
import { setWidgetConfigs, setAlerts } from 'store/actions/app';
import get from 'lodash/get';
import { MESSAGES } from 'constants/messages';

const getUserId = (state: RootState) => state.authState.userInfo?.name;

export function* showAlert(msg: string) {
  yield put(
    setAlerts({
      type: 'error',
      text: msg,
      hideApp: false,
    })
  );
}

/**
 * Retrieve all widgetConfigs when an action received.
 */
export function* loadWidgetConfigs({ payload }: Effect) {
  const assetId = payload.id;
  const userId = yield select(getUserId);
  const widgetConf = yield getByUser(userId);
  const widgetConfForAsset = get(widgetConf, assetId) || [];
  yield put(
    setWidgetConfigs({
      id: assetId,
      widgetConfigs: widgetConfForAsset,
    })
  );
}

/**
 * Save all widgetConfigs when an action received.
 * @param param0 Action
 */
export function* saveWidgetConfigs({ payload }: Effect) {
  const userId = yield select(getUserId);
  const { widgetConfigs, id } = payload;
  try {
    yield update(userId, id, widgetConfigs);
  } catch (error) {
    yield showAlert(MESSAGES.SYNC_ERROR);
  }
}
