import React from 'react';
import { render } from '@testing-library/react';
import { timeSeriesWideNumericMockProps } from 'mocks/widgetsMockData/tsWideNumericMock';
import TSWideNumeric from './TSWideNumeric';

describe('TSWideNumeric', () => {
  it('should render title correctly', () => {
    const { getByText } = render(
      <TSWideNumeric {...timeSeriesWideNumericMockProps[1]} />
    );
    expect(
      getByText(new RegExp(timeSeriesWideNumericMockProps[1].title))
    ).toBeInTheDocument();
  });

  it('should render chart', async () => {
    const { container } = render(
      <TSWideNumeric {...timeSeriesWideNumericMockProps[1]} />
    );
    expect(container.querySelector('.recharts-area-curve')).toBeInTheDocument();
  });
});
