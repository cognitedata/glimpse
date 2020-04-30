// Copyright 2020 Cognite AS
import React, { FC, useState, useEffect, useRef, useMemo } from 'react';
import { generateRandomKey } from 'utils/utils';
import { MAXCOLS, MAXROWS } from 'constants/grid';
import { Layout } from 'react-grid-layout';
import WIDGET_SETTINGS from 'constants/widgetSettings';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';
import { RootAction, RootState } from 'StoreTypes';
import get from 'lodash/get';
import {
  getWidgetConfigs,
  updateWidgetConfigs,
  saveWidgetConfig,
  deleteWidget,
  getWidgetConfByLayout,
} from 'components/widgetCRUD/services/widgetConfService';
import { useLocation } from 'react-router-dom';
import { RouterPaths } from 'constants/router';
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
  const [lastSavedWidgetConfigs, setlastSavedwidgetConfigs] = useState<
    WidgetConfig[]
  >([]);

  const onError = (msg: string) => {
    props.setAlerts({
      type: 'error',
      text: msg,
      duration: 50000,
      hideApp: false,
    });
  };

  const onLayoutChange = (newLayouts: Layout[]) => {
    setWidgetConfigs(getWidgetConfByLayout(newLayouts, widgetConfigs));
  };

  const isOnSettingPage = useLocation().pathname === RouterPaths.SETTINGS;
  /**
   * fire when a widget is moved and placed in a different position
   * @param newLayouts
   */
  const onDragStop = async (newLayouts: Layout[]) => {
    const newWidgetConfs = getWidgetConfByLayout(newLayouts, widgetConfigs);
    setWidgetConfigs(newWidgetConfs);
    const isSuccess = await updateWidgetConfigs(
      props.user,
      props.assetId,
      getWidgetConfByLayout(newLayouts, widgetConfigs),
      onError
    );
    if (isSuccess) {
      setlastSavedwidgetConfigs(newWidgetConfs);
    } else {
      setWidgetConfigs(lastSavedWidgetConfigs);
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

  const getGridLayouts = (widgetconfigs: WidgetConfig[]) =>
    widgetconfigs.map(wconf => getGridLayout(wconf));

  const getGridLayoutsMemo = useMemo(() => getGridLayouts(widgetConfigs), [
    widgetConfigs,
  ]);

  const initilizeGrid = async () => {
    const widgetConf = await getWidgetConfigs(props.user, onError);
    if (isMounted.current) {
      const widgetConfForAsset = get(widgetConf, props.assetId) || [];
      setWidgetConfigs(widgetConfForAsset);
      setlastSavedwidgetConfigs(widgetConfForAsset);
    }
  };

  /**
   * Fires when a remove button click on a widget
   * @param widgetId
   */
  const onRemoveWidget = async (widgetId: string) => {
    const newWidgetConfig = widgetConfigs.filter(
      (compDetails: WidgetConfig) => compDetails.i !== widgetId
    );
    setWidgetConfigs(newWidgetConfig);
    const isSuccess = await deleteWidget(
      props.user,
      props.assetId,
      widgetId,
      onError
    );
    if (isSuccess) {
      setlastSavedwidgetConfigs(newWidgetConfig);
    } else {
      setWidgetConfigs(lastSavedWidgetConfigs);
    }
  };

  /**
   * save a widget-configuration with generated id. and add it to the grid.
   * @param widgetConfig
   */
  const addWidget = async (widgetConfig: WidgetConfig) => {
    const { widgetTypeId } = widgetConfig;
    const [w, h] = WIDGET_SETTINGS[widgetTypeId].size;
    const layouts = widgetConfigs.map(wconf => getGridLayout(wconf));
    const widgetCordinates = getEmptyPositions(layouts, w, h, MAXCOLS, MAXROWS);
    console.log(layouts, widgetCordinates);
    if (!widgetCordinates) {
      onError('There is no position for adding the component');
      return;
    }
    const newWidgetConf = { ...widgetConfig };
    newWidgetConf.i = generateRandomKey();
    newWidgetConf.cordinates = widgetCordinates;
    const newWidgetConfs = [...widgetConfigs].concat(newWidgetConf);
    setWidgetConfigs(newWidgetConfs);
    const isSuccess = saveWidgetConfig(
      props.user,
      props.assetId,
      newWidgetConf,
      onError
    );
    if (isSuccess) {
      setlastSavedwidgetConfigs(newWidgetConfs);
    } else {
      setWidgetConfigs(lastSavedWidgetConfigs);
    }
  };

  return (
    <>
      <div style={{ height: '85vh', padding: '10px' }}>
        <GridLayout
          layouts={getGridLayoutsMemo}
          onLayoutChange={onLayoutChange}
          widgetConfigs={widgetConfigs}
          onRemoveItem={onRemoveWidget}
          onDragStop={onDragStop}
          isDraggable={isOnSettingPage}
        />
      </div>
    </>
  );
};

const dispatchProps = {
  setAlerts,
};

const mapStateToProps = (state: RootState) => ({
  assetId: state.appState.asset?.id,
  user: state.authState.userInfo?.name,
  newWidget: state.appState.newWidget,
});

const mapDispatchToProps = (dispatch: Dispatch<RootAction>) =>
  bindActionCreators(dispatchProps, dispatch);

type GridContainerProps = ReturnType<typeof mapDispatchToProps> &
  ReturnType<typeof mapStateToProps>;
export default connect(mapStateToProps, dispatchProps)(GridContainer);
