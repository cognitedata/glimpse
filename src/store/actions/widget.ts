import { Asset } from '@cognite/sdk';
import { action } from 'typesafe-actions';
import * as actionTypes from './actionTypes';

/**
 *
 * This contains widgets related action creators
 */

export const setAsset = (machine: Asset) =>
  action(actionTypes.SET_ASSET, machine);

export const setEvent = (eventMapping: any) =>
  action(actionTypes.SET_EVENT, eventMapping);

export const setTsDps = (tsDpsMapping: any) =>
  action(actionTypes.SET_TS_DPS, tsDpsMapping);

export const setLatestDataPoint = (dataPointMapping: any) =>
  action(actionTypes.SET_LATEST_DATAPOINT, dataPointMapping);
