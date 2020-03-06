import React, { useState } from 'react';
import { Asset } from '@cognite/sdk';

export const AppContext = React.createContext({});

export const AppContextProvider = (props: any) => {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [selectedMachine, setSelectedMachine] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [adminUser, setAdminUser] = useState(false);
  const [userCapabilities, setUserCapabilities] = useState([]);
  const [alerts, setAlerts] = useState({});
  const [logout, setLogout] = useState();

  const contextObj = {
    assets,
    setAssets,
    selectedMachine,
    setSelectedMachine,
    loggedIn,
    setLoggedIn,
    loading,
    setLoading,
    adminUser,
    setAdminUser,
    userCapabilities,
    setUserCapabilities,
    alerts,
    setAlerts,
    logout,
    setLogout,
  };

  return (
    <AppContext.Provider value={contextObj}>
      {props.children}
    </AppContext.Provider>
  );
};
