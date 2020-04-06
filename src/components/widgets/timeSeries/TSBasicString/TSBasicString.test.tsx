// Copyright 2020 Cognite AS
import React from 'react';
import { render } from '@testing-library/react';
import { TSBasicStringMockProps } from 'mocks/widgetsMockData/tsBasicMock';
import TSBasicString from './TSBasicString';

describe('TSBasicString', () => {
  it('should render name value and elapsed time correctly', async () => {
    const { getByText, findByText } = render(
      <TSBasicString {...TSBasicStringMockProps[0]} />
    );
    expect(getByText(TSBasicStringMockProps[0].name)).toBeInTheDocument();
    expect(getByText(TSBasicStringMockProps[0].value)).toBeInTheDocument();
    expect(
      await findByText(content => content.startsWith('00:00:'))
    ).toBeInTheDocument();
  });

  it('should render name value when elapsed time disabled', async () => {
    const { queryByText, findByText } = render(
      <TSBasicString {...TSBasicStringMockProps[1]} />
    );
    expect(queryByText(TSBasicStringMockProps[1].name)).toBeInTheDocument();
    expect(queryByText(TSBasicStringMockProps[1].value)).toBeInTheDocument();
    expect(queryByText('00:00:00')).not.toBeInTheDocument();
  });
});
