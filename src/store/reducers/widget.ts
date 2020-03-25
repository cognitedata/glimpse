import { ActionType } from 'typesafe-actions';
import { Asset } from '@cognite/sdk';

import * as actionTypes from '../actions/actionTypes';

import * as actions from '../actions/widget';

export type WidgetAction = ActionType<typeof actions>;

export type WidgetState = {
  // cdfClient? : undefined | CogniteClient;
  // loader: boolean;
  // alerts?: undefined | AlertsPropsType;
  asset?: undefined | Asset;
  // assets: Asset[]
};

export const initialState: WidgetState = {
  // loader: false,
  // assets: []
};

const widgetReducer = (
  state = initialState,
  action: WidgetAction
): WidgetState => {
  switch (action.type) {
    case actionTypes.SET_ASSET:
      return {
        ...state,
        asset: action.payload,
      };
  }
  return state;
};

export default widgetReducer;
