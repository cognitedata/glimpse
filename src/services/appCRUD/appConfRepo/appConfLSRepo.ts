// Copyright 2020 Cognite AS

import { APP_NAME } from 'constants/appData';
import { MachineConfig } from './interfaces';

/**
 * This is used to persist app conf data in the local storage (for developing purposes)
 */
const MACHINE_CONFIG_DOC = `${APP_NAME}_MACHINE_CONFIG_DOC`;

/**
 * This method is used to get machine configurations from localstorage
 */
export const getMachineConfig = async (): Promise<MachineConfig> => {
  const savedMachineConfigStr = localStorage.getItem(MACHINE_CONFIG_DOC);
  return savedMachineConfigStr ? JSON.parse(savedMachineConfigStr) : {};
};

/**
 * This method is used to save machine configurations in localstorage
 */
export const saveMachineConfig = async (machineConfig: MachineConfig) => {
  const savedMachineConfigStr = localStorage.getItem(MACHINE_CONFIG_DOC);
  const savedMachineConfig = savedMachineConfigStr
    ? JSON.parse(savedMachineConfigStr)
    : {};
  const newMachineConfig = { ...savedMachineConfig, ...machineConfig };
  localStorage.setItem(MACHINE_CONFIG_DOC, JSON.stringify(newMachineConfig));
};
