import React, { FC } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, { AlertProps, Color } from '@material-ui/lab/Alert';

/**
 * Global alerts component
 */
const Alerts: FC<AlertsPropsType> = ({
  duration,
  handleClose,
  type,
  text,
}: AlertsPropsType) => {
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

export type AlertsPropsType = {
  hideApp?: boolean;
  duration: number;
  handleClose?: () => void;
  type: Color;
  text: string;
};
