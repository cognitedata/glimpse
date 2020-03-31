// Copyright 2020 Cognite AS
import React from 'react';
import { render } from '@testing-library/react';
import Logo from './Logo';

test('logo loaded successfully ', async () => {
  const { getByAltText } = render(<Logo />);
  expect(getByAltText('Aarbakke Logo')).toBeInTheDocument();
});

test('should hide logo ', async () => {
  const { queryByAltText } = render(<Logo hide />);
  expect(queryByAltText('Aarbakke Logo')).toBeNull();
});
