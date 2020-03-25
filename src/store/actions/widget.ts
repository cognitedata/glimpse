import { Asset } from '@cognite/sdk';
import { action } from 'typesafe-actions';
import * as actionTypes from './actionTypes';

export const setAsset = (machine: Asset) =>
  action(actionTypes.SET_ASSET, machine);
