// Copyright 2020 Cognite AS
import React, { FC, useState, useEffect, useRef } from 'react';
import { generateRandomKey } from 'utils/utils';
import { MAXCOLS, MAXROWS } from 'constants/grid';
import { Layout } from 'react-grid-layout';
import WIDGET_SETTINGS from 'constants/widgetSettings';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';
import { RootAction, RootState } from 'StoreTypes';
import {
  getWidgetConfigByUserId,
  saveWidgetConfig,
  saveWidgetConfigs,
  deleteWidgetConfig,
} from 'components/widgetCRUD/fireBaseRepo';
import get from 'lodash/get';
import differenceWith from 'lodash/differenceWith';
import isEqual from 'lodash/isEqual';
import findIndex from 'lodash/findIndex';
import {
  getEmptyPositions,
  getGridLayout,
} from './GridLayout/gridOperations/gridOperations';
import GridLayout from './GridLayout/GridLayout';
import { WidgetConfig } from './interfaces';
import { setAlerts } from '../../store/actions/root-action';

/**
 * Used to Add widgets to the GridLayOut with extra Features as remove.
 * @param props GridContainerProps
 */

const GridContainer: FC<GridContainerProps> = (props: GridContainerProps) => {
  const isMounted = useRef(true);
  const [widgetConfigs, setWidgetConfigs] = useState<WidgetConfig[]>([]);
  const [layouts, setLayouts] = useState<Layout[]>([]);

  const onRemoveItem = async (key: string) => {
    try {
      await deleteWidgetConfig(props.user, props.assetId, key);
      setLayouts((prevLayout: Layout[]) =>
        prevLayout.filter((compDetails: Layout) => compDetails.i !== key)
      );
      setWidgetConfigs((prevWidgetConfigs: WidgetConfig[]) =>
        prevWidgetConfigs.filter(
          (compDetails: WidgetConfig) => compDetails.i !== key
        )
      );
    } catch (error) {
      props.setAlerts({
        type: 'error',
        text: 'Unable to delete the widget',
        duration: 50000,
        hideApp: false,
      });
    }
  };

  const isequalPosition = (obj1: Layout, obj2: Layout) => {
    return (
      isEqual(obj1.i, obj2.i) &&
      isEqual(obj1.x, obj2.x) &&
      isEqual(obj1.y, obj2.y)
    );
  };

  const onDragStop = (newLayouts: Layout[]) => {
    const widgetConfChanged = differenceWith(
      newLayouts,
      layouts,
      isequalPosition
    );
    if (widgetConfChanged && widgetConfChanged.length > 0) {
      updatePositions(widgetConfChanged);
    }
  };
  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    initilizeGrid();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.assetId]);

  useEffect(() => {
    if (props.newWidget !== undefined) {
      addWidget(props.newWidget);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.newWidget]);

  const initilizeGrid = async () => {
    let widgetConf = {};
    try {
      widgetConf = await getWidgetConfigByUserId(props.user);
    } catch (error) {
      props.setAlerts({
        type: 'error',
        text: 'Unable to fetch saved widget configerations data!',
        duration: 50000,
        hideApp: false,
      });
    }
    if (isMounted.current) {
      const widgetConfForAsset = get(widgetConf, props.assetId) || [];
      setWidgetConfigs(widgetConfForAsset);
      setLayouts(widgetConfForAsset.map(widConf => getGridLayout(widConf)));
    }
  };

  const updatePositions = async (layOutDiff: Layout[]) => {
    const newWidgetConfigs = [...widgetConfigs];
    layOutDiff.forEach(layout => {
      const { i, x, y } = layout;
      const index = findIndex(widgetConfigs, { i });
      if (index !== -1) {
        const newWidgetConfig: WidgetConfig = {
          ...widgetConfigs[index],
          cordinates: [x, y],
        };
        newWidgetConfigs[index] = newWidgetConfig;
      }
    });
    try {
      await saveWidgetConfigs(props.user, props.assetId, newWidgetConfigs);
    } catch (error) {
      props.setAlerts({
        type: 'error',
        text: 'layOut Save Failed',
        duration: 50000,
        hideApp: false,
      });
    }
  };

  const saveNewWidget = async (newWidgetConf: WidgetConfig) => {
    try {
      await saveWidgetConfig(props.user, props.assetId, newWidgetConf);
    } catch (error) {
      props.setAlerts({
        type: 'error',
        text: 'Widget save failed',
        duration: 50000,
        hideApp: false,
      });
    }
  };

  const addWidget = async (widgetConfig: WidgetConfig) => {
    const { widgetTypeId } = widgetConfig;
    const [w, h] = WIDGET_SETTINGS[widgetTypeId].size;
    const widgetCordinates = getEmptyPositions(layouts, w, h, MAXCOLS, MAXROWS);
    if (!widgetCordinates) {
      props.setAlerts({
        type: 'error',
        text: 'There is no position for adding the component',
        duration: 50000,
        hideApp: false,
      });
      return;
    }
    const newWidgetConf = { ...widgetConfig };
    newWidgetConf.i = generateRandomKey();
    newWidgetConf.cordinates = widgetCordinates;
    const newWidgetConfs = [...widgetConfigs].concat(newWidgetConf);
    setLayouts(newWidgetConfs.map(widConf => getGridLayout(widConf)));
    setWidgetConfigs(newWidgetConfs);
    saveNewWidget(newWidgetConf);
  };

  return (
    <>
      <div style={{ height: '85vh', padding: '10px' }}>
        <GridLayout
          layouts={layouts}
          widgetConfigs={widgetConfigs}
          onRemoveItem={onRemoveItem}
          onDragStop={onDragStop}
        />
      </div>
    </>
  );
};

const dispatchProps = {
  setAlerts,
};
const mapStateToProps = (state: RootState) => ({
  assetId: state.widgetState.asset?.id,
  user: state.authState.userInfo?.name,
  newWidget: state.widgetState.newWidget,
});
const mapDispatchToProps = (dispatch: Dispatch<RootAction>) =>
  bindActionCreators(dispatchProps, dispatch);

type GridContainerProps = ReturnType<typeof mapDispatchToProps> &
  ReturnType<typeof mapStateToProps>;
export default connect(mapStateToProps, dispatchProps)(GridContainer);
