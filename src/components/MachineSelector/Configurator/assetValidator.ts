// Copyright 2020 Cognite AS
import { CogniteClient } from '@cognite/sdk';
import { RootState } from 'StoreTypes';
import store from 'store';

const getCdfClient = (state: RootState) => state.appState.cdfClient;

/**
 *
 * Fetch assets from cognite client based on the asset external id.
 */
export const validateAsset = async (assetExternalId: string) => {
  const cdfClient: CogniteClient = getCdfClient(store.getState());
  const status = await cdfClient.assets
    .retrieve([{ id: Number(assetExternalId) }])
    .then(assets => {
      return assets.length > 0;
    })
    .catch(() => {
      return false;
    });
  return status;
};
