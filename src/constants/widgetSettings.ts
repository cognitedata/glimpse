// Copyright 2020 Cognite AS
import { RootState } from 'StoreTypes';
import ShowFieldsOne from 'components/widgets/showFields/ShowFieldsOne/ShowFieldsOne';
import ShowFieldsThree from 'components/widgets/showFields/ShowFieldsThree/ShowFieldsThree';
import ShowFieldsFour from 'components/widgets/showFields/ShowFieldsFour/ShowFieldsFour';
import ToolWidget from 'components/widgets/ToolWidget/ToolWidget';
import { TSFancyNumeric } from 'components/widgets/timeSeries/TSFancyNumeric/TSFancyNumeric';
import TSBasicString from 'components/widgets/timeSeries/TSBasicString/TSBasicString';
import TSBasicNumeric from 'components/widgets/timeSeries/TSBasicNumeric/TSBasicNumeric';
import TSWideNumeric from 'components/widgets/timeSeries/TSWideNumeric/TSWideNumeric';
import TSTallNumeric from 'components/widgets/timeSeries/TSTallNumeric/TSTallNumeric';
import get from 'lodash/get';

import * as actionTypes from '../store/actions/actionTypes';

/**
 * This contains all the widget types settings
 */

export enum WIDGET_TYPE_IDS {
  ASSET_INFO,
  EVENT_BASIC,
  EVENT_3_META_FIELDS,
  EVENT_4_META_FIELDS,
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

type VALUE_MAPPING_SHOWFIELDSONE = {
  field1: FieldMapping;
};

type VALUE_MAPPING_SHOWFIELDSTHREE = {
  field1: FieldMapping;
  field2: FieldMapping;
  field3: FieldMapping;
};

type VALUE_MAPPING_SHOWFIELDSFOUR = {
  field1: FieldMapping;
  field2: FieldMapping;
  field3: FieldMapping;
  field4: FieldMapping;
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
  | VALUE_MAPPING_SHOWFIELDSONE
  | VALUE_MAPPING_SHOWFIELDSTHREE
  | VALUE_MAPPING_SHOWFIELDSFOUR
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

const WIDGET_SETTINGS: any = {
  [WIDGET_TYPE_IDS.ASSET_INFO]: {
    component: ShowFieldsOne,
    mapStateToProps: (valueMapping: VALUE_MAPPING_SHOWFIELDSONE) => (
      state: RootState
    ) => {
      const { appState } = state;
      return {
        field1: {
          field: valueMapping.field1.label,
          value: get(appState.asset, valueMapping.field1.key, ''),
        },
      };
    },
  },
  [WIDGET_TYPE_IDS.EVENT_BASIC]: {
    component: ShowFieldsOne,
    dataFetcher: actionTypes.START_UPDATE_EVENT_INFO,
    pollingInterval: 10000,
    pollingEndAction: actionTypes.STOP_UPDATE_EVENT_INFO,
    mapStateToProps: (
      valueMapping: VALUE_MAPPING_SHOWFIELDSTHREE,
      statePath: string
    ) => (state: RootState) => {
      const { appState } = state;
      return {
        field1: {
          field: valueMapping.field1.label,
          value: get(appState[statePath], valueMapping.field1.key, ''),
        },
      };
    },
  },
  [WIDGET_TYPE_IDS.EVENT_3_META_FIELDS]: {
    component: ShowFieldsThree,
    dataFetcher: actionTypes.START_UPDATE_EVENT_INFO,
    pollingInterval: 10000,
    pollingEndAction: actionTypes.STOP_UPDATE_EVENT_INFO,
    mapStateToProps: (
      valueMapping: VALUE_MAPPING_SHOWFIELDSTHREE,
      statePath: string
    ) => (state: RootState) => {
      const { appState } = state;
      return {
        field1: {
          field: valueMapping.field1.label,
          value: get(appState[statePath], valueMapping.field1.key, ''),
        },
        field2: {
          field: valueMapping.field2.label,
          value: get(appState[statePath], valueMapping.field2.key, ''),
        },
        field3: {
          field: valueMapping.field3.label,
          value: get(appState[statePath], valueMapping.field3.key, ''),
        },
      };
    },
  },
  [WIDGET_TYPE_IDS.EVENT_4_META_FIELDS]: {
    component: ShowFieldsFour,
    dataFetcher: actionTypes.START_UPDATE_EVENT_INFO,
    pollingInterval: 10000,
    pollingEndAction: actionTypes.STOP_UPDATE_EVENT_INFO,
    mapStateToProps: (
      valueMapping: VALUE_MAPPING_SHOWFIELDSFOUR,
      statePath: string
    ) => (state: RootState) => {
      const { appState } = state;
      return {
        field1: {
          field: valueMapping.field1.label,
          value: get(appState[statePath], valueMapping.field1.key, ''),
        },
        field2: {
          field: valueMapping.field2.label,
          value: get(appState[statePath], valueMapping.field2.key, ''),
        },
        field3: {
          field: valueMapping.field3.label,
          value: get(appState[statePath], valueMapping.field3.key, ''),
        },
        field4: {
          field: valueMapping.field4.label,
          value: get(appState[statePath], valueMapping.field4.key, ''),
        },
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
    ) => (state: RootState) => {
      const { appState } = state;
      return {
        field: valueMapping.assetInfo,
        value: appState[statePath]?.value,
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
    ) => (state: RootState) => {
      const { appState } = state;
      return {
        title: valueMapping.title,
        value: appState[statePath]?.value,
        timestamp: appState[statePath]?.timestamp,
        timeDisplayKey: valueMapping.timeDisplayKey,
        precentage:
          (appState[statePath]?.value ? appState[statePath].value : 0) /
          (valueMapping.maxPrecentageVal > 0
            ? valueMapping.maxPrecentageVal
            : 1),
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
    ) => (state: RootState) => {
      const { appState } = state;
      return {
        name: valueMapping.label,
        value: appState[statePath]?.value,
        timestamp: appState[statePath]?.timestamp,
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
    ) => (state: RootState) => {
      const { appState } = state;
      return {
        name: valueMapping.label,
        value: appState[statePath]?.value,
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
      const data = get(state.appState, statePath, '');
      return {
        ...valueMapping,
        data,
        value:
          data &&
          data.length > 0 &&
          Math.round(data[data.length - 1].average).toString(),
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
        data: get(state.appState, statePath, ''),
      };
    },
  },
};

export default WIDGET_SETTINGS;
