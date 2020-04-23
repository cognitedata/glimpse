// Copyright 2020 Cognite AS

export type DefaultProps = {
  onCreate: Function;
  configFields: string[];
};

export type FormValues = {
  timeseriesExternalId: string;
  timeseriesName: string;
  timeseriesUnit: string;
  startValue: number;
  startUnit: string;
  granularityValue: number;
  granularityUnit: string;
  elapsedTimeEnabler: boolean;
  timeDisplayKey: string;
  maxPrecentageValue: number;
};

export type QueryParams = {
  [key: string]: string | number;
};

export type ValueMapping = {
  [key: string]: string | boolean | number;
};
