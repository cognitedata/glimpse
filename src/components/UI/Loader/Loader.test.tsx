import React from 'react';
import Loader from './Loader';
import { render } from '@testing-library/react';

test('loading message is showing successfully ', async () => {
  const { getByText } = render(<Loader />);
  expect(getByText('Please Wait...')).toBeInTheDocument();
});
