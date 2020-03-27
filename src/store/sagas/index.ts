import { takeEvery, all } from 'redux-saga/effects';
import * as actionTypes from '../actions/actionTypes';
import { updateAssets } from './app';
import { login, logout } from './auth';
import { pollUpdateEvenInfoWatcher } from './widget';

/**
 * watch app related sagas and fire on action dispatch
 */
export function* watchAppSagas() {
  yield takeEvery(actionTypes.UPDATE_ASSETS, updateAssets);
}

/**
 * watch auth related sagas and fire on action dispatch
 */
export function* watchAuthSagas() {
  yield takeEvery(actionTypes.LOGIN, login);
  yield takeEvery(actionTypes.LOGOUT, logout);
}

/**
 * watch widgets related sagas and fire on action dispatch
 */
export function* watchWidgetSagas() {
  yield all([pollUpdateEvenInfoWatcher()]);
}
