import React from 'react';
import { render } from '@testing-library/react';
import { showFieldsMockProps } from 'mocks/widgetsMockData/showFieldsMock';
import ShowField from './ShowField';

describe('ShowField', () => {
  it('should render field correctly', () => {
    const { getByText } = render(<ShowField {...showFieldsMockProps[0]} />);
    expect(getByText(showFieldsMockProps[0].field)).toBeInTheDocument();
  });

  it('should render value correctly', () => {
    const { getByText } = render(<ShowField {...showFieldsMockProps[0]} />);
    expect(getByText(showFieldsMockProps[0].value)).toBeInTheDocument();
  });

  it('should update props correctly', () => {
    const { getByText, rerender } = render(
      <ShowField {...showFieldsMockProps[0]} />
    );
    expect(getByText(showFieldsMockProps[0].field)).toBeInTheDocument();
    rerender(<ShowField {...showFieldsMockProps[1]} />);
    expect(getByText(showFieldsMockProps[1].field)).toBeInTheDocument();
    expect(getByText(showFieldsMockProps[1].value)).toBeInTheDocument();
  });
});
