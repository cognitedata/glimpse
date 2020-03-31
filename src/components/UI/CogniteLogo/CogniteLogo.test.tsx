// Copyright 2020 Cognite AS
import React from 'react';
import { render } from '@testing-library/react';
import CogniteLogo from './CogniteLogo';

test('cognite logo loaded successfully ', async () => {
  const { getByAltText } = render(<CogniteLogo />);
  expect(getByAltText('Cognite Logo')).toBeInTheDocument();
});

test('should set width if provided ', async () => {
  const width = '10px';
  const { getByAltText } = render(<CogniteLogo width={width} />);
  expect(getByAltText('Cognite Logo').style.width).toEqual(width);
});
