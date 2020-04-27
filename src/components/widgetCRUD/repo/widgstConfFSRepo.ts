// Copyright 2020 Cognite AS
import { WidgetConfig } from 'components/grid/interfaces';
import { widgetConfFSDoc } from '../../../firebase';

type WidgetConfObj = { [key: string]: WidgetConfig[] };

export const save = async (
  userId: string,
  assetId: string,
  widgetConf: WidgetConfig
) => {
  const gridConfDoc = await widgetConfFSDoc(userId).get();
  let gridConf: WidgetConfObj = {};
  if (gridConfDoc.exists) {
    gridConf = gridConfDoc.data();
    gridConf[assetId] = gridConf[assetId]
      ? gridConf[assetId].concat(widgetConf)
      : [widgetConf];
    await widgetConfFSDoc(userId).update(gridConf);
  } else {
    gridConf[assetId] = [widgetConf];
    await widgetConfFSDoc(userId).set(gridConf);
  }
};

export const update = async (
  userId: string,
  assetId: string,
  widgetConfs: WidgetConfig[]
) => {
  const gridConfDoc = await widgetConfFSDoc(userId).get();
  let widgetConfObj: WidgetConfObj = {};
  if (gridConfDoc.exists) {
    widgetConfObj = gridConfDoc.data();
    widgetConfObj[assetId] = widgetConfs;
    await widgetConfFSDoc(userId).update(widgetConfObj);
  }
  widgetConfObj[assetId] = widgetConfs;
  await widgetConfFSDoc(userId).set(widgetConfObj);
};

export const deleteOne = async (
  userId: string,
  assetId: string,
  widgetId: string
) => {
  const gridConfDoc = await widgetConfFSDoc(userId).get();

  if (gridConfDoc.exists) {
    const widgetConfObj = gridConfDoc.data();
    const widgetConfigs: WidgetConfig[] = widgetConfObj[assetId] || [];
    const filteredWidgetConfs = widgetConfigs.filter(
      conf => conf.i !== widgetId
    );
    widgetConfObj[assetId] = filteredWidgetConfs;
    await widgetConfFSDoc(userId).update(widgetConfObj);
  }
};

export const getByUser = async (userId: string): Promise<WidgetConfigs> => {
  const gridConfDoc = await widgetConfFSDoc(userId).get();
  if (gridConfDoc.exists) {
    return gridConfDoc.data();
  }
  return {};
};

type WidgetConfigs = {
  [key: string]: WidgetConfig[];
};
