// Copyright 2020 Cognite AS
import { getByUser, update } from 'components/widgetCRUD/repo/widgetConfLSRepo';
import { select, put, race, delay, take } from 'redux-saga/effects';
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

export function* getWidgetConfigs(action: any) {
  console.log(action.payload);
  const userId = yield select(getUserId);
  const assetId = yield select(getAssetId);
  console.log(assetId);
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
function* showAlert(msg: string) {
  yield put(
    setAlerts({
      type: 'error',
      text: msg,
      hideApp: false,
    })
  );
}
export function* addWidget(args: any) {
  const widgetConfig = args.payload;
  const { widgetTypeId } = widgetConfig;
  const [w, h] = WIDGET_SETTINGS[widgetTypeId].size;
  const localwidgetConfigs = yield select(getLocalWidgetConfs);
  const layouts = localwidgetConfigs.widgetConfigs.map((wconf: WidgetConfig) =>
    getGridLayout(wconf)
  );
  const widgetCordinates = getEmptyPositions(layouts, w, h, MAXCOLS, MAXROWS);
  console.log(layouts, widgetCordinates);
  if (!widgetCordinates) {
    yield showAlert(MESSAGES.NO_POSITION_ON_GRID);
    return;
  }
  const newWidgetConf = { ...widgetConfig };
  newWidgetConf.i = generateRandomKey();
  newWidgetConf.cordinates = widgetCordinates;
  const newWidgetConfs = [...localwidgetConfigs.widgetConfigs].concat(
    newWidgetConf
  );
  const newLocalConfigs = {
    ...localwidgetConfigs,
    lastUpdated: new Date(),
    widgetConfigs: newWidgetConfs,
  };
  yield put(setWidgetConfigs(newLocalConfigs));
}

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

export function* machineChanged(action: any) {
  yield saveWidgetConfigs(null, true);
  yield getWidgetConfigs(action);
}

export function* saveWidgetConfigs(
  lastSynced: Date | null = null,
  isForceSync: boolean = false
) {
  const userId = yield select(getUserId);
  const { lastUpdated, widgetConfigs, id } = yield select(getLocalWidgetConfs);
  if (lastUpdated && (lastSynced !== lastUpdated || isForceSync)) {
    try {
      console.log(userId, id, widgetConfigs);
      yield update(userId, id, widgetConfigs);
      return lastUpdated;
    } catch (error) {
      yield showAlert(MESSAGES.SYNC_ERROR);
      return lastSynced;
    }
  }
  return lastSynced;
}
