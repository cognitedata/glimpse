// Copyright 2020 Cognite AS
import { MESSAGES } from 'constants/messages';
import { AlarmFetchConfig } from 'components/Alarm/Configurator/interfaces';

import { getRemovedAlarmIds } from 'store/service';
import {
  getAlarmConfig,
  saveAlarmConfig,
} from './alarmConfRepo/alarmConfFSRepo';

/**
 *
 * This method is used to get alarm configurations
 */
export const getAlarmConfigurations = async (onError?: Function) => {
  try {
    const alarmConfig = await getAlarmConfig();
    return alarmConfig;
  } catch (error) {
    if (onError) {
      onError(MESSAGES.ALARM_CONFIG_FETCH_ERROR);
      return {};
    }
    throw error;
  }
};

/**
 *
 * This method is used to get alarm fetch configurations from alarm configurations
 */
export const getAlarmFetchConfig = async (onError?: Function) => {
  try {
    const alarmConfig = await getAlarmConfig();
    return alarmConfig.alarmFetchConfig ? alarmConfig.alarmFetchConfig : {};
  } catch (error) {
    if (onError) {
      onError(MESSAGES.ALARM_CONFIG_FETCH_ERROR);
      return {};
    }
    throw error;
  }
};

/**
 *
 * This method is used to save alarm fetch config in alarm configurations
 */
export const saveAlarmFetchConfig = async (
  alarmFetchConfig: AlarmFetchConfig,
  onError: Function
) => {
  try {
    await saveAlarmConfig({ alarmFetchConfig });
    return true;
  } catch (error) {
    onError(MESSAGES.ALARM_CONFIG_SAVE_ERROR);
    return false;
  }
};

/**
 *
 * This method is used to persist removed alarm ids
 */
export const persistRemovedAlarmIds = async () => {
  const removedAlarmsIds = getRemovedAlarmIds();
  await saveAlarmConfig({ removedAlarmsIds });
};
