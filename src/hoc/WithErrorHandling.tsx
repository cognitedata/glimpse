import React, { useContext } from 'react';
import { AppContext } from '../context/AppContextManager';
// import { makeStyles, Theme } from '@material-ui/core/styles';

import Alerts from '../components/UI/Alerts/Alerts';
import BaseLogo from '../components/BaseLogo/BaseLogo';

// const useStyles = makeStyles((theme: Theme) => ({
//   root: {
//     width: '100%',
//     '& > * + *': {
//       marginTop: theme.spacing(2),
//     },
//   },
// }));

const WithErrorHandling = (WrappedComponet: any) => {
  const WithErrorHandlingComponent = () => {
    const appContext: any = useContext(AppContext);

    return (
      <div>
        {appContext.alerts.hideApp ? <BaseLogo /> : <WrappedComponet />}
        <Alerts {...appContext.alerts} />
      </div>
    );
  };
  return WithErrorHandlingComponent;
};

export default WithErrorHandling;
