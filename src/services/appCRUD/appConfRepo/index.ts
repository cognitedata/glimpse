// Copyright 2020 Cognite AS
import * as appConfFireBaseRepo from './appConfFSRepo';
import * as appConfLocalStorageRepo from './appConfLSRepo';

export const { getMachineConfig, saveMachineConfig } =
  process.env.REACT_APP_USE_LOCALSTORAGE === 'true'
    ? appConfLocalStorageRepo
    : appConfFireBaseRepo;
