// Copyright 2020 Cognite AS
import { RootState } from 'StoreTypes';
import ShowFields from 'components/widgets/showFields/ShowFields';
import ToolWidget from 'components/widgets/ToolWidget/ToolWidget';
import { TSFancyNumeric } from 'components/widgets/timeSeries/TSFancyNumeric/TSFancyNumeric';
import TSBasicString from 'components/widgets/timeSeries/TSBasicString/TSBasicString';
import TSBasicNumeric from 'components/widgets/timeSeries/TSBasicNumeric/TSBasicNumeric';
import TSWideNumeric from 'components/widgets/timeSeries/TSWideNumeric/TSWideNumeric';
import TSTallNumeric from 'components/widgets/timeSeries/TSTallNumeric/TSTallNumeric';

import assetInfoImg from 'assets/widget-previews/asset-info.png';
import eventBasicImg from 'assets/widget-previews/event-basic.png';
import event3MetadataFieldsImg from 'assets/widget-previews/event-3-metadata-fields.png';
import event4MetadataFieldsImg from 'assets/widget-previews/event-4-metadata-fields.png';
import toolWidgetImg from 'assets/widget-previews/tool-widget.png';
import timeseriesBasicStringImg from 'assets/widget-previews/timeseries-basic-string.png';
import timeseriesFancyNumericImg from 'assets/widget-previews/timeseries-fancy-numeric.png';
import timeseriesBasicNumericImg from 'assets/widget-previews/timeseries-basic-numeric.png';
import timeseriesTallNumericImg from 'assets/widget-previews/timeseries-tall-numeric.png';
import timeseriesWideNumericImg from 'assets/widget-previews/timeseries-wide-numeric.png';
import get from 'lodash/get';
import {
  EventOneMetaConfigurator,
  EventThreeMetaConfigurator,
  EventFourMetaConfigurator,
} from 'components/widgetConfigs/event/Configurator';
import AssetInfoConfigurator from 'components/widgetConfigs/assetInfo/AssetInfoConfigurator';
import TimeseriesWideNumericConfigurator from 'components/widgetConfigs/timeseries/TimeseriesWideNumericConfigurator';
import TimeseriesTallNumericConfigurator from 'components/widgetConfigs/timeseries/TimeseriesTallNumericConfigurator';
import TimeseriesBasicNumericConfigurator from 'components/widgetConfigs/timeseries/TimeseriesBasicNumericConfigurator';
import TimeseriesBasicStringConfigurator from 'components/widgetConfigs/timeseries/TimeseriesBasicStringConfigurator';
import TimeseriesFancyNumericConfigurator from 'components/widgetConfigs/timeseries/TimeseriesFancyNumericConfigurator';

import * as actionTypes from '../store/actions/actionTypes';

export const WIDGET_CONF_DB = 'widget-config';

/**
 * This contains all the widget types settings
 */
export const WIDGET_TYPE_IDS = {
  ASSET_INFO: 'ASSET_INFO',
  EVENT_BASIC: 'EVENT_BASIC',
  EVENT_3_META_FIELDS: 'EVENT_3_META_FIELDS',
  EVENT_4_META_FIELDS: 'EVENT_4_META_FIELDS',
  TOOL_WIDGET: 'TOOL_WIDGET',
  TIMESERIES_BASIC_STRING: 'TIMESERIES_BASIC_STRING',
  TIMESERIES_FANCY_NUMERIC: 'TIMESERIES_FANCY_NUMERIC',
  TIMESERIES_BASIC_NUMERIC: 'TIMESERIES_BASIC_NUMERIC',
  TIMESERIES_TALL_NUMERIC: 'TIMESERIES_TALL_NUMERIC',
  TIMESERIES_WIDE_NUMERIC: 'TIMESERIES_WIDE_NUMERIC',
};
type TsWideNumericValMap = {
  nameWithRange: string;
};
type TsTallNumericValMap = {
  name: string;
  unit: string;
};

export type FieldMapping = {
  label: string;
  key: string | undefined;
};

type VALUE_MAPPING_SHOWFIELDS = {
  fields: FieldMapping[];
};

type VALUE_MAPPING_TOOLWIDGET = {
  label: string;
  assetInfo: string;
};

type VALUE_MAPPING_TSBASICSTRING = {
  name: string;
  isElapsedTimeEnabled: boolean;
};

type VALUE_MAPPING_TSFANCYNUMERIC = {
  maxPrecentageValue: number;
  name: string;
  timeDisplayKey: string;
};

type VALUE_MAPPING_TSBASICNUMERIC = {
  name: string;
  unit: string;
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

const WIDGET_SETTINGS: any = {
  [WIDGET_TYPE_IDS.ASSET_INFO]: {
    name: 'Asset info',
    image: assetInfoImg,
    configurator: AssetInfoConfigurator,
    size: [1, 1],
    component: ShowFields,
    mapStateToProps: (valueMapping: VALUE_MAPPING_SHOWFIELDS) => (
      state: RootState
    ) => {
      const { appState } = state;
      return {
        fields: extractFields(appState.asset, valueMapping.fields),
      };
    },
  },
  [WIDGET_TYPE_IDS.EVENT_BASIC]: {
    name: 'Event - basic',
    image: eventBasicImg,
    size: [1, 1],
    configurator: EventOneMetaConfigurator,
    component: ShowFields,
    dataFetcher: actionTypes.START_UPDATE_EVENT_INFO,
    pollingInterval: 10000,
    pollingEndAction: actionTypes.STOP_UPDATE_EVENT_INFO,
    mapStateToProps: (
      valueMapping: VALUE_MAPPING_SHOWFIELDS,
      statePath: string
    ) => (state: RootState) => {
      const { appState } = state;
      return {
        fields: extractFields(appState[statePath], valueMapping.fields),
      };
    },
  },
  [WIDGET_TYPE_IDS.EVENT_3_META_FIELDS]: {
    name: 'Event - 3 metadata fields',
    image: event3MetadataFieldsImg,
    size: [1, 2],
    configurator: EventThreeMetaConfigurator,
    component: ShowFields,
    dataFetcher: actionTypes.START_UPDATE_EVENT_INFO,
    pollingInterval: 10000,
    pollingEndAction: actionTypes.STOP_UPDATE_EVENT_INFO,
    mapStateToProps: (
      valueMapping: VALUE_MAPPING_SHOWFIELDS,
      statePath: string
    ) => (state: RootState) => {
      const { appState } = state;
      return {
        fields: extractFields(appState[statePath], valueMapping.fields),
      };
    },
  },
  [WIDGET_TYPE_IDS.EVENT_4_META_FIELDS]: {
    name: 'Event - 4 metadata fields',
    image: event4MetadataFieldsImg,
    size: [1, 3],
    configurator: EventFourMetaConfigurator,
    component: ShowFields,
    dataFetcher: actionTypes.START_UPDATE_EVENT_INFO,
    pollingInterval: 10000,
    pollingEndAction: actionTypes.STOP_UPDATE_EVENT_INFO,
    mapStateToProps: (
      valueMapping: VALUE_MAPPING_SHOWFIELDS,
      statePath: string
    ) => (state: RootState) => {
      const { appState } = state;
      return {
        fields: extractFields(appState[statePath], valueMapping.fields),
      };
    },
  },
  [WIDGET_TYPE_IDS.TOOL_WIDGET]: {
    name: 'Tool widget',
    image: toolWidgetImg,
    size: [1, 1],
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
    name: 'Timeseries - Fancy numeric',
    image: timeseriesFancyNumericImg,
    size: [1, 2],
    component: TSFancyNumeric,
    configurator: TimeseriesFancyNumericConfigurator,
    dataFetcher: actionTypes.START_UPDATE_LATEST_DATAPOINT,
    pollingInterval: 10000,
    pollingEndAction: actionTypes.STOP_UPDATE_LATEST_DATAPOINT,
    mapStateToProps: (
      valueMapping: VALUE_MAPPING_TSFANCYNUMERIC,
      statePath: string
    ) => (state: RootState) => {
      const { appState } = state;
      return {
        title: valueMapping.name,
        value: appState[statePath]?.value,
        timestamp: appState[statePath]?.timestamp,
        timeDisplayKey: valueMapping.timeDisplayKey,
        precentage:
          (appState[statePath]?.value ? appState[statePath].value : 0) /
          (valueMapping.maxPrecentageValue > 0
            ? valueMapping.maxPrecentageValue
            : 1),
      };
    },
  },
  [WIDGET_TYPE_IDS.TIMESERIES_BASIC_STRING]: {
    name: 'Timeseries - Basic string',
    image: timeseriesBasicStringImg,
    size: [1, 1],
    component: TSBasicString,
    configurator: TimeseriesBasicStringConfigurator,
    dataFetcher: actionTypes.START_UPDATE_LATEST_DATAPOINT,
    pollingInterval: 10000,
    pollingEndAction: actionTypes.STOP_UPDATE_LATEST_DATAPOINT,
    mapStateToProps: (
      valueMapping: VALUE_MAPPING_TSBASICSTRING,
      statePath: string
    ) => (state: RootState) => {
      const { appState } = state;
      return {
        name: valueMapping.name,
        value: appState[statePath]?.value,
        timestamp: appState[statePath]?.timestamp,
        isElapsedTimeEnabled: valueMapping.isElapsedTimeEnabled,
      };
    },
  },
  [WIDGET_TYPE_IDS.TIMESERIES_BASIC_NUMERIC]: {
    name: 'Timeseries - Basic numeric',
    image: timeseriesBasicNumericImg,
    size: [1, 1],
    component: TSBasicNumeric,
    configurator: TimeseriesBasicNumericConfigurator,
    dataFetcher: actionTypes.START_UPDATE_LATEST_DATAPOINT,
    pollingInterval: 10000,
    pollingEndAction: actionTypes.STOP_UPDATE_LATEST_DATAPOINT,
    mapStateToProps: (
      valueMapping: VALUE_MAPPING_TSBASICNUMERIC,
      statePath: string
    ) => (state: RootState) => {
      const { appState } = state;
      return {
        name: valueMapping.name,
        value: appState[statePath]?.value,
        unit: valueMapping.unit,
      };
    },
  },
  [WIDGET_TYPE_IDS.TIMESERIES_TALL_NUMERIC]: {
    name: 'Timeseries - Tall numeric',
    image: timeseriesTallNumericImg,
    size: [1, 4],
    component: TSTallNumeric,
    configurator: TimeseriesTallNumericConfigurator,
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
    name: 'Timeseries - Wide numeric',
    image: timeseriesWideNumericImg,
    size: [3, 2],
    component: TSWideNumeric,
    configurator: TimeseriesWideNumericConfigurator,
    dataFetcher: actionTypes.START_UPDATE_TS_DPS,
    pollingInterval: 10000,
    pollingEndAction: actionTypes.STOP_UPDATE_TS_DPS,
    mapStateToProps: (valueMapping: TsWideNumericValMap, statePath: string) => (
      state: RootState
    ) => {
      return {
        title: valueMapping.nameWithRange,
        data: get(state.appState, statePath, ''),
      };
    },
  },
};

export default WIDGET_SETTINGS;
