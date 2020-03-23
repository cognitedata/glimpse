import React from 'react';
import { render } from '@testing-library/react';
import { TSTallNumericMockProps } from 'mocks/widgetsMockData/TSTallNumericMock';
import TSTallNumeric from './TSTallNumeric';

describe('TSWideNumeric', () => {
  it('should render name value and unit correctly', () => {
    const { getByText } = render(
      <TSTallNumeric {...TSTallNumericMockProps[0]} />
    );
    expect(getByText(TSTallNumericMockProps[0].name)).toBeInTheDocument();
    expect(
      getByText(TSTallNumericMockProps[0].value.toString())
    ).toBeInTheDocument();
    expect(getByText(TSTallNumericMockProps[0].unit)).toBeInTheDocument();
  });

  it('should render chart', async () => {
    const { container } = render(
      <TSTallNumeric {...TSTallNumericMockProps[1]} />
    );
    expect(container.querySelector('.recharts-area-curve')).toBeInTheDocument();
  });
});
