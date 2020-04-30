// Copyright 2020 Cognite AS
import { Layout } from 'react-grid-layout';
import findIndex from 'lodash/findIndex';
import { WidgetConfig } from 'components/grid/interfaces';
import { getByUser, update, deleteOne, save } from '../repo/widgstConfFSRepo';

export const getWidgetConfigs = async (userId: string, onError: Function) => {
  try {
    return await getByUser(userId);
  } catch (error) {
    onError('Unable to fetch saved widget configerations data!');
    return {};
  }
};

export const getWidgetConfByLayout = (
  layouts: Layout[],
  widgetConf: WidgetConfig[]
) => {
  const newWidgetConfigs = [...widgetConf];
  layouts.forEach(layout => {
    const { i, x, y } = layout;
    const index = findIndex(widgetConf, { i });
    if (index !== -1) {
      const newWidgetConfig: WidgetConfig = {
        ...widgetConf[index],
        cordinates: [x, y],
      };
      newWidgetConfigs[index] = newWidgetConfig;
    }
  });
  return newWidgetConfigs;
};

export const updateWidgetConfigs = async (
  userId: string,
  assetId: string,
  widgetConfigs: WidgetConfig[],
  onError: Function
) => {
  try {
    await update(userId, assetId, widgetConfigs);
    return true;
  } catch (error) {
    onError('layOuts Save Failed');
    return false;
  }
};

export const saveWidgetConfig = async (
  userId: string,
  assetId: string,
  newWidgetConf: WidgetConfig,
  onError: Function
) => {
  try {
    await save(userId, assetId, newWidgetConf);
    return true;
  } catch (error) {
    onError('Widget save failed');
    return false;
  }
};

export const deleteWidget = async (
  userId: string,
  assetId: string,
  widgetId: string,
  onError: Function
) => {
  try {
    await deleteOne(userId, assetId, widgetId);
    return true;
  } catch (error) {
    onError('Unable to delete the widget');
    return false;
  }
};
