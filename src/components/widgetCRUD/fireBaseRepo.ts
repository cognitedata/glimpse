// Copyright 2020 Cognite AS
import { WidgetConfig } from 'components/grid/interfaces';
import { widgetConfFSDoc } from '../../firebase';

export const saveWidgetConfig = async (
  userId: string,
  assetId: string,
  widgetConf: any
) => {
  const gridConfDoc = await widgetConfFSDoc(userId).get();

  let gridConf: any = {};
  try {
    if (gridConfDoc.exists) {
      gridConf = gridConfDoc.data();
      gridConf[assetId] = gridConf[assetId]
        ? gridConf[assetId].concat(widgetConf)
        : [widgetConf];
      return await widgetConfFSDoc(userId).update(gridConf);
    }

    gridConf[assetId] = [widgetConf];
    return await widgetConfFSDoc(userId).set(gridConf);
  } catch (error) {
    throw new Error('Save widget failed');
  }
};

export const saveWidgetConfigs = async (
  userId: string,
  assetId: string,
  widgetConfs: any
) => {
  try {
    const gridConfDoc = await widgetConfFSDoc(userId).get();
    let widgetConfObj: WidgetConfigs = {};
    if (gridConfDoc.exists) {
      widgetConfObj = gridConfDoc.data();
      widgetConfObj[assetId] = widgetConfs;
      return await widgetConfFSDoc(userId).update(widgetConfObj);
    }
    widgetConfObj[assetId] = widgetConfs;
    return await widgetConfFSDoc(userId).set(widgetConfObj);
  } catch (error) {
    throw new Error('Save widget layout failed');
  }
};

export const deleteWidgetConfig = async (
  userId: string,
  assetId: string,
  widgetId: string
) => {
  try {
    const gridConfDoc = await widgetConfFSDoc(userId).get();

    if (gridConfDoc.exists) {
      const widgetConfObj = gridConfDoc.data();
      const widgetConfigs: WidgetConfig[] = widgetConfObj[assetId] || [];
      const filteredWidgetConfs = widgetConfigs.filter(
        conf => conf.i !== widgetId
      );
      widgetConfObj[assetId] = filteredWidgetConfs;
      return await widgetConfFSDoc(userId).update(widgetConfObj);
    }
    return {};
  } catch (error) {
    throw new Error('Delete widget failed');
  }
};

export const getWidgetConfigByUserId = async (
  userId: any
): Promise<WidgetConfigs> => {
  try {
    const gridConfDoc = await widgetConfFSDoc(userId).get();
    if (gridConfDoc.exists) {
      return gridConfDoc.data();
    }
    return {};
  } catch (error) {
    throw new Error('Widget Configuration fetching failed');
  }
};

type WidgetConfigs = {
  [key: string]: WidgetConfig[];
};
