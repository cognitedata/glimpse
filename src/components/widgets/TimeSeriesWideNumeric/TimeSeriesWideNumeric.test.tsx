import React from 'react';
import { render, wait, waitForElement } from '@testing-library/react';
import { timeSeriesWideNumericMockProps } from 'mocks/widgetsMockData/TimeSeriesWideNumericMock';
import TimeSeriesWideNumeric from './TimeSeriesWideNumeric';

describe('timeSeriesWideNumeric', () => {
  it('should render title correctly', () => {
    const { getByText } = render(
      <TimeSeriesWideNumeric {...timeSeriesWideNumericMockProps[1]} />
    );
    expect(
      getByText(timeSeriesWideNumericMockProps[1].title)
    ).toBeInTheDocument();
  });

  it('should render chart', async () => {
    const { getByText, container } = render(
      <TimeSeriesWideNumeric {...timeSeriesWideNumericMockProps[1]} />
    );
    expect(container.querySelector('.recharts-area-curve')).toBeInTheDocument();
  });
});
