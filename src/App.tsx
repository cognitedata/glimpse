import React from 'react';
import Base from './components/base/Base';
import { AppContextProvider } from './context/AppContextManager';

const App = () => (
  <AppContextProvider>
    <Base />
  </AppContextProvider>
);

export default App;
