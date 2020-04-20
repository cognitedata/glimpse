// Copyright 2020 Cognite AS

export type DefaultProps = {
  onCreate: Function;
};

export type FormValues = {
  timeseriesExternalId: string;
  timeseriesName: string;
  timeseriesUnit: string;
  startValue: number;
  startUnit: string;
  granularityValue: number;
  granularityUnit: string;
};
