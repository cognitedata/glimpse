import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';

const Alerts = (props: any) => {
  const Alert = (alertProps: AlertProps) => (
    <MuiAlert elevation={6} variant="filled" {...alertProps} />
  );
  return (
    <Snackbar
      open={props.open}
      autoHideDuration={props.duration}
      onClose={props.handleClose}
    >
      <Alert onClose={props.handleClose} severity={props.type}>
        {props.text}
      </Alert>
    </Snackbar>
  );
};

export default Alerts;
