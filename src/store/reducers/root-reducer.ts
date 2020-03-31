// Copyright 2020 Cognite AS
import { combineReducers } from 'redux';

import appReducer from './app';
import authReducer from './auth';
import widgetReducer from './widget';

const rootReducer = combineReducers({
  appState: appReducer,
  authState: authReducer,
  widgetState: widgetReducer,
});

export default rootReducer;
