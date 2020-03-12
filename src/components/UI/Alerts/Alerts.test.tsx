import React from 'react';
import Alerts, { AlertsPropsType } from './Alerts';
import { render } from '@testing-library/react';

const alertProp: AlertsPropsType = {
  open: true,
  type: 'error',
  text: 'Test message',
  handleClose: jest.fn(),
  duration: 10000,
};

test('logo loaded successfully ', async () => {
  const { getByText } = render(<Alerts {...alertProp} />);
  expect(getByText('Test message')).toBeInTheDocument();
});
