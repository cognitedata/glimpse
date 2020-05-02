// Copyright 2020 Cognite AS

/**
 * This is used to persist data in the firebase
 */
import { MACHINE_CONFIG_DOC } from 'constants/firebase';
import { appConfDoc } from '../../../firebase';
import { MachineConfig } from './interfaces';

/**
 * This method is used to get machine configurations from firbase
 */
export const getMachineConfig = async (): Promise<MachineConfig> => {
  const machineConfDoc = await appConfDoc(MACHINE_CONFIG_DOC).get();
  return machineConfDoc.exists ? machineConfDoc.data() : {};
};

/**
 * This method is used to save machine configurations in firbase
 */
export const saveMachineConfig = async (machineConfig: MachineConfig) => {
  const machineConfDoc = await appConfDoc(MACHINE_CONFIG_DOC).get();
  if (machineConfDoc.exists) {
    const newMachineConfig = { ...machineConfDoc.data(), ...machineConfig };
    await appConfDoc(MACHINE_CONFIG_DOC).update(newMachineConfig);
  } else {
    await appConfDoc(MACHINE_CONFIG_DOC).set(machineConfig);
  }
};
