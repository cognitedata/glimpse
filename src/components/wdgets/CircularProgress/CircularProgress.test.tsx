import React from 'react';
import { render } from '@testing-library/react';
import { CircularProgressMockProps } from 'mocks/widgetsMockData/CircularProgressMock';
import { CircularProgress } from './CircularProgress';

describe('CircularProgress', () => {
  it('should render progress precentage correctly', () => {
    const { getByText } = render(
      <CircularProgress {...CircularProgressMockProps[0]} />
    );
    expect(
      getByText(`${CircularProgressMockProps[0].precentage.toString()}%`)
    ).toBeInTheDocument();
  });

  it('should render title correctly', () => {
    const { getByText } = render(
      <CircularProgress {...CircularProgressMockProps[0]} />
    );
    expect(getByText(CircularProgressMockProps[0].title)).toBeInTheDocument();
  });

  it('should render timeDisplayKey correctly', () => {
    const { getByText } = render(
      <CircularProgress {...CircularProgressMockProps[0]} />
    );
    expect(
      getByText(new RegExp(CircularProgressMockProps[0].timeDisplayKey))
    ).toBeInTheDocument();
  });

  it('should render time correctly', () => {
    const { getByText } = render(
      <CircularProgress {...CircularProgressMockProps[0]} />
    );
    expect(
      getByText(new RegExp(CircularProgressMockProps[0].time))
    ).toBeInTheDocument();
  });

  it('should update props correctly', () => {
    const { getByText, rerender } = render(
      <CircularProgress {...CircularProgressMockProps[0]} />
    );
    expect(
      getByText(
        new RegExp(`${CircularProgressMockProps[0].precentage.toString()}%`)
      )
    ).toBeInTheDocument();
    rerender(<CircularProgress {...CircularProgressMockProps[1]} />);
    expect(
      getByText(
        new RegExp(`${CircularProgressMockProps[1].precentage.toString()}`)
      )
    ).toBeInTheDocument();
    expect(
      getByText(new RegExp(CircularProgressMockProps[1].time))
    ).toBeInTheDocument();
  });
});
