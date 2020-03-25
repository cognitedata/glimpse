import { ActionType } from 'typesafe-actions';
import { CogniteClient, Asset } from '@cognite/sdk';
import { AlertsPropsType } from 'custom-types';

import * as actionTypes from '../actions/actionTypes';

import * as actions from '../actions/app';

export type AppAction = ActionType<typeof actions>;

export type AppState = {
  cdfClient?: undefined | CogniteClient;
  loader: boolean;
  alerts?: undefined | AlertsPropsType;
  selectedMachine?: undefined | Asset;
  assets: Asset[];
};

export const initialState: AppState = {
  loader: false,
  assets: [],
};

const appReducer = (state = initialState, action: AppAction): AppState => {
  switch (action.type) {
    case actionTypes.CLEAR_ALERTS:
      return {
        ...state,
        alerts: undefined,
      };
    case actionTypes.SET_ALERTS:
      return {
        ...state,
        alerts: action.payload,
      };
    case actionTypes.SET_CDF_CLIENT:
      return {
        ...state,
        cdfClient: action.payload,
      };
    case actionTypes.SHOW_LOADER:
      return {
        ...state,
        loader: true,
      };
    case actionTypes.HIDE_LOADER:
      return {
        ...state,
        loader: false,
      };
    case actionTypes.SET_ASSETS:
      return {
        ...state,
        assets: action.payload,
      };
  }
  return state;
};

export default appReducer;
