import React from 'react';
import { render } from '@testing-library/react';
import { TSBasicStringMockProps } from 'mocks/widgetsMockData/tSBasicStringMock';
import TSBasicString from './TSBasicString';

describe('TSBasicString', () => {
  it('should render name value and elapsed time correctly', () => {
    const { getByText } = render(
      <TSBasicString {...TSBasicStringMockProps[0]} />
    );
    expect(getByText(TSBasicStringMockProps[0].name)).toBeInTheDocument();
    expect(getByText(TSBasicStringMockProps[0].value)).toBeInTheDocument();
    expect(
      getByText(TSBasicStringMockProps[0].elapsedTime)
    ).toBeInTheDocument();
  });

  it('should render name value when elapsed time disabled', () => {
    const { queryByText } = render(
      <TSBasicString {...TSBasicStringMockProps[1]} />
    );
    expect(queryByText(TSBasicStringMockProps[1].name)).toBeInTheDocument();
    expect(queryByText(TSBasicStringMockProps[1].value)).toBeInTheDocument();
    expect(
      queryByText(TSBasicStringMockProps[0].elapsedTime)
    ).not.toBeInTheDocument();
  });
});
