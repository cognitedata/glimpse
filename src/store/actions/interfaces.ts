// Copyright 2020 Cognite AS
import { CogniteEvent, GetAggregateDatapoint } from '@cognite/sdk';

export type EventMapping = {
  [key: string]: CogniteEvent;
};

export type LatestDatapoint =
  | {
      timestamp: Date;
      value: number | string;
    }
  | {};

export type LatestDatapointMapping = {
  [key: string]: LatestDatapoint;
};

export type DatapointMapping = {
  [key: string]: GetAggregateDatapoint;
};
