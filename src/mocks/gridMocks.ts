// Copyright 2020 Cognite AS
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
  { i: 'h', x: 1, y: 4, w: 3, h: 2 },
  { i: 'i', x: 2, y: 0, w: 1, h: 2 },
  { i: 'j', x: 3, y: 0, w: 1, h: 4 },
  { i: 'k', x: 2, y: 2, w: 1, h: 2 },
];

export const mockedWidgetConfigs: WidgetConfig[] = [
  {
    i: 'a',
    cordinates: [0, 0],
    widgetTypeId: WIDGET_TYPE_IDS.ASSET_INFO,
    valueMapping: {
      fields: [
        {
          label: 'Current Machine',
          key: 'name',
        },
      ],
    },
  },
  {
    i: 'b',
    cordinates: [0, 1],
    widgetTypeId: WIDGET_TYPE_IDS.EVENT_BASIC,
    queryParams: {
      type: '***',
      subtype: 'VAL',
      ongoing: false,
    },
    valueMapping: {
      fields: [
        {
          label: 'Work Order',
          key: 'metadata.WORKORDER_NUMBER',
        },
      ],
    },
  },
  {
    i: 'c',
    cordinates: [0, 2],
    widgetTypeId: WIDGET_TYPE_IDS.EVENT_3_META_FIELDS,
    queryParams: {
      type: '***',
      subtype: 'VAL',
      ongoing: false,
    },
    valueMapping: {
      maxPrecentageValue: 1,
      name: 'Shift Utilization',
      timeDisplayKey: 'Elapsed Time - job',
    },
  },
  {
    i: 'd',
    cordinates: [0, 4],
    layout: { static: true },
    widgetTypeId: WIDGET_TYPE_IDS.TIMESERIES_BASIC_STRING,
    queryParams: {
      externalId: 'VAL_23-LY-92529_SILch0_SC0_TYPSP:VALUE',
    },
    valueMapping: {
      name: 'Machine State',
      isElapsedTimeEnabled: true,
    },
  },
  {
    i: 'e',
    cordinates: [0, 5],
    widgetTypeId: WIDGET_TYPE_IDS.TIMESERIES_BASIC_NUMERIC,
    queryParams: {
      externalId: 'VAL_23-LY-92529_SILch0_SC0_TYPSP:VALUE',
    },
    valueMapping: {
      name: 'Machine Temperature',
      unit: '°c',
    },
  },
  {
    i: 'f',
    cordinates: [1, 0],
    widgetTypeId: WIDGET_TYPE_IDS.TOOL_WIDGET,
    queryParams: {
      externalId: 'VAL_23-LY-92529_SILch0_SC0_TYPSP:VALUE',
    },
    valueMapping: {
      assetInfo: 'Description   84mm',
      label: 'Tool Id',
    },
  },
  {
    i: 'g',
    cordinates: [1, 1],
    widgetTypeId: WIDGET_TYPE_IDS.EVENT_4_META_FIELDS,
    queryParams: {
      type: '***',
      subtype: 'VAL',
      ongoing: false,
    },
    valueMapping: {
      fields: [
        {
          label: 'Work Order',
          key: 'metadata.WORKORDER_NUMBER',
        },
        {
          label: 'Event Sub Type',
          key: 'subtype',
        },
        {
          label: 'Metadata Source Id',
          key: 'metadata.sourceId',
        },
        {
          label: 'Metadata Source',
          key: 'metadata.source',
        },
      ],
    },
  },
  {
    i: 'h',
    cordinates: [1, 4],
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
    i: 'i',
    cordinates: [2, 0],
    widgetTypeId: WIDGET_TYPE_IDS.TIMESERIES_FANCY_NUMERIC,
    queryParams: {
      externalId: 'VAL_23-LIC-92521:Z.Y.Value',
    },
    valueMapping: {
      nameWithRange: '24 Hour Utilization',
    },
  },
  {
    i: 'j',
    cordinates: [3, 0],
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
    i: 'k',
    cordinates: [2, 2],
    widgetTypeId: WIDGET_TYPE_IDS.EVENT_3_META_FIELDS,
    queryParams: {
      type: '***',
      subtype: 'VAL',
      ongoing: false,
    },
    valueMapping: {
      fields: [
        {
          label: 'Work Order',
          key: 'metadata.WORKORDER_NUMBER',
        },
        {
          label: 'Source Id',
          key: 'metadata.sourceId',
        },
        {
          label: 'Source',
          key: 'metadata.source',
        },
      ],
    },
  },
];
