// Copyright 2020 Cognite AS
import store from 'store';
import * as selectors from 'store/selectors';

export const getUserId = () => selectors.getUserId(store.getState());

export const getAssetId = () => selectors.getAssetId(store.getState());

export const getRemovedAlarmIds = () =>
  selectors.getRemovedAlarmIds(store.getState());
