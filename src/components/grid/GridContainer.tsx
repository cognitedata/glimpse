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
import differenceWith from 'lodash/differenceWith';
import isEqual from 'lodash/isEqual';
import {
  getWidgetConfigs,
  updateLayout,
  saveWidget,
  deleteWidget,
} from 'components/widgetCRUD/services/widgetConfService';
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
  const [lastSavedlayouts, setLastSavedlayouts] = useState<Layout[]>([]);

  const isequalPosition = (obj1: Layout, obj2: Layout) => {
    return (
      isEqual(obj1.i, obj2.i) &&
      isEqual(obj1.x, obj2.x) &&
      isEqual(obj1.y, obj2.y)
    );
  };

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
  const onDragStop = async (newLayouts: Layout[]) => {
    const layOutChanged = differenceWith(newLayouts, layouts, isequalPosition);
    if (layOutChanged && layOutChanged.length > 0) {
      const isSuccess = await updateLayout(
        props.user,
        props.assetId,
        layOutChanged,
        widgetConfigs,
        onError
      );
      if (isSuccess) {
        setLastSavedlayouts(newLayouts);
      } else {
        setLayouts(lastSavedlayouts);
      }
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
      setLastSavedlayouts(generatedLayout);
    }
  };

  const onRemoveItem = async (widgetId: string) => {
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

  const addWidget = async (widgetConfig: WidgetConfig) => {
    const { widgetTypeId } = widgetConfig;
    const [w, h] = WIDGET_SETTINGS[widgetTypeId].size;
    const widgetCordinates = getEmptyPositions(layouts, w, h, MAXCOLS, MAXROWS);
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
      setLayouts(newWidgetConfs.map(widConf => getGridLayout(widConf)));
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
