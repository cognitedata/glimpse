// Copyright 2020 Cognite AS
import { RootState } from 'StoreTypes';

export const getCdfClient = (state: RootState) => state.appState.cdfClient;
