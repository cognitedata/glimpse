// Copyright 2020 Cognite AS
import { ActionType } from 'typesafe-actions';

import { UserInfo } from 'custom-types';
import * as actionTypes from '../actions/actionTypes';

import * as actions from '../actions/auth';

export const initialState: AuthState = {
  loggedIn: false,
  userCapabilties: [],
};

export type AuthAction = ActionType<typeof actions>;

export type AuthState = {
  loggedIn: boolean;
  userCapabilties: string[];
  userInfo?: undefined | UserInfo;
};

const authReducer = (state = initialState, action: AuthAction): AuthState => {
  switch (action.type) {
    case actionTypes.SET_LOGGED_IN:
      return {
        ...state,
        loggedIn: true,
      };
    case actionTypes.SET_LOGGED_OUT:
      return {
        ...state,
        loggedIn: false,
      };
    case actionTypes.SET_USER_CAPABILITIES:
      return {
        ...state,
        userCapabilties: action.payload,
      };
    case actionTypes.SET_USER_INFO:
      return {
        ...state,
        userInfo: action.payload,
      };
  }
  return state;
};

export default authReducer;
