// Copyright 2020 Cognite AS
import { CogniteClient } from '@cognite/sdk';
import { RootState } from 'StoreTypes';
import store from 'store';

const getCdfClient = (state: RootState) => state.appState.cdfClient;

/**
 *
 * Fetch timeseries from cognite client based on the timeseries external id.
 */
export const fetchTimeseries = async (tsExternalId: string) => {
  const cdfClient: CogniteClient = getCdfClient(store.getState());
  const timeseries = await cdfClient.timeseries
    .retrieve([{ externalId: tsExternalId }])
    .then(timeSeries => {
      return timeSeries.length > 0 ? timeSeries[0] : null;
    })
    .catch(() => {
      return null;
    });
  return timeseries;
};
