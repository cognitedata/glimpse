// Copyright 2020 Cognite AS
import React, { FC, useMemo } from 'react';
import { Layout } from 'react-grid-layout';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';
import { RootAction, RootState } from 'StoreTypes';
import { useLocation } from 'react-router-dom';
import { RouterPaths } from 'constants/router';
import {
  getGridLayout,
  setCordinatesFromLayouts,
} from './GridLayout/gridOperations/gridOperations';
import GridLayout from './GridLayout/GridLayout';
import { WidgetConfig } from './interfaces';
import { setAlerts, setWidgetConfigs } from '../../store/actions/root-action';

/**
 * Used to Add widgets to the GridLayOut with extra Features as remove.
 * @param props GridContainerProps
 */
const GridContainer: FC<GridContainerProps> = (props: GridContainerProps) => {
  const isOnSettingPage = useLocation().pathname === RouterPaths.SETTINGS;
  const { localWidgetConfigs } = props;
  const { widgetConfigs } = localWidgetConfigs;
  /**
   * fires when a widget is moved and placed in a different position
   * @param newLayouts Layout[]
   */
  const onDragStop = async (newLayouts: Layout[]) => {
    const newWidgetConf = setCordinatesFromLayouts(newLayouts, widgetConfigs);
    const newLocalWidgetconfigs = {
      ...localWidgetConfigs,
      widgetConfigs: newWidgetConf,
      lastUpdated: new Date(),
    };
    props.setWidgetConfigs(newLocalWidgetconfigs);
  };

  const getGridLayouts = (widgetconfigs: WidgetConfig[]) =>
    widgetconfigs.map(wconf => getGridLayout(wconf));

  const getGridLayoutsMemo = useMemo(() => getGridLayouts(widgetConfigs), [
    widgetConfigs,
  ]);

  /**
   * Fires when the remove button clicked on the widget.
   * @param widgetId
   */
  const onRemoveWidget = async (widgetId: string) => {
    const newWidgetConfig = widgetConfigs.filter(
      (compDetails: WidgetConfig) => compDetails.i !== widgetId
    );
    const newLocalWidgetconfigs = {
      ...localWidgetConfigs,
      lastUpdated: new Date(),
      widgetConfigs: newWidgetConfig,
    };
    props.setWidgetConfigs(newLocalWidgetconfigs);
  };

  return (
    <>
      <div style={{ height: '85vh', padding: '10px' }}>
        <GridLayout
          layouts={getGridLayoutsMemo}
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
  setWidgetConfigs,
};

const mapStateToProps = (state: RootState) => ({
  assetId: state.appState.asset?.id,
  user: state.authState.userInfo?.name,
  localWidgetConfigs: state.appState.localWidgetConfigs,
  newWidget: state.appState.newWidget,
});

const mapDispatchToProps = (dispatch: Dispatch<RootAction>) =>
  bindActionCreators(dispatchProps, dispatch);

type GridContainerProps = ReturnType<typeof mapDispatchToProps> &
  ReturnType<typeof mapStateToProps>;
export default connect(mapStateToProps, dispatchProps)(GridContainer);
