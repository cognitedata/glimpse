// Copyright 2020 Cognite AS
import { ActionType } from 'typesafe-actions';
import { CogniteClient, Asset } from '@cognite/sdk';

import { AlertsPropsType } from 'components/UI/Alerts/interfaces';
import * as actionTypes from '../actions/actionTypes';

import * as actions from '../actions/app';

export type AppAction = ActionType<typeof actions>;

export type AppState = {
  cdfClient?: CogniteClient;
  loading: boolean;
  alerts?: AlertsPropsType;
  assets: Asset[];
  asset?: Asset;
};

export const initialState: AppState = {
  loading: false,
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
    case actionTypes.SET_LOADING:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.SET_LOADED:
      return {
        ...state,
        loading: false,
      };
    case actionTypes.SET_ASSETS:
      return {
        ...state,
        assets: action.payload,
      };
    /** Set asset in app state */
    case actionTypes.SET_ASSET:
      return {
        ...state,
        asset: action.payload,
      };
    /** Set event in app state */
    case actionTypes.SET_EVENT:
      return {
        ...state,
        ...action.payload,
      };
    /** Set time Series aggreagation data points arrays in app state */
    case actionTypes.SET_TS_DPS:
      return {
        ...state,
        ...action.payload,
      };
    case actionTypes.SET_LATEST_DATAPOINT:
      return {
        ...state,
        ...action.payload,
      };
  }
  return state;
};

export default appReducer;
