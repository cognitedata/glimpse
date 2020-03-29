import { AggregateDatapoint } from 'components/widgets/timeSeries/interfaces';

export const mockDataPoints: AggregateDatapoint[] = [
  {
    timestamp: 1582542555000,
    average: 1.9993962070618092,
  },
  {
    timestamp: 1582542565000,
    average: 2.251300872503496,
  },
  {
    timestamp: 1582542575000,
    average: 2.308454160740564,
  },
  {
    timestamp: 1582542585000,
    average: 2.3908429775778246,
  },
  {
    timestamp: 1582542595000,
    average: 3.5752881496553113,
  },
  {
    timestamp: 1582542606000,
    average: 3.7296878180889785,
  },
  {
    timestamp: 1582542616000,
    average: 4.368494836655782,
  },
  {
    timestamp: 1582542626000,
    average: 4.216852441711497,
  },
  {
    timestamp: 1582542636000,
    average: 3.627915441077067,
  },
  {
    timestamp: 1582542646000,
    average: 3.647231689064748,
  },
  {
    timestamp: 1582542656000,
    average: 4.568130702815173,
  },
  {
    timestamp: 1582542667000,
    average: 4.433428809801909,
  },
  {
    timestamp: 1582542677000,
    average: 3.8698824529128864,
  },
  {
    timestamp: 1582542687000,
    average: 4.6249878691209325,
  },
  {
    timestamp: 1582542697000,
    average: 5.253949028624634,
  },
  {
    timestamp: 1582542707000,
    average: 4.399262381641634,
  },
  {
    timestamp: 1582542717000,
    average: 5.335649501978207,
  },
  {
    timestamp: 1582542727000,
    average: 4.57192536128946,
  },
];

export const timeSeriesWideNumericMockProps = [
  {
    title: `24 Hour Utilization`,
    data: mockDataPoints,
  },
  {
    title: `24 Hour Utilization`,
    data: mockDataPoints,
    width: 100,
    height: 100,
  },
];
