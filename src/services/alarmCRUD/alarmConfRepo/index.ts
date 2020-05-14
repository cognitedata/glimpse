// Copyright 2020 Cognite AS
import * as alarmConfFireBaseRepo from './alarmConfFSRepo';
import * as alarmConfLocalStorageRepo from './alarmConfLSRepo';

export const { getAlarmConfig, saveAlarmConfig } =
  process.env.REACT_APP_USE_LOCALSTORAGE === 'true'
    ? alarmConfLocalStorageRepo
    : alarmConfFireBaseRepo;
