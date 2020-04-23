// Copyright 2020 Cognite AS
import { ActionType } from 'typesafe-actions';
import { CogniteClient, Asset } from '@cognite/sdk';

import { AlertsPropsType } from 'components/UI/Alerts/interfaces';
import { AlarmType } from 'components/Alarm/interfaces';
import * as actionTypes from '../actions/actionTypes';

import * as actions from '../actions/app';

export type AppAction = ActionType<typeof actions>;

export type AppState = {
  cdfClient?: CogniteClient;
  loading: boolean;
  alerts?: AlertsPropsType;
  selectedMachine?: Asset;
  assets: Asset[];
  alarms?: AlarmType[];
};

export const initialState: AppState = {
  loading: false,
  assets: [],
  alarms: [],
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
    case actionTypes.SET_ALARMS:
      return {
        ...state,
        alarms: action.payload,
      };
  }
  return state;
};

export default appReducer;
