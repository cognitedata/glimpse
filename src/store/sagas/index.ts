import { takeEvery } from 'redux-saga/effects';
import * as actionTypes from '../actions/actionTypes';
import { updateAssets } from './app';
import { login, logout } from './auth';

export function* watchAppSagas() {
  yield takeEvery(actionTypes.UPDATE_ASSETS, updateAssets);
}

export function* watchAuthSagas() {
  yield takeEvery(actionTypes.LOGIN, login);
  yield takeEvery(actionTypes.LOGOUT, logout);
}
