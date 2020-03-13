import React from 'react';
import AppContainer from './containers/AppContainer/AppContainer';
import { AppContextProvider } from './context/AppContextManager';

const App = () => (
  <AppContextProvider>
    <AppContainer />
  </AppContextProvider>
);

export default App;
