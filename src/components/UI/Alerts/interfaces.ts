// Copyright 2020 Cognite AS

import { Color } from '@material-ui/lab/Alert';

export interface AlertsPropsType {
  hideApp?: boolean;
  duration?: number;
  handleClose?: () => void | undefined;
  type: Color;
  text: string;
}
