// Copyright 2020 Cognite AS
import { put, select, call } from 'redux-saga/effects';
import { RootState } from 'StoreTypes';
import {
  setLoading,
  setLoaded,
  setAlerts,
  setLoggedOut,
  setUserCapabilities,
  setLoggedIn,
  setUserInfo,
} from '../actions/root-action';
import { AUTH_RESULTS_KEY } from '../../constants/appData';
import {
  getUserCapabilities,
  hasPermissions,
  isAdmin,
} from '../../utills/utills';

import { MESSAGES } from '../../constants/messages';

const getCdfClient = (state: RootState) => state.appState.cdfClient;

/**
 * Async operations related to login process
 */
export function* login() {
  yield put(setLoading());
  yield put(setLoggedOut());
  const cdfClient = yield select(getCdfClient);
  let status = yield cdfClient.login.status();
  const authKey = yield localStorage.getItem(AUTH_RESULTS_KEY);
  if (!status || !authKey) {
    yield cdfClient.authenticate();
    status = yield cdfClient.login.status();
  }
  const groups = yield cdfClient.groups.list();
  const userCapabilities = getUserCapabilities(groups);
  const userHasPermissions = hasPermissions(userCapabilities);

  if (!userHasPermissions || !status) {
    yield put(
      setAlerts({
        type: 'error',
        text: MESSAGES.NO_ACCESS_MSG,
        hideApp: true,
      })
    );
  } else {
    const userInfo = { name: status?.user, admin: isAdmin(groups) };
    yield put(setLoggedIn());
    yield put(setUserInfo(userInfo));
    yield put(setUserCapabilities(userCapabilities));
  }
  yield put(setLoaded());
}

/**
 * Async operations related to logout process
 */
export function* logout() {
  yield put(setLoading());
  const cdfClient = yield select(getCdfClient);
  const redirectUrl = `https://${window.location.host}/`;
  yield localStorage.removeItem(AUTH_RESULTS_KEY);
  yield put(setLoggedOut());
  yield cdfClient.logout.getUrl({ redirectUrl });
  yield call(login);
}
