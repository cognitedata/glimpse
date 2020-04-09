// Copyright 2020 Cognite AS
import { combineReducers } from 'redux';

import appReducer from './app';
import authReducer from './auth';

const rootReducer = combineReducers({
  appState: appReducer,
  authState: authReducer,
});

export default rootReducer;
