// Copyright 2020 Cognite AS
import React from 'react';
import { render } from '@testing-library/react';
import { showFieldsMockProps } from 'mocks/widgetsMockData/showFieldsMock';
import ShowFieldsOne from './ShowFieldsOne';

describe('ShowField', () => {
  it('should render field correctly', () => {
    const { getByText } = render(
      <ShowFieldsOne field1={showFieldsMockProps[0]} />
    );
    expect(getByText(showFieldsMockProps[0].field)).toBeInTheDocument();
  });

  it('should render value correctly', () => {
    const { getByText } = render(
      <ShowFieldsOne field1={showFieldsMockProps[0]} />
    );
    expect(getByText(showFieldsMockProps[0].value)).toBeInTheDocument();
  });
});
