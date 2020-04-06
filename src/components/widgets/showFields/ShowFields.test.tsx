// Copyright 2020 Cognite AS
import React from 'react';
import { render } from '@testing-library/react';
import { showFieldsMockProps } from 'mocks/widgetsMockData/showFieldsMock';
import ShowFieldsFour from './ShowFields';

describe('ShowField', () => {
  it('should render fields and valuescorrectly', () => {
    const { getByText } = render(
      <ShowFieldsFour fields={showFieldsMockProps} />
    );
    for (let i = 0; i < 4; i++) {
      expect(getByText(showFieldsMockProps[i].label)).toBeInTheDocument();
      expect(getByText(showFieldsMockProps[i].value)).toBeInTheDocument();
    }
  });
});
