import React from 'react';
import { render } from '@testing-library/react';
import withErrorHandling from '../WithErrorHandling';
import { AppContext, defaultContextObj } from '../../context/AppContextManager';
import { AlertsPropsType } from '../../components/UI/Alerts/Alerts';

test('Render alert successfully ', async () => {
  const Home = () => <div>Home Component</div>;
  const WrappedComponent = withErrorHandling(Home);
  const alerts: AlertsPropsType = {
    type: 'error',
    text: 'Alert Test',
    duration: 10000,
    hideApp: false,
  };
  const mockContext = {
    ...defaultContextObj,
    alerts,
  };
  const { getByText, container } = render(
    <AppContext.Provider value={mockContext}>
      <WrappedComponent />
    </AppContext.Provider>
  );
  expect(getByText('Alert Test')).toBeInTheDocument();
});
