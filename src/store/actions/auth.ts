import { UserInfo } from 'custom-types';

import { action } from 'typesafe-actions';
import * as actionTypes from './actionTypes';

/**
 *
 * This contains auth related action creators
 */

export const login = () => action(actionTypes.LOGIN);

export const setLoggedIn = () => action(actionTypes.SET_LOGGED_IN);

export const setLoggedOut = () => action(actionTypes.SET_LOGGED_OUT);

export const setUserCapabilities = (userCapabilties: string[]) =>
  action(actionTypes.SET_USER_CAPABILITIES, userCapabilties);

export const setUserInfo = (userInfo: UserInfo) =>
  action(actionTypes.SET_USER_INFO, userInfo);

export const logout = () => action(actionTypes.LOGOUT);
