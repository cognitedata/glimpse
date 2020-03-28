import { AggregateDatapoint } from 'components/widgets/timeSeries/interfaces';

export const dataPoints: AggregateDatapoint[] = [
  { timestamp: 1, average: 1 },
  { timestamp: 2, average: 40 },
  { timestamp: 3, average: 2 },
  { timestamp: 4, average: 40 },
  { timestamp: 5, average: 31 },
  { timestamp: 6, average: 40 },
  { timestamp: 7, average: 15 },
  { timestamp: 8, average: 20 },
  { timestamp: 9, average: 40 },
  { timestamp: 10, average: 23 },
  { timestamp: 11, average: 5 },
  { timestamp: 12, average: 16 },
  { timestamp: 13, average: 40 },
  { timestamp: 14, average: 20 },
  { timestamp: 15, average: 12 },
  { timestamp: 16, average: 2 },
  { timestamp: 17, average: 7 },
  { timestamp: 18, average: 15 },
  { timestamp: 19, average: 11 },
  { timestamp: 20, average: 38 },
  { timestamp: 21, average: 8 },
  { timestamp: 22, average: 25 },
  { timestamp: 23, average: 70 },
  { timestamp: 24, average: 80 },
];

export const timeSeriesWideNumericMockProps = [
  {
    title: `24 Hour Utilization`,
    data: dataPoints,
  },
  {
    title: `24 Hour Utilization`,
    data: dataPoints,
    width: 100,
    height: 100,
  },
];
