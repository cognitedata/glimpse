import React from 'react';
import { render } from '@testing-library/react';
import Alerts, { AlertsPropsType } from './Alerts';

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
