// Copyright 2020 Cognite AS
// import { select } from 'redux-saga/effects';
import { CogniteEvent } from '@cognite/sdk';
import { RootState } from 'StoreTypes';
import store from 'store';

const getCdfClient = (state: RootState) => state.appState.cdfClient;
const getAssetId = (state: RootState) => state.widgetState.asset?.id;

/**
 *
 * Event fetcher
 */
export const fetchEvents = async (props: any) => {
  const cdfClient: any = getCdfClient(store.getState());
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
