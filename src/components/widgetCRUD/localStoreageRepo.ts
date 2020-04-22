// Copyright 2020 Cognite AS
import { WidgetConfig } from 'components/grid/interfaces';

export const saveWidgetConfig = async (
  userId: string,
  assetId: string,
  widgetConf: any
) => {
  const gridConf = JSON.parse(localStorage.getItem(userId) || '{}');
  gridConf[assetId] = gridConf[assetId]
    ? gridConf[assetId].concat(widgetConf)
    : [widgetConf];
  localStorage.setItem(userId, JSON.stringify(gridConf));
  return true;
};

export const saveWidgetConfigs = async (
  userId: string,
  assetId: string,
  widgetConfs: any
) => {
  const gridConf = JSON.parse(localStorage.getItem(userId) || '{}');
  gridConf[assetId] = widgetConfs;
  localStorage.setItem(userId, JSON.stringify(gridConf));
  return true;
};

export const deleteWidgetConfig = async (
  userId: string,
  assetId: string,
  widgetId: string
) => {
  const gridConf = JSON.parse(localStorage.getItem(userId) || '{}');
  const widgetConfigs: WidgetConfig[] = gridConf[assetId] || [];
  const filteredWidgetConfs = widgetConfigs.filter(conf => conf.i !== widgetId);
  gridConf[assetId] = filteredWidgetConfs;
  localStorage.setItem(userId, JSON.stringify(gridConf));
  return true;
};

export const getWidgetConfigByUserId = async (
  userid: any
): Promise<WidgetConfigs> => {
  const grid = localStorage.getItem(userid);
  return grid ? JSON.parse(grid) : [];
};

type WidgetConfigs = {
  [key: string]: WidgetConfig[];
};
