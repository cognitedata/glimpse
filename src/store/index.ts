// Copyright 2020 Cognite AS
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';

import rootReducer from './reducers/root-reducer';
import { watchAppSagas, watchAuthSagas } from './sagas/index';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(watchAppSagas);
sagaMiddleware.run(watchAuthSagas);

export default store;
