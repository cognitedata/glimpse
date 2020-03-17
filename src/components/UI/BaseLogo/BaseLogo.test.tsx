import React from 'react';
import { render } from '@testing-library/react';
import BaseLogo from './BaseLogo';

test('logo loaded successfully ', async () => {
  const { getByAltText } = render(<BaseLogo />);
  expect(getByAltText('Base Logo')).toBeInTheDocument();
});
