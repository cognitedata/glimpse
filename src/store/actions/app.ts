// Copyright 2020 Cognite AS
import { CogniteClient, Asset } from '@cognite/sdk';

import { action } from 'typesafe-actions';
import { AlertsPropsType } from 'components/UI/Alerts/interfaces';
import * as actionTypes from './actionTypes';
import { AlarmType } from 'components/Alarm/interfaces';

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

export const updateAssets = () => action(actionTypes.UPDATE_ASSETS);

export const setAssets = (assets: Asset[]) =>
  action(actionTypes.SET_ASSETS, assets);

/** ------------------ Alarm actions ------------------ */

export const startUpdateAlarms = () => action(actionTypes.START_UPDATE_ALARMS);

export const stopUpdateAlarms = () => action(actionTypes.STOP_UPDATE_ALARMS);

export const setAlarms = (alarms: AlarmType[]) =>
  action(actionTypes.SET_ALARMS, alarms);

export const removeAlarm = (alarmId: number) =>
  action(actionTypes.REMOVE_ALARM, alarmId);

/** --------------------------------------------------- */
