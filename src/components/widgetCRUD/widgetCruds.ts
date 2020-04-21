// Copyright 2020 Cognite AS
import { WidgetConfig } from 'components/grid/interfaces';

export const saveWidgetConfig = async (
  userId: string,
  assetId: string,
  grid: any
) => {
  const gridConf = JSON.parse(localStorage.getItem(userId) || '{}');
  gridConf[assetId] = gridConf[assetId]
    ? gridConf[assetId].concat(grid)
    : [grid];
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
