// Copyright 2020 Cognite AS
import React from 'react';
import { render } from '@testing-library/react';
import { AlertsPropsType } from 'custom-types';
import Alerts from './Alerts';

const alertProp: AlertsPropsType = {
  type: 'error',
  text: 'Test message',
  handleClose: jest.fn(),
};

test('logo loaded successfully ', async () => {
  const { getByText } = render(<Alerts {...alertProp} />);
  expect(getByText('Test message')).toBeInTheDocument();
});
