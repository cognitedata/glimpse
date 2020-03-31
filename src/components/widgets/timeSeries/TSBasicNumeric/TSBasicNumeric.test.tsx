// Copyright 2020 Cognite AS
import React from 'react';
import { render } from '@testing-library/react';
import { TSBasicNumericMockProps } from 'mocks/widgetsMockData/tsBasicMock';
import TSBasicString from './TSBasicNumeric';

describe('TSBasicString', () => {
  it('should render name value and unit correctly', () => {
    const { getByText } = render(
      <TSBasicString {...TSBasicNumericMockProps} />
    );
    expect(getByText(TSBasicNumericMockProps.name)).toBeInTheDocument();
    expect(
      getByText(TSBasicNumericMockProps.value.toString())
    ).toBeInTheDocument();
    expect(getByText(TSBasicNumericMockProps.unit)).toBeInTheDocument();
  });
});
