// Copyright 2020 Cognite AS
import * as widgetConfFireBaseRepo from './widgstConfFSRepo';
import * as widgetConfLocalStorageRepo from './widgetConfLSRepo';

export const { update, save, deleteOne, getByUser } =
  process.env.REACT_APP_USE_LOCALSTORAGE === 'true'
    ? widgetConfLocalStorageRepo
    : widgetConfFireBaseRepo;
