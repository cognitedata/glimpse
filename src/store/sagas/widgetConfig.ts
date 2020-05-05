// Copyright 2020 Cognite AS
import { getByUser, update } from 'components/widgetCRUD/repo/widgetConfLSRepo';
import { select, put, race, delay, take, Effect } from 'redux-saga/effects';
import { RootState } from 'StoreTypes';
import { setWidgetConfigs, setAlerts } from 'store/actions/app';
import get from 'lodash/get';
import { WidgetConfig } from 'components/grid/interfaces';
import WIDGET_SETTINGS from 'constants/widgetSettings';
import {
  getGridLayout,
  getEmptyPositions,
} from 'components/grid/GridLayout/gridOperations/gridOperations';
import { MAXCOLS, MAXROWS } from 'constants/grid';
import { generateRandomKey } from 'utils/utils';
import { WIDGET_CONFIG_SYNC_INTERVAL } from 'constants/widgetConfigs';
import { MESSAGES } from 'constants/messages';
import * as actionTypes from '../actions/actionTypes';

const getUserId = (state: RootState) => state.authState.userInfo?.name;
const getAssetId = (state: RootState) => state.appState.asset?.id;
const getLocalWidgetConfs = (state: RootState) =>
  state.appState.localWidgetConfigs;

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
 * Retriew widget configs by userId and assetId
 */
export function* getWidgetConfigs() {
  const userId = yield select(getUserId);
  const assetId = yield select(getAssetId);
  const widgetConf = yield getByUser(userId);
  const widgetConfForAsset = get(widgetConf, assetId) || [];
  yield put(
    setWidgetConfigs({
      id: assetId,
      lastUpdated: null,
      widgetConfigs: widgetConfForAsset,
    })
  );
}

/**
 * Fires after adding a widget. add to local wiget configuration list. (it will be synced)
 * @param action
 */
export function* addWidget(
  { payload: widgetconfig }: Effect,
  id: string | null = null,
  lastUpdated: Date | null = null
) {
  const { widgetTypeId } = widgetconfig;
  const [w, h] = WIDGET_SETTINGS[widgetTypeId].size;
  const localwidgetConfigs = yield select(getLocalWidgetConfs);
  const { widgetConfigs } = localwidgetConfigs;
  const layouts = widgetConfigs.map((wconf: WidgetConfig) =>
    getGridLayout(wconf)
  );
  const widgetCordinates = getEmptyPositions(layouts, w, h, MAXCOLS, MAXROWS);
  if (!widgetCordinates) {
    yield showAlert(MESSAGES.NO_POSITION_ON_GRID);
    return;
  }
  const newWidgetConf = { ...widgetconfig };
  newWidgetConf.i = id || generateRandomKey();
  newWidgetConf.cordinates = widgetCordinates;
  const newWidgetConfs = [...widgetConfigs].concat(newWidgetConf);
  const newLocalConfigs = {
    ...localwidgetConfigs,
    lastUpdated: lastUpdated || new Date(),
    widgetConfigs: newWidgetConfs,
  };
  yield put(setWidgetConfigs(newLocalConfigs));
}

/**
 * save all widget configurations for user and for asset
 * @param lastSynced Date | null
 * @param isForceSync boolean
 */
export function* saveWidgetConfigs(
  lastSynced: Date | null = null,
  isForceSync: boolean = false
) {
  const userId = yield select(getUserId);
  const { lastUpdated, widgetConfigs, id } = yield select(getLocalWidgetConfs);
  if (lastUpdated && (lastSynced !== lastUpdated || isForceSync)) {
    try {
      yield update(userId, id, widgetConfigs);
      return lastUpdated;
    } catch (error) {
      yield showAlert(MESSAGES.SYNC_ERROR);
      return lastSynced;
    }
  }
  return lastSynced;
}

/**
 * poll with a given time period and check whether there are new changes in the local widget configurations.
 * If there are new changes persist them.
 */
export function* pollSyncWidgetConf() {
  let lastSynced = null;
  while (true) {
    lastSynced = yield saveWidgetConfigs(lastSynced);
    const { cancel } = yield race({
      delay: delay(WIDGET_CONFIG_SYNC_INTERVAL),
      cancel: take(
        (stopAction: any) =>
          stopAction.type === actionTypes.STOP_WIDGET_CONFIGS_SYNC
      ),
    });

    if (cancel) {
      return;
    }
  }
}

/**
 * Fires when changing the machine in the overview.
 */
export function* machineChanged() {
  yield saveWidgetConfigs(null, true);
  yield getWidgetConfigs();
}
