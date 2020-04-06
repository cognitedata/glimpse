// Copyright 2020 Cognite AS
import { TSBasicNumericMockProps } from './tsBasicMock';
import { mockDataPoints } from './tsWideNumericMock';

export const TSTallNumericMockProps = [
  {
    ...TSBasicNumericMockProps,
    title: '24 Hour Utilization',
    data: mockDataPoints,
    width: '100%',
    height: '80%',
  },
  {
    ...TSBasicNumericMockProps,
    title: '24 Hour Utilization',
    data: mockDataPoints,
    width: 100,
    height: 80,
  },
];
