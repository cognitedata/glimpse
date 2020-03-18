import React from 'react';
import { render } from '@testing-library/react';
import { showFieldsMockProps } from 'mocks/widgetsMockData/showFieldsMock';
import ShowFieldsThree from './ShowFieldsThree';

describe('ShowField', () => {
  it('should render fields correctly', () => {
    const { getByText } = render(
      <ShowFieldsThree
        field1={showFieldsMockProps[0]}
        field2={showFieldsMockProps[1]}
        field3={showFieldsMockProps[2]}
      />
    );
    expect(getByText(showFieldsMockProps[0].field)).toBeInTheDocument();
    expect(getByText(showFieldsMockProps[1].field)).toBeInTheDocument();
    expect(getByText(showFieldsMockProps[2].field)).toBeInTheDocument();
  });

  it('should render values correctly', () => {
    const { getByText } = render(
      <ShowFieldsThree
        field1={showFieldsMockProps[0]}
        field2={showFieldsMockProps[1]}
        field3={showFieldsMockProps[2]}
      />
    );
    expect(getByText(showFieldsMockProps[0].value)).toBeInTheDocument();
    expect(getByText(showFieldsMockProps[1].value)).toBeInTheDocument();
    expect(getByText(showFieldsMockProps[2].value)).toBeInTheDocument();
  });
});
