// Copyright 2020 Cognite AS
import React, { FC } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, { AlertProps, Color } from '@material-ui/lab/Alert';

export type SnackBarProps = {
  duration?: number;
  handleClose: () => void;
  type: Color;
  text: String;
};

/**
 * Global alerts component
 */
const Alerts: FC<SnackBarProps> = ({
  duration = 10000,
  handleClose,
  type,
  text,
}: SnackBarProps) => {
  const Alert = (alertProps: AlertProps) => (
    <MuiAlert elevation={6} variant="filled" {...alertProps} />
  );
  return (
    <Snackbar open autoHideDuration={duration} onClose={handleClose}>
      <Alert onClose={handleClose} severity={type}>
        {text}
      </Alert>
    </Snackbar>
  );
};

export default Alerts;
