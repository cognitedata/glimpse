import { TSBasicNumericMockProps } from './tsBasicMock';

export const dataPoints = [
  { xValue: '1', yValue: 1 },
  { xValue: '2', yValue: 40 },
  { xValue: '3', yValue: 2 },
  { xValue: '4', yValue: 40 },
  { xValue: '5', yValue: 31 },
  { xValue: '6', yValue: 40 },
  { xValue: '7', yValue: 15 },
  { xValue: '8', yValue: 20 },
  { xValue: '9', yValue: 40 },
  { xValue: '10', yValue: 23 },
  { xValue: '11', yValue: 5 },
  { xValue: '12', yValue: 16 },
  { xValue: '13', yValue: 40 },
  { xValue: '14', yValue: 20 },
  { xValue: '15', yValue: 12 },
  { xValue: '16', yValue: 2 },
  { xValue: '17', yValue: 7 },
  { xValue: '18', yValue: 15 },
  { xValue: '19', yValue: 11 },
  { xValue: '20', yValue: 38 },
  { xValue: '21', yValue: 8 },
  { xValue: '22', yValue: 25 },
  { xValue: '23', yValue: 80 },
];

export const TSTallNumericMockProps = [
  {
    ...TSBasicNumericMockProps,
    title: '24 Hour Utilization',
    data: dataPoints,
    width: '100%',
    height: '80%',
  },
  {
    ...TSBasicNumericMockProps,
    title: '24 Hour Utilization',
    data: dataPoints,
    width: 100,
    height: 80,
  },
];
