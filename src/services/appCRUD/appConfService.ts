// Copyright 2020 Cognite AS
import { MESSAGES } from 'constants/messages';
import {
  getMachineConfig,
  saveMachineConfig,
} from './appConfRepo/appConfFSRepo';

/**
 *
 * This method is used to get machine ids from machine configurations
 */
export const getMachineIds = async (onError?: Function) => {
  try {
    const machineConfig = await getMachineConfig();
    return machineConfig.machineIds ? machineConfig.machineIds : '';
  } catch (error) {
    if (onError) {
      onError(MESSAGES.MACHINE_CONFIG_FETCH_ERROR);
      return '';
    }
    throw error;
  }
};

/**
 *
 * This method is used to save machine ids in machine configurations
 */
export const saveMachineIds = async (machineIds: string, onError: Function) => {
  try {
    await saveMachineConfig({ machineIds });
    return true;
  } catch (error) {
    onError(MESSAGES.MACHINE_CONFIG_SAVE_ERROR);
    return false;
  }
};
