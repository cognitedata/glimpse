import React from 'react';
import { render } from '@testing-library/react';
import { circularProgressMockProps } from 'mocks/widgetsMockData/circularProgressMock';
import { CircularProgress } from './TSFancyNumeric';

describe('CircularProgress', () => {
  it('should render progress precentage correctly', () => {
    const { getByText } = render(
      <CircularProgress {...circularProgressMockProps[0]} />
    );
    expect(
      getByText(`${circularProgressMockProps[0].precentage.toString()}%`)
    ).toBeInTheDocument();
  });

  it('should render title correctly', () => {
    const { getByText } = render(
      <CircularProgress {...circularProgressMockProps[0]} />
    );
    expect(getByText(circularProgressMockProps[0].title)).toBeInTheDocument();
  });

  it('should render timeDisplayKey correctly', () => {
    const { getByText } = render(
      <CircularProgress {...circularProgressMockProps[0]} />
    );
    expect(
      getByText(new RegExp(circularProgressMockProps[0].timeDisplayKey))
    ).toBeInTheDocument();
  });

  it('should render time correctly', () => {
    const { getByText } = render(
      <CircularProgress {...circularProgressMockProps[0]} />
    );
    expect(
      getByText(new RegExp(circularProgressMockProps[0].time))
    ).toBeInTheDocument();
  });

  it('should update props correctly', () => {
    const { getByText, rerender } = render(
      <CircularProgress {...circularProgressMockProps[0]} />
    );
    expect(
      getByText(
        new RegExp(`${circularProgressMockProps[0].precentage.toString()}%`)
      )
    ).toBeInTheDocument();
    rerender(<CircularProgress {...circularProgressMockProps[1]} />);
    expect(
      getByText(
        new RegExp(`${circularProgressMockProps[1].precentage.toString()}`)
      )
    ).toBeInTheDocument();
    expect(
      getByText(new RegExp(circularProgressMockProps[1].time))
    ).toBeInTheDocument();
  });
});
