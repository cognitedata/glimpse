import { CogniteClient, Asset } from '@cognite/sdk';

import { AlertsPropsType } from 'custom-types';
import { action } from 'typesafe-actions';
import * as actionTypes from './actionTypes';

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
