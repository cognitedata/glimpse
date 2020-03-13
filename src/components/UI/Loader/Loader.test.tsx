import React from 'react';
import { render } from '@testing-library/react';
import Loader from './Loader';

test('loading message is showing successfully ', async () => {
  const { getByText } = render(<Loader />);
  expect(getByText('Please Wait...')).toBeInTheDocument();
});
