// Copyright 2020 Cognite AS
import React from 'react';
import { render } from '@testing-library/react';
import { Color } from '@material-ui/lab/Alert';
import Alerts from './Alerts';

const type: Color = 'error';

const alertProp = {
  type,
  text: 'Test message',
  handleClose: jest.fn(),
};

test('logo loaded successfully ', async () => {
  const { getByText } = render(<Alerts {...alertProp} />);
  expect(getByText('Test message')).toBeInTheDocument();
});
