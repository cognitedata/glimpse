import React from 'react';
import { render } from '@testing-library/react';
import { showFieldsMockProps } from 'mocks/widgetsMockData/showFieldsMock';
import ShowFieldsFour from './ShowFieldsFour';

describe('ShowField', () => {
  it('should render fields correctly', () => {
    const { getByText } = render(
      <ShowFieldsFour
        field1={showFieldsMockProps[0]}
        field2={showFieldsMockProps[1]}
        field3={showFieldsMockProps[2]}
        field4={showFieldsMockProps[3]}
      />
    );
    for (let i = 0; i < 4; i++) {
      expect(getByText(showFieldsMockProps[i].field)).toBeInTheDocument();
    }
  });

  it('should render values correctly', () => {
    const { getByText } = render(
      <ShowFieldsFour
        field1={showFieldsMockProps[0]}
        field2={showFieldsMockProps[1]}
        field3={showFieldsMockProps[2]}
        field4={showFieldsMockProps[3]}
      />
    );
    for (let i = 0; i < 4; i++) {
      expect(getByText(showFieldsMockProps[i].value)).toBeInTheDocument();
    }
  });
});
