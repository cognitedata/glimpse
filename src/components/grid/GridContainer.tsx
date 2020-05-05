// Copyright 2020 Cognite AS
import React, { FC, useMemo } from 'react';
import { Layout } from 'react-grid-layout';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';
import { RootAction, RootState } from 'StoreTypes';
import { getWidgetConfByLayout } from 'components/widgetCRUD/services/widgetConfService';
import { useLocation } from 'react-router-dom';
import { RouterPaths } from 'constants/router';
import { getGridLayout } from './GridLayout/gridOperations/gridOperations';
import GridLayout from './GridLayout/GridLayout';
import { WidgetConfig } from './interfaces';
import { setAlerts, setWidgetConfigs } from '../../store/actions/root-action';

/**
 * Used to Add widgets to the GridLayOut with extra Features as remove.
 * @param props GridContainerProps
 */
const GridContainer: FC<GridContainerProps> = (props: GridContainerProps) => {
  const isOnSettingPage = useLocation().pathname === RouterPaths.SETTINGS;
  /**
   * fire when a widget is moved and placed in a different position
   * @param newLayouts
   */
  const onDragStop = async (newLayouts: Layout[]) => {
    const newWidgetConf = getWidgetConfByLayout(
      newLayouts,
      props.localWidgetConfigs.widgetConfigs
    );
    const newLocalWidgetconfigs = {
      ...props.localWidgetConfigs,
      widgetConfigs: newWidgetConf,
      lastUpdated: new Date(),
    };
    props.setWidgetConfigs(newLocalWidgetconfigs);
  };

  const getGridLayouts = (widgetconfigs: WidgetConfig[]) =>
    widgetconfigs.map(wconf => getGridLayout(wconf));

  const getGridLayoutsMemo = useMemo(
    () => getGridLayouts(props.localWidgetConfigs.widgetConfigs),
    [props.localWidgetConfigs]
  );

  /**
   * Fires when a remove button click on a widget
   * @param widgetId
   */
  const onRemoveWidget = async (widgetId: string) => {
    const newWidgetConfig = props.localWidgetConfigs.widgetConfigs.filter(
      (compDetails: WidgetConfig) => compDetails.i !== widgetId
    );
    const newLocalWidgetconfigs = {
      ...props.localWidgetConfigs,
      lastUpdated: new Date(),
      widgetConfigs: newWidgetConfig,
    };
    props.setWidgetConfigs(newLocalWidgetconfigs);
  };

  console.log(props.localWidgetConfigs);
  return (
    <>
      <div style={{ height: '85vh', padding: '10px' }}>
        <GridLayout
          layouts={getGridLayoutsMemo}
          widgetConfigs={props.localWidgetConfigs.widgetConfigs}
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
