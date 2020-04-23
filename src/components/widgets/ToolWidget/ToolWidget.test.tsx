// Copyright 2020 Cognite AS
import React from 'react';
import { render } from '@testing-library/react';
import { showFieldsMockProps } from 'mocks/widgetsMockData/showFieldsMock';
import ToolWidget from './ToolWidget';

describe('Tool Widget', () => {
  const name = 'Tool Test Name';
  it('should render props correctly', () => {
    const { getByText } = render(
      <ToolWidget {...showFieldsMockProps[0]} name={name} />
    );
    expect(getByText(name)).toBeInTheDocument();
    expect(getByText(showFieldsMockProps[0].label)).toBeInTheDocument();
    expect(getByText(showFieldsMockProps[0].value)).toBeInTheDocument();
  });
});
