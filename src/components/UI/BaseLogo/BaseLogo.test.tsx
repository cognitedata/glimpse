import React from 'react';
import BaseLogo from './BaseLogo';
import { render } from '@testing-library/react';

test('logo loaded successfully ', async () => {
  const { getByAltText } = render(<BaseLogo />);
  expect(getByAltText('Base Logo')).toBeInTheDocument();
});
