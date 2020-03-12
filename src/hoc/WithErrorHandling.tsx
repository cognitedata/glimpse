import React, { useContext } from 'react';
import { AppContext, AppContextType } from '../context/AppContextManager';
// import { makeStyles, Theme } from '@material-ui/core/styles';

import Alerts from '../components/UI/Alerts/Alerts';
import BaseLogo from '../components/UI/BaseLogo/BaseLogo';

// const useStyles = makeStyles((theme: Theme) => ({
//   root: {
//     width: '100%',
//     '& > * + *': {
//       marginTop: theme.spacing(2),
//     },
//   },
// }));

const withErrorHandling = (WrappedComponet: React.ComponentType) => {
  const WithErrorHandlingComponent = () => {
    const appContext = useContext<AppContextType>(AppContext);
    return (
      <div>
        {appContext.alerts && appContext.alerts.hideApp ? (
          <BaseLogo />
        ) : (
          <WrappedComponet />
        )}
        {appContext.alerts && <Alerts {...appContext.alerts} />}
      </div>
    );
  };
  return WithErrorHandlingComponent;
};

export default withErrorHandling;
