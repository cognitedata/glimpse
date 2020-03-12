import React, { useState, FC } from 'react';
import { Asset } from '@cognite/sdk';
import { AlertsPropsType } from '../components/UI/Alerts/Alerts';

const defaultContextObj = {
  assets: [],
  setAssets: () => {},
  setSelectedMachine: () => {},
  loggedIn: false,
  setLoggedIn: () => {},
  loading: false,
  setLoading: () => {},
  adminUser: false,
  setAdminUser: () => {},
  userCapabilities: [],
  setUserCapabilities: () => {},
  setAlerts: (inp?: AlertsPropsType) => {},
  logout: () => {},
  setLogout: () => {},
  setUserInfo: (inp?: UserInfo) => {},
};

export const AppContext = React.createContext<AppContextType>(
  defaultContextObj
);

type Props = {
  children: JSX.Element;
};

// export interface UserInfo extends IdInfo {

// }

type UserInfo = {
  name?: string | undefined;
};

export const AppContextProvider: FC<Props> = ({ children }: Props) => {
  const [adminUser, setAdminUser] = useState(false);
  const [assets, setAssets] = useState<Asset[]>([]);
  const [selectedMachine, setSelectedMachine] = useState<Asset>();
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userCapabilities, setUserCapabilities] = useState<string[]>([]);
  const [alerts, setAlerts] = useState<AlertsPropsType>();
  const [userInfo, setUserInfo] = useState<UserInfo>();
  const [logout, setLogout] = useState<() => void>(() => {});

  const contextObj: AppContextType = {
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
    userInfo,
    setUserInfo,
  };

  return (
    <AppContext.Provider value={contextObj}>{children}</AppContext.Provider>
  );
};

export type AppContextType = {
  assets: Asset[];
  setAssets: (() => void) | React.Dispatch<React.SetStateAction<Asset[]>>;
  selectedMachine?: Asset;
  setSelectedMachine:
    | (() => void)
    | React.Dispatch<React.SetStateAction<Asset | undefined>>;
  loggedIn: boolean;
  setLoggedIn: (() => void) | React.Dispatch<React.SetStateAction<boolean>>;
  loading: boolean;
  setLoading: (() => void) | React.Dispatch<React.SetStateAction<boolean>>;
  adminUser: boolean;
  setAdminUser: (() => void) | React.Dispatch<React.SetStateAction<boolean>>;
  userCapabilities: string[];
  setUserCapabilities:
    | (() => void)
    | React.Dispatch<React.SetStateAction<string[]>>;
  alerts?: AlertsPropsType | undefined;
  setAlerts:
    | ((inp?: AlertsPropsType) => void)
    | React.Dispatch<React.SetStateAction<AlertsPropsType | undefined>>;
  logout: () => void;
  setLogout: (() => void) | React.Dispatch<React.SetStateAction<() => void>>;
  userInfo?: UserInfo | undefined;
  setUserInfo:
    | ((inp?: UserInfo) => void)
    | React.Dispatch<React.SetStateAction<UserInfo | undefined>>;
};
