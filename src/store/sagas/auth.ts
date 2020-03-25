import { put, select, call } from 'redux-saga/effects';
import { RootState } from 'StoreTypes';
import {
  showLoader,
  hideLoader,
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

export function* login() {
  const cdfClient = yield select(getCdfClient);

  yield put(showLoader());
  yield put(setLoggedOut());
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
  yield put(hideLoader());
  console.log('userCapabilities ', userCapabilities);
}

export function* logout() {
  yield put(showLoader());
  const cdfClient = yield select(getCdfClient);
  const redirectUrl = `https://${window.location.host}/`;
  yield localStorage.removeItem(AUTH_RESULTS_KEY);
  yield put(setLoggedOut());
  yield cdfClient.logout.getUrl({ redirectUrl });
  yield call(login);
}
