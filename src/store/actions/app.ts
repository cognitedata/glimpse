import { CogniteClient, Asset } from '@cognite/sdk';

import { AlertsPropsType } from 'custom-types';

import { action } from 'typesafe-actions';
import * as actionTypes from './actionTypes';

export const setCdfClient = (cogniteClient: CogniteClient) =>
  action(actionTypes.SET_CDF_CLIENT, cogniteClient);

export const clearAlerts = () => action(actionTypes.CLEAR_ALERTS);

export const setAlerts = (alert: AlertsPropsType) =>
  action(actionTypes.SET_ALERTS, alert);

export const showLoader = () => action(actionTypes.SHOW_LOADER);

export const hideLoader = () => action(actionTypes.HIDE_LOADER);

export const updateAssets = () => action(actionTypes.UPDATE_ASSETS);

export const setAssets = (assets: Asset[]) =>
  action(actionTypes.SET_ASSETS, assets);
