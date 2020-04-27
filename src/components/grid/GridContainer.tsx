// Copyright 2020 Cognite AS
import React, { FC, useState, useEffect, useRef } from 'react';
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
  updateLayout,
  saveWidget,
  deleteWidget,
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
  const [layouts, setLayouts] = useState<Layout[]>([]);
  const [lastSavedLayouts, setLastSavedLayouts] = useState<Layout[]>([]);

  /**
   * compare 2 layouts position is same or not
   * @param layOut1
   * @param layOut2
   */
  const onError = (msg: string) => {
    props.setAlerts({
      type: 'error',
      text: msg,
      duration: 50000,
      hideApp: false,
    });
  };

  const onLayoutChange = (newLayouts: Layout[]) => {
    setLayouts(newLayouts);
  };
  const isOnSettingPage = useLocation().pathname === RouterPaths.SETTINGS;
  /**
   * fire when a widget is moved and place in a different position
   * @param newLayouts
   */
  const onDragStop = async (newLayouts: Layout[]) => {
    setLayouts(newLayouts);
    const isSuccess = await updateLayout(
      props.user,
      props.assetId,
      newLayouts,
      widgetConfigs,
      onError
    );
    if (isSuccess) {
      setLastSavedLayouts(newLayouts);
    } else {
      setLayouts(lastSavedLayouts);
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
    const widgetConf = await getWidgetConfigs(props.user, onError);
    if (isMounted.current) {
      const widgetConfForAsset = get(widgetConf, props.assetId) || [];
      setWidgetConfigs(widgetConfForAsset);
      const generatedLayout = widgetConfForAsset.map(widConf =>
        getGridLayout(widConf)
      );
      setLayouts(generatedLayout);
      setLastSavedLayouts(generatedLayout);
    }
  };
  /**
   * Fires when a remove button click on a widget
   * @param widgetId
   */
  const onRemoveWidget = async (widgetId: string) => {
    const isSuccess = await deleteWidget(
      props.user,
      props.assetId,
      widgetId,
      onError
    );
    if (isSuccess) {
      setLayouts((prevLayout: Layout[]) =>
        prevLayout.filter((compDetails: Layout) => compDetails.i !== widgetId)
      );
      setWidgetConfigs((prevWidgetConfigs: WidgetConfig[]) =>
        prevWidgetConfigs.filter(
          (compDetails: WidgetConfig) => compDetails.i !== widgetId
        )
      );
    }
  };
  /**
   * save a widget-configuration with generated id. and add it to the grid.
   * @param widgetConfig
   */
  const addWidget = async (widgetConfig: WidgetConfig) => {
    const { widgetTypeId } = widgetConfig;
    const [w, h] = WIDGET_SETTINGS[widgetTypeId].size;
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
    const isSuccess = saveWidget(
      props.user,
      props.assetId,
      newWidgetConf,
      onError
    );
    if (isSuccess) {
      setLayouts(prevLayout =>
        [...prevLayout].concat(getGridLayout(newWidgetConf))
      );
      setWidgetConfigs(newWidgetConfs);
    }
  };

  return (
    <>
      <div style={{ height: '85vh', padding: '10px' }}>
        <GridLayout
          layouts={layouts}
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
