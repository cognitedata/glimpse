import { ComponentDetail } from 'components/grid/interfaces';
import { Layout } from 'react-grid-layout';

export const initialLayoutMocked: Layout[] = [
  { i: 'a', x: 0, y: 0, w: 1, h: 1 },
  { i: 'b', x: 0, y: 1, w: 1, h: 1 },
  { i: 'c', x: 0, y: 2, w: 1, h: 2 },
  { i: 'd', x: 0, y: 4, w: 1, h: 1, static: true },
  { i: 'e', x: 0, y: 5, w: 1, h: 1 },
  { i: 'f', x: 1, y: 0, w: 1, h: 4 },
  { i: 'g', x: 2, y: 0, w: 1, h: 4 },
  { i: 'h', x: 3, y: 0, w: 1, h: 4 },
  // { i: 'i', x: 1, y: 4, w: 3, h: 2, component: '' },
];

export const initialcomponentsMocked: ComponentDetail[] = [
  { i: 'a', compName: 'a' },
  { i: 'b', compName: 'a' },
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
  { i: 'f', compName: 'a' },
  { i: 'g', compName: 'a' },
  { i: 'h', compName: 'a' },
  // { i: 'i', compName: 'a' },
];
