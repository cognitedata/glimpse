import { ActionType } from 'typesafe-actions';
import { Asset } from '@cognite/sdk';

import * as actionTypes from '../actions/actionTypes';

import * as actions from '../actions/widget';

export type WidgetAction = ActionType<typeof actions>;

export type WidgetState = {
  asset?: undefined | Asset;
};

export const initialState: WidgetState = {};

const widgetReducer = (
  state = initialState,
  action: WidgetAction
): WidgetState => {
  switch (action.type) {
    /** Set asset in widget state */
    case actionTypes.SET_ASSET:
      return {
        ...state,
        asset: action.payload,
      };
    /** Set event in widget state */
    case actionTypes.SET_EVENT:
      return {
        ...state,
        ...action.payload,
      };
    /** Set time Series aggreagation data points arrays in widget state */
    case actionTypes.SET_TS_DPS:
      return {
        ...state,
        ...action.payload,
      };
  }
  return state;
};

export default widgetReducer;
