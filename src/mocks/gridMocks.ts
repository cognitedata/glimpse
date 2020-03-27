import { ComponentDetail } from 'components/grid/interfaces';
import { Layout } from 'react-grid-layout';
import { timeSeriesWideNumericMockProps } from 'mocks/widgetsMockData/tsWideNumericMock';
import { Widget } from 'constants/components';
import { TSTallNumericMockProps } from './widgetsMockData/tsTallNumericMock';
import { TSFancyNumericMockProps } from './widgetsMockData/circularProgressMock';
import { TSBasicStringMockProps } from './widgetsMockData/tsBasicMock';

export const initialLayoutMocked: Layout[] = [
  { i: 'a', x: 0, y: 0, w: 1, h: 1 },
  { i: 'b', x: 0, y: 1, w: 1, h: 1 },
  { i: 'c', x: 0, y: 2, w: 1, h: 2 },
  { i: 'd', x: 0, y: 4, w: 1, h: 1, static: true },
  { i: 'e', x: 0, y: 5, w: 1, h: 1 },
  { i: 'f', x: 1, y: 0, w: 1, h: 2 },
  { i: 'g', x: 2, y: 0, w: 1, h: 3 },
  { i: 'h', x: 3, y: 0, w: 1, h: 4 },
  { i: 'i', x: 1, y: 4, w: 3, h: 2 },
];

export const initialcomponentsMocked: ComponentDetail[] = [
  {
    i: 'a',
    compName: Widget.SHOWFIELDSONE,
    props: {
      field1: {
        field: 'Current Machine',
        value: 'Machine 2',
      },
    },
  },
  {
    i: 'b',
    compName: Widget.TOOLWIDGET,
    props: {
      field: 'description    84mm',
      value: '5733-123',
      name: 'Tool Id',
    },
  },
  {
    i: 'c',
    compName: Widget.TSFANCYNUMERIC,
    props: TSFancyNumericMockProps[0],
  },
  {
    i: 'd',
    compName: Widget.TSBASICSTRING,
    props: TSBasicStringMockProps[0],
  },
  {
    i: 'e',
    compName: Widget.TSBASICNUMERIC,
    props: {
      name: 'Machine Temperature',
      value: 89,
      unit: '°C ',
    },
  },
  {
    i: 'f',
    compName: Widget.SHOWFIELDSTHREE,
    props: {
      field1: {
        field: 'Work Order',
        value: '573367 - 30',
      },
      field2: {
        field: 'Part Name',
        value: 'Dart',
      },
      field3: {
        field: 'Customer',
        value: 'Petroleum Technolgy Company',
      },
    },
  },
  {
    i: 'g',
    compName: Widget.SHOWFIELDSFOUR,
    props: {
      field1: {
        field: 'Work Order',
        value: '573367 - 60',
      },
      field2: {
        field: 'Operation Name',
        value: 'Vigre ingvald',
      },
      field3: {
        field: 'Part Name',
        value: '5.5" SPM SWAGE',
      },
      field4: {
        field: 'Customer',
        value: 'Petroleum Technolgy Company',
      },
    },
  },
  { i: 'h', compName: Widget.TSTALLNUMERIC, props: TSTallNumericMockProps[0] },
  {
    i: 'i',
    compName: Widget.TSWIDENUMERIC,
    props: timeSeriesWideNumericMockProps[0],
  },
];
