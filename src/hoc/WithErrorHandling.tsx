import React, { useContext } from 'react';
import { AppContext, AppContextType } from '../context/AppContextManager';

import Alerts from '../components/UI/Alerts/Alerts';
import BaseLogo from '../components/UI/BaseLogo/BaseLogo';

/**
 * This higher order component is used to populate global alerts. When ever a alert is pushed to appContext,
 * this will populate appropiate alert
 * @prop hideApp
 *            This will hide the current background and show the logo instead
 */

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
