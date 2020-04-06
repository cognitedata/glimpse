// Copyright 2020 Cognite AS
import { RootState } from 'StoreTypes';
import ShowFieldsFour from 'components/widgets/showFields/ShowFields';
import ToolWidget from 'components/widgets/ToolWidget/ToolWidget';
import { TSFancyNumeric } from 'components/widgets/timeSeries/TSFancyNumeric/TSFancyNumeric';
import TSBasicString from 'components/widgets/timeSeries/TSBasicString/TSBasicString';
import TSBasicNumeric from 'components/widgets/timeSeries/TSBasicNumeric/TSBasicNumeric';
import TSWideNumeric from 'components/widgets/timeSeries/TSWideNumeric/TSWideNumeric';
import TSTallNumeric from 'components/widgets/timeSeries/TSTallNumeric/TSTallNumeric';
import get from 'lodash/get';

import { mockDataPoints } from 'mocks/widgetsMockData/tsWideNumericMock';
import * as actionTypes from '../store/actions/actionTypes';

/**
 * This contains all the widget types settings
 */

export enum WIDGET_TYPE_IDS {
  ASSET_INFO,
  EVENT_META_FIELDS,
  TOOL_WIDGET,
  TIMESERIES_BASIC_STRING,
  TIMESERIES_FANCY_NUMERIC,
  TIMESERIES_BASIC_NUMERIC,
  TIMESERIES_TALL_NUMERIC,
  TIMESERIES_WIDE_NUMERIC,
}
type TsWideNumericValMap = {
  title: string;
};
type TsTallNumericValMap = {
  name: string;
  unit: string;
};

type FieldMapping = {
  label: string;
  key: string;
};

type VALUE_MAPPING_SHOWFIELDS = {
  fields: FieldMapping[];
};

type VALUE_MAPPING_TOOLWIDGET = {
  label: string;
  assetInfo: string;
};

type VALUE_MAPPING_TSBASICSTRING = {
  label: string;
  unit: string;
  isElapsedTimeEnabled: boolean;
};

type VALUE_MAPPING_TSFANCYNUMERIC = {
  maxPrecentageVal: number;
  title: string;
  timeDisplayKey: string;
};

type VALUE_MAPPING_TSBASICNUMERIC = {
  label: string;
};

export type ValueMapping =
  | VALUE_MAPPING_SHOWFIELDS
  | TsWideNumericValMap
  | TsTallNumericValMap
  | VALUE_MAPPING_TOOLWIDGET
  | VALUE_MAPPING_TSBASICSTRING
  | VALUE_MAPPING_TSBASICNUMERIC
  | VALUE_MAPPING_TSFANCYNUMERIC;

export type QueryParams = {
  externalId?: string;
  type?: string;
  subtype?: string;
  ongoing?: boolean;
  id?: number;
  start?: string;
  end?: string;
  granularity?: string;
  limit?: number;
};

const extractFields = (asset: any, fields: any[]) => {
  return fields.map(fieldObj => ({
    ...fieldObj,
    value: get(asset, fieldObj.key, ''),
  }));
};
const extractMockFields = (fields: any[]) => {
  return fields.map((fieldObj, index) => ({
    ...fieldObj,
    value: `test value ${index + 1}`,
  }));
};

const WIDGET_SETTINGS: any = {
  [WIDGET_TYPE_IDS.ASSET_INFO]: {
    component: ShowFieldsFour,
    mapStateToProps: (valueMapping: VALUE_MAPPING_SHOWFIELDS) => (
      state: RootState
    ) => {
      const { widgetState } = state;
      return {
        fields: extractFields(widgetState.asset, valueMapping.fields),
      };
    },
    mapStateToMockProps: (valueMapping: VALUE_MAPPING_SHOWFIELDS) => () => {
      return {
        fields: extractMockFields(valueMapping.fields),
      };
    },
  },
  [WIDGET_TYPE_IDS.EVENT_META_FIELDS]: {
    component: ShowFieldsFour,
    dataFetcher: actionTypes.START_UPDATE_EVENT_INFO,
    pollingInterval: 10000,
    pollingEndAction: actionTypes.STOP_UPDATE_EVENT_INFO,
    mapStateToProps: (
      valueMapping: VALUE_MAPPING_SHOWFIELDS,
      statePath: string
    ) => (state: any) => {
      const { widgetState } = state;
      return {
        fields: extractFields(widgetState[statePath], valueMapping.fields),
      };
    },
    mapStateToMockProps: (valueMapping: VALUE_MAPPING_SHOWFIELDS) => () => {
      return {
        fields: extractMockFields(valueMapping.fields),
      };
    },
  },
  [WIDGET_TYPE_IDS.TOOL_WIDGET]: {
    component: ToolWidget,
    dataFetcher: actionTypes.START_UPDATE_LATEST_DATAPOINT,
    pollingInterval: 10000,
    pollingEndAction: actionTypes.STOP_UPDATE_LATEST_DATAPOINT,
    mapStateToProps: (
      valueMapping: VALUE_MAPPING_TOOLWIDGET,
      statePath: string
    ) => (state: any) => {
      const { widgetState } = state;
      return {
        label: valueMapping.assetInfo,
        value: widgetState[statePath]?.value,
        name: valueMapping.label,
      };
    },
    mapStateToMockProps: (valueMapping: VALUE_MAPPING_TOOLWIDGET) => () => {
      return {
        field: valueMapping.assetInfo,
        value: 'test value',
        name: valueMapping.label,
      };
    },
  },
  [WIDGET_TYPE_IDS.TIMESERIES_FANCY_NUMERIC]: {
    component: TSFancyNumeric,
    dataFetcher: actionTypes.START_UPDATE_LATEST_DATAPOINT,
    pollingInterval: 10000,
    pollingEndAction: actionTypes.STOP_UPDATE_LATEST_DATAPOINT,
    mapStateToProps: (
      valueMapping: VALUE_MAPPING_TSFANCYNUMERIC,
      statePath: string
    ) => (state: any) => {
      const { widgetState } = state;
      return {
        title: valueMapping.title,
        value: widgetState[statePath]?.value,
        timestamp: widgetState[statePath]?.timestamp,
        timeDisplayKey: valueMapping.timeDisplayKey,
        precentage:
          (widgetState[statePath]?.value ? widgetState[statePath].value : 0) /
          (valueMapping.maxPrecentageVal > 0
            ? valueMapping.maxPrecentageVal
            : 1),
      };
    },
    mapStateToMockProps: (valueMapping: VALUE_MAPPING_TSFANCYNUMERIC) => () => {
      return {
        title: valueMapping.title,
        value: 'test value',
        timestamp: Date.now(),
        timeDisplayKey: valueMapping.timeDisplayKey,
        precentage: Math.floor(Math.random() * 100),
      };
    },
  },
  [WIDGET_TYPE_IDS.TIMESERIES_BASIC_STRING]: {
    component: TSBasicString,
    dataFetcher: actionTypes.START_UPDATE_LATEST_DATAPOINT,
    pollingInterval: 10000,
    pollingEndAction: actionTypes.STOP_UPDATE_LATEST_DATAPOINT,
    mapStateToProps: (
      valueMapping: VALUE_MAPPING_TSBASICSTRING,
      statePath: string
    ) => (state: any) => {
      const { widgetState } = state;
      return {
        name: valueMapping.label,
        value: widgetState[statePath]?.value,
        timestamp: widgetState[statePath]?.timestamp,
        isElapsedTimeEnabled: valueMapping.isElapsedTimeEnabled,
      };
    },
    mapStateToMockProps: (valueMapping: VALUE_MAPPING_TSBASICSTRING) => () => {
      return {
        name: valueMapping.label,
        value: 'test value',
        timestamp: Date.now(),
        isElapsedTimeEnabled: valueMapping.isElapsedTimeEnabled,
      };
    },
  },
  [WIDGET_TYPE_IDS.TIMESERIES_BASIC_NUMERIC]: {
    component: TSBasicNumeric,
    dataFetcher: actionTypes.START_UPDATE_LATEST_DATAPOINT,
    pollingInterval: 10000,
    pollingEndAction: actionTypes.STOP_UPDATE_LATEST_DATAPOINT,
    mapStateToProps: (
      valueMapping: VALUE_MAPPING_TSBASICSTRING,
      statePath: string
    ) => (state: any) => {
      const { widgetState } = state;
      return {
        name: valueMapping.label,
        value: widgetState[statePath]?.value,
        unit: valueMapping.unit,
      };
    },
    mapStateToMockProps: (valueMapping: VALUE_MAPPING_TSBASICSTRING) => () => {
      return {
        name: valueMapping.label,
        value: Math.floor(Math.random() * 50),
        unit: valueMapping.unit,
      };
    },
  },
  [WIDGET_TYPE_IDS.TIMESERIES_TALL_NUMERIC]: {
    component: TSTallNumeric,
    dataFetcher: actionTypes.START_UPDATE_TS_DPS,
    pollingInterval: 10000,
    pollingEndAction: actionTypes.STOP_UPDATE_TS_DPS,
    mapStateToProps: (valueMapping: TsWideNumericValMap, statePath: string) => (
      state: RootState
    ) => {
      const data = get(state.widgetState, statePath, '');
      return {
        ...valueMapping,
        data,
        value:
          data &&
          data.length > 0 &&
          Math.round(data[data.length - 1].average).toString(),
      };
    },
    mapStateToMockProps: (valueMapping: TsWideNumericValMap) => () => {
      const data = mockDataPoints;
      return {
        ...valueMapping,
        data,
        value: Math.floor(Math.random() * 50),
      };
    },
  },
  [WIDGET_TYPE_IDS.TIMESERIES_WIDE_NUMERIC]: {
    component: TSWideNumeric,
    dataFetcher: actionTypes.START_UPDATE_TS_DPS,
    pollingInterval: 10000,
    pollingEndAction: actionTypes.STOP_UPDATE_TS_DPS,
    mapStateToProps: (valueMapping: TsWideNumericValMap, statePath: string) => (
      state: RootState
    ) => {
      return {
        ...valueMapping,
        data: get(state.widgetState, statePath, ''),
      };
    },
    mapStateToMockProps: (valueMapping: TsWideNumericValMap) => () => {
      return {
        ...valueMapping,
        data: mockDataPoints,
      };
    },
  },
};

export default WIDGET_SETTINGS;
