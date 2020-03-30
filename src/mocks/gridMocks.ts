import { WidgetConfig } from 'components/grid/interfaces';
import { Layout } from 'react-grid-layout';
import { WIDGET_TYPE_IDS } from 'constants/widgetSettings';

export const initialLayoutMocked: Layout[] = [
  { i: 'a', x: 0, y: 0, w: 1, h: 1 },
  { i: 'b', x: 0, y: 1, w: 1, h: 1 },
  { i: 'c', x: 0, y: 2, w: 1, h: 2 },
  { i: 'd', x: 0, y: 4, w: 1, h: 1, static: true },
  { i: 'e', x: 0, y: 5, w: 1, h: 1 },
  { i: 'f', x: 1, y: 0, w: 1, h: 1 },
  { i: 'g', x: 1, y: 1, w: 1, h: 3 },
  { i: 'h', x: 1, y: 1, w: 3, h: 2 },
  { i: 'i', x: 2, y: 0, w: 1, h: 2 },
  { i: 'j', x: 3, y: 0, w: 1, h: 4 },
];

export const mockedWidgetConfigs: WidgetConfig[] = [
  {
    i: 'a',
    widgetTypeId: WIDGET_TYPE_IDS.ASSET_INFO,
    valueMapping: {
      field1: {
        label: 'Current Machine',
        key: 'name',
      },
    },
  },
  {
    i: 'f',
    widgetTypeId: WIDGET_TYPE_IDS.TOOL_WIDGET,
    queryParams: {
      timeSeriesExternalId: 'VAL_23-LY-92529_SILch0_SC0_TYPSP:VALUE',
    },
    valueMapping: {
      assetInfo: 'Description   84mm',
      label: 'Tool Id',
    },
  },
  {
    i: 'i',
    widgetTypeId: WIDGET_TYPE_IDS.TIMESERIES_FANCY_NUMERIC,
    queryParams: {
      timeSeriesExternalId: 'VAL_23-LIC-92521:Z.Y.Value',
    },
    valueMapping: {
      maxPrecentageVal: 1,
      title: 'Shift Utilization',
      timeDisplayKey: 'Elapsed Time - job',
    },
  },
  {
    i: 'd',
    widgetTypeId: WIDGET_TYPE_IDS.TIMESERIES_BASIC_STRING,
    queryParams: {
      timeSeriesExternalId: 'VAL_23-LY-92529_SILch0_SC0_TYPSP:VALUE',
    },
    valueMapping: {
      label: 'Machine State',
      isElapsedTimeEnabled: true,
    },
  },
  {
    i: 'e',
    widgetTypeId: WIDGET_TYPE_IDS.TIMESERIES_BASIC_NUMERIC,
    queryParams: {
      timeSeriesExternalId:
        'VAL_23-KA-9101-M01_OC_instantaneous_residual_NEF1inst:VALUE',
    },
    valueMapping: {
      label: 'Machine Temperature',
      unit: '°c',
    },
  },
  {
    i: 'c',
    widgetTypeId: WIDGET_TYPE_IDS.EVENT_3_META_FIELDS,
    queryParams: {
      eventType: '***',
      eventSubType: 'VAL',
      ongoing: false,
    },
    valueMapping: {
      field1: {
        label: 'Work Order',
        key: 'metadata.WORKORDER_NUMBER',
      },
      field2: {
        label: 'Event Sub Type',
        key: 'subtype',
      },
      field3: {
        label: 'Metadata Source Id',
        key: 'metadata.sourceId',
      },
    },
  },
  {
    i: 'g',
    widgetTypeId: WIDGET_TYPE_IDS.EVENT_4_META_FIELDS,
    queryParams: {
      eventType: '***',
      eventSubType: 'VAL',
      ongoing: false,
    },
    valueMapping: {
      field1: {
        label: 'Work Order',
        key: 'metadata.WORKORDER_NUMBER',
      },
      field2: {
        label: 'Event Sub Type',
        key: 'subtype',
      },
      field3: {
        label: 'Metadata Source Id',
        key: 'metadata.sourceId',
      },
      field4: {
        label: 'Metadata Source',
        key: 'metadata.source',
      },
    },
  },
  {
    i: 'j',
    widgetTypeId: WIDGET_TYPE_IDS.TIMESERIES_TALL_NUMERIC,
    queryParams: {
      id: 303782999296110,
      start: '15d-ago',
      end: 'now',
      granularity: '4h',
      limit: 1000,
    },
    valueMapping: {
      name: 'Machine Temperature',
      unit: '°c',
    },
  },
  {
    i: 'h',
    widgetTypeId: WIDGET_TYPE_IDS.TIMESERIES_WIDE_NUMERIC,
    queryParams: {
      id: 303782999296110,
      start: '15d-ago',
      end: 'now',
      granularity: '4h',
      limit: 1000,
    },
    valueMapping: {
      title: '24 Hour Utilization',
    },
  },
  {
    i: 'b',
    widgetTypeId: WIDGET_TYPE_IDS.EVENT_BASIC,
    queryParams: {
      eventType: '***',
      eventSubType: 'VAL',
      ongoing: false,
    },
    valueMapping: {
      field1: {
        label: 'Work Order',
        key: 'metadata.WORKORDER_NUMBER',
      },
    },
  },
];
