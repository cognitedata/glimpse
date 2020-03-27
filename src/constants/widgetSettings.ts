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
import { getChildValue } from '../utills/utills';

import * as actionTypes from '../store/actions/actionTypes';

import { TSTallNumericMockProps } from '../mocks/widgetsMockData/tsTallNumericMock';
import { timeSeriesWideNumericMockProps } from '../mocks/widgetsMockData/tsWideNumericMock';

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

export type ValueMapping =
  | VALUE_MAPPING_SHOWFIELDSONE
  | VALUE_MAPPING_SHOWFIELDSTHREE
  | VALUE_MAPPING_SHOWFIELDSFOUR;

const WIDGET_SETTINGS: any = {
  [WIDGET_TYPE_IDS.ASSET_INFO]: {
    component: ShowFieldsOne,
    mapStateToProps: (valueMapping: VALUE_MAPPING_SHOWFIELDSONE) => (
      state: RootState
    ) => {
      const { widgetState } = state;
      return {
        field1: {
          field: valueMapping.field1.label,
          value: getChildValue(widgetState.asset, valueMapping.field1.key),
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
    ) => (state: any) => {
      const { widgetState } = state;
      return {
        field1: {
          field: valueMapping.field1.label,
          value: getChildValue(widgetState[statePath], valueMapping.field1.key),
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
    ) => (state: any) => {
      const { widgetState } = state;
      return {
        field1: {
          field: valueMapping.field1.label,
          value: getChildValue(widgetState[statePath], valueMapping.field1.key),
        },
        field2: {
          field: valueMapping.field2.label,
          value: getChildValue(widgetState[statePath], valueMapping.field2.key),
        },
        field3: {
          field: valueMapping.field3.label,
          value: getChildValue(widgetState[statePath], valueMapping.field3.key),
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
    ) => (state: any) => {
      const { widgetState } = state;
      return {
        field1: {
          field: valueMapping.field1.label,
          value: getChildValue(widgetState[statePath], valueMapping.field1.key),
        },
        field2: {
          field: valueMapping.field2.label,
          value: getChildValue(widgetState[statePath], valueMapping.field2.key),
        },
        field3: {
          field: valueMapping.field3.label,
          value: getChildValue(widgetState[statePath], valueMapping.field3.key),
        },
        field4: {
          field: valueMapping.field4.label,
          value: getChildValue(widgetState[statePath], valueMapping.field4.key),
        },
      };
    },
  },
  [WIDGET_TYPE_IDS.TOOL_WIDGET]: {
    component: ToolWidget,
    mapStateToProps: () => () => {
      return {
        field: 'description    84mm',
        value: '5733-123',
        name: 'Tool Id',
      };
    },
  },
  [WIDGET_TYPE_IDS.TIMESERIES_FANCY_NUMERIC]: {
    component: TSFancyNumeric,
    mapStateToProps: () => () => {
      return {
        title: 'Shift Utilization',
        timeDisplayKey: 'Elapsed Time - Job',
        time: '33:58:18',
        precentage: 30,
      };
    },
  },
  [WIDGET_TYPE_IDS.TIMESERIES_BASIC_STRING]: {
    component: TSBasicString,
    mapStateToProps: () => () => {
      return {
        name: 'Machine State',
        value: 'MANUAL MODE',
        elapsedTime: '00.10.42',
        isElapsedTimeEnabled: true,
      };
    },
  },
  [WIDGET_TYPE_IDS.TIMESERIES_BASIC_NUMERIC]: {
    component: TSBasicNumeric,
    mapStateToProps: () => () => {
      return {
        name: 'Machine Temperature',
        value: 89,
        unit: '°C ',
      };
    },
  },
  [WIDGET_TYPE_IDS.TIMESERIES_TALL_NUMERIC]: {
    component: TSTallNumeric,
    mapStateToProps: () => () => {
      return {
        ...TSTallNumericMockProps[0],
      };
    },
  },
  [WIDGET_TYPE_IDS.TIMESERIES_WIDE_NUMERIC]: {
    component: TSWideNumeric,
    mapStateToProps: () => () => {
      return {
        ...timeSeriesWideNumericMockProps[0],
      };
    },
  },
};

export default WIDGET_SETTINGS;
