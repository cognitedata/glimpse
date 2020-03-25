declare module 'custom-types' {
  import { Color } from '@material-ui/lab/Alert';

  export type Capability = {
    [key: string]: {
      actions: string[];
    };
  };

  export type AlertsPropsType = {
    hideApp?: boolean;
    duration?: number;
    handleClose?: () => void | undefined;
    type: Color;
    text: string;
  };

  export type UserInfo = {
    name: string;
    admin: boolean;
  };
}
