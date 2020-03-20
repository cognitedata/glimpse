import { ComponentDetail } from 'components/grid/interfaces';
import { Layout } from 'react-grid-layout';
import { timeSeriesWideNumericMockProps } from 'mocks/widgetsMockData/TimeSeriesWideNumericMock';

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
    compName: 'showFieldsOne',
    props: {
      field1: {
        field: 'Current Machine',
        value: 'Machine 1',
      },
    },
  },
  {
    i: 'b',
    compName: 'toolWidget',
    props: {
      field: 'description    84mm',
      value: '5733-123',
      name: 'Tool Id',
    },
  },
  {
    i: 'c',
    compName: 'shiftUtilization',
    props: {
      title: 'Shift Utilization',
      timeDisplayKey: 'Elapsed Time - Job',
      time: '33:58:18',
      precentage: 30,
    },
  },
  { i: 'd', compName: 'a' },
  { i: 'e', compName: 'a' },
  {
    i: 'f',
    compName: 'showFieldsThree',
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
    compName: 'showFieldsFour',
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
  { i: 'h', compName: 'a' },
  {
    i: 'i',
    compName: 'timeSeriesWideNumeric',
    props: timeSeriesWideNumericMockProps[0],
  },
];
