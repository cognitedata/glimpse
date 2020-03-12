import React from 'react';
import Logo from './Logo';
import { render } from '@testing-library/react';

test('logo loaded successfully ', async () => {
  const { getByAltText } = render(<Logo />);
  expect(getByAltText('Aarbakke Logo')).toBeInTheDocument();
});

test('should hide logo ', async () => {
  const { queryByAltText } = render(<Logo hide={true} />);
  expect(queryByAltText('Aarbakke Logo')).toBeNull();
});
