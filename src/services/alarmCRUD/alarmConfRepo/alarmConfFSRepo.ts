// Copyright 2020 Cognite AS

/**
 * This is used to persist data in the firebase
 */
import { getUserId, getAssetId } from 'store/service';
import { alarmConfDoc } from '../../../firebase';
import { AlarmConfig } from './interfaces';

/**
 * This method is used to get alarm configurations from firbase
 */
export const getAlarmConfig = async (): Promise<AlarmConfig> => {
  const userId = getUserId();
  const assetId = getAssetId()?.toString();
  if (!userId) {
    throw new Error('User Id is not available!');
  } else if (!assetId) {
    throw new Error('Machine Id is not available!');
  } else {
    const doc = await alarmConfDoc(userId).get();
    if (doc.exists && doc.data()[assetId]) {
      return doc.data()[assetId];
    }
    return {};
  }
};

/**
 * This method is used to save alarm configurations in firbase
 */
export const saveAlarmConfig = async (alarmConfig: AlarmConfig) => {
  const userId = getUserId();
  const assetId = getAssetId()?.toString();
  if (!userId) {
    throw new Error('User Id is not available!');
  } else if (!assetId) {
    throw new Error('Machine Id is not available!');
  } else {
    const doc = await alarmConfDoc(userId).get();
    if (doc.exists) {
      const docData = doc.data();
      if (docData[assetId]) {
        docData[assetId] = { ...docData[assetId], ...alarmConfig };
      } else {
        docData[assetId] = alarmConfig;
      }
      await alarmConfDoc(userId).update(docData);
    } else {
      await alarmConfDoc(userId).set({ [assetId]: alarmConfig });
    }
  }
};
