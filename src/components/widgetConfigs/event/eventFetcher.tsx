// Copyright 2020 Cognite AS
import { CogniteEvent, CogniteClient } from '@cognite/sdk';
import { RootState } from 'StoreTypes';
import store from 'store';
import { FetchEvent } from './interfaces';

const getCdfClient = (state: RootState) => state.appState.cdfClient;
const getAssetId = (state: RootState) => state.appState.asset?.id;

/**
 *
 * Fetch events list from cognite client based on input values.
 */
export const fetchEvents = async (props: FetchEvent) => {
  const cdfClient: CogniteClient = getCdfClient(store.getState());
  const assetId = getAssetId(store.getState());
  console.log(cdfClient, assetId);
  const { ongoing, type, subtype } = props;
  const eventsResults = await cdfClient.events.list({
    sort: { [ongoing ? 'startTime' : 'endTime']: 'desc' },
    limit: ongoing ? 100 : 1,
    filter: {
      assetIds: [assetId],
      type,
      subtype,
    },
  });

  let events: CogniteEvent[] = eventsResults.items;

  if (ongoing) {
    events = events.filter(event => !event.endTime);
  }
  return events;
};
