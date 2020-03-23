import { TSBasicNumericMockProps } from './tsBasicMock';
import { dataPoints } from './tsWideNumericMock';

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
