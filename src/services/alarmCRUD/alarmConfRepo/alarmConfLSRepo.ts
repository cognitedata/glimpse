// Copyright 2020 Cognite AS

import { APP_NAME } from 'constants/appData';
import { getUserId, getAssetId } from 'store/service';
import { AlarmConfig } from './interfaces';

/**
 * This is used to persist alarm conf data in the local storage (for developing purposes)
 */

const ALARM_CONFIG_LS_DB = `${APP_NAME}_ALARM_CONFIG`;

/**
 * This method is used to get alarm configurations from localstorage
 */
export const getAlarmConfig = async (): Promise<AlarmConfig> => {
  const userId = getUserId();
  const assetId = getAssetId()?.toString();
  if (!userId) {
    throw new Error('User Id is not available!');
  } else if (!assetId) {
    throw new Error('Machine Id is not available!');
  } else {
    const ALARM_CONFIG_DOC = `${ALARM_CONFIG_LS_DB}_${userId}`;
    const savedAlarmConfigStr = localStorage.getItem(ALARM_CONFIG_DOC);
    if (savedAlarmConfigStr) {
      const docData = JSON.parse(savedAlarmConfigStr);
      return docData[assetId] ? docData[assetId] : {};
    }
    return {};
  }
};

/**
 * This method is used to save alarm configurations in localstorage
 */
export const saveAlarmConfig = async (alarmConfig: AlarmConfig) => {
  const userId = getUserId();
  const assetId = getAssetId()?.toString();
  if (!userId) {
    throw new Error('User Id is not available!');
  } else if (!assetId) {
    throw new Error('Machine Id is not available!');
  } else {
    const ALARM_CONFIG_DOC = `${ALARM_CONFIG_LS_DB}_${userId}`;
    const savedAlarmConfigStr = localStorage.getItem(ALARM_CONFIG_DOC);
    if (savedAlarmConfigStr) {
      const docData = savedAlarmConfigStr
        ? JSON.parse(savedAlarmConfigStr)
        : {};
      if (docData.assetId) {
        docData[assetId] = { ...docData[assetId], ...alarmConfig };
      } else {
        docData[assetId] = alarmConfig;
      }
      localStorage.setItem(ALARM_CONFIG_DOC, JSON.stringify(docData));
    } else {
      localStorage.setItem(
        ALARM_CONFIG_DOC,
        JSON.stringify({ [assetId]: alarmConfig })
      );
    }
  }
};
