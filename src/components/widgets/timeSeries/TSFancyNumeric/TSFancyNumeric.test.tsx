// Copyright 2020 Cognite AS
import React from 'react';
import { render } from '@testing-library/react';
import { TSFancyNumericMockProps } from 'mocks/widgetsMockData/circularProgressMock';
import { TSFancyNumeric } from './TSFancyNumeric';

describe('CircularProgress', () => {
  it('should render progress precentage correctly', () => {
    const { getByText } = render(
      <TSFancyNumeric {...TSFancyNumericMockProps[0]} />
    );
    expect(
      getByText(`${TSFancyNumericMockProps[0].precentage.toString()}%`)
    ).toBeInTheDocument();
  });

  it('should render title correctly', () => {
    const { getAllByText } = render(
      <TSFancyNumeric {...TSFancyNumericMockProps[0]} />
    );
    expect(
      getAllByText(TSFancyNumericMockProps[0].title).length
    ).toBeGreaterThan(0);
  });

  it('should render timeDisplayKey correctly', () => {
    const { getByText } = render(
      <TSFancyNumeric {...TSFancyNumericMockProps[0]} />
    );
    expect(
      getByText(new RegExp(TSFancyNumericMockProps[0].timeDisplayKey))
    ).toBeInTheDocument();
  });

  it('should update props correctly', () => {
    const { getByText, rerender } = render(
      <TSFancyNumeric {...TSFancyNumericMockProps[0]} />
    );
    expect(
      getByText(
        new RegExp(`${TSFancyNumericMockProps[0].precentage.toString()}%`)
      )
    ).toBeInTheDocument();
    rerender(<TSFancyNumeric {...TSFancyNumericMockProps[1]} />);
    expect(
      getByText(
        new RegExp(`${TSFancyNumericMockProps[1].precentage.toString()}`)
      )
    ).toBeInTheDocument();
  });
});
