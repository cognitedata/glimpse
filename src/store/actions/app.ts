// Copyright 2020 Cognite AS
import { CogniteClient, Asset } from '@cognite/sdk';

import { action } from 'typesafe-actions';
import { AlertsPropsType } from 'components/UI/Alerts/interfaces';
import { AlarmType } from 'components/Alarm/interfaces';
import { WidgetConfig } from 'components/grid/interfaces';
import * as actionTypes from './actionTypes';
import {
  EventMapping,
  LatestDatapointMapping,
  DatapointMapping,
} from './interfaces';

/**
 *
 * This contains app related action creators
 */

export const setCdfClient = (cogniteClient: CogniteClient) =>
  action(actionTypes.SET_CDF_CLIENT, cogniteClient);

export const clearAlerts = () => action(actionTypes.CLEAR_ALERTS);

export const setAlerts = (alert: AlertsPropsType) =>
  action(actionTypes.SET_ALERTS, alert);

export const setLoading = () => action(actionTypes.SET_LOADING);

export const setLoaded = () => action(actionTypes.SET_LOADED);

export const updateAssets = (showLoader?: boolean) =>
  action(actionTypes.UPDATE_ASSETS, showLoader);

export const setAssets = (assets: Asset[]) =>
  action(actionTypes.SET_ASSETS, assets);

export const setAsset = (machine: Asset) =>
  action(actionTypes.SET_ASSET, machine);

export const setEvent = (eventMapping: EventMapping) =>
  action(actionTypes.SET_EVENT, eventMapping);

export const setTsDps = (tsDpsMapping: DatapointMapping) =>
  action(actionTypes.SET_TS_DPS, tsDpsMapping);

export const setLatestDataPoint = (dataPointMapping: LatestDatapointMapping) =>
  action(actionTypes.SET_LATEST_DATAPOINT, dataPointMapping);

export const setNewWidget = (widget: WidgetConfig) =>
  action(actionTypes.SET_NEW_WIDGET, widget);

/** ------------------ Alarm actions ------------------ */

export const startUpdateAlarms = () => action(actionTypes.START_UPDATE_ALARMS);

export const stopUpdateAlarms = () => action(actionTypes.STOP_UPDATE_ALARMS);

export const restartUpdateAlarms = () =>
  action(actionTypes.RESTART_UPDATE_ALARMS);

export const setAlarms = (alarms: AlarmType[]) =>
  action(actionTypes.SET_ALARMS, alarms);

export const saveRemovedAlarm = (alarmId: number, persist?: boolean) =>
  action(actionTypes.SAVE_REMOVED_ALARM, { alarmId, persist });

export const setRemovedAlarmId = (alarmId: number) =>
  action(actionTypes.SET_REMOVED_ALARM_ID, alarmId);

export const setRemovedAlarmIds = (alarmIds: number[]) =>
  action(actionTypes.SET_REMOVED_ALARM_IDS, alarmIds);

export const saveRemovedAlarmIds = () =>
  action(actionTypes.SAVE_REMOVED_ALARM_IDS);

/** --------------------------------------------------- */
