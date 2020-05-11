// Copyright 2020 Cognite AS

export type AlarmFetchConfig = {
  eventType: string;
  eventSubtype: string;
  metafieldKey: string;
  pollingInterval: number;
  startTime: number;
};
