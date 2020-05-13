// Copyright 2020 Cognite AS
import { RootState } from 'StoreTypes';

export const getCdfClient = (state: RootState) => state.appState.cdfClient;
export const getAssetId = (state: RootState) => state.appState.asset?.id;
export const getUserId = (state: RootState) => state.authState.userInfo?.name;
export const getAlarms = (state: RootState) => state.appState.alarms;
export const getRemovedAlarmIds = (state: RootState) =>
  state.appState.removedAlarmIds;
