// Copyright 2020 Cognite AS
import React, { FC, useMemo } from 'react';
import { Layout } from 'react-grid-layout';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';
import { RootAction, RootState } from 'StoreTypes';
import {
  getGridLayout,
  addCordinateChanges,
} from './GridLayout/gridOperations/gridOperations';
import GridLayout from './GridLayout/GridLayout';
import { WidgetConfig } from './interfaces';
import { setAlerts, setWidgetConfigs } from '../../store/actions/root-action';

/**
 * Used to Add widgets to the GridLayOut with extra Features as remove.
 * @param props GridContainerProps
 */
const GridContainer: FC<GridContainerProps> = (props: GridContainerProps) => {
  const { isDraggable } = props;

  // When some modification is done these local widget configurations are saved in the DB
  const { widgetConfWrapper } = props;
  const { widgetConfigs } = widgetConfWrapper;

  /**
   * fires when a widget is moved and placed in a different position
   * @param newLayouts Layout[]
   */
  const onDragStop = async (newLayouts: Layout[]) => {
    const updatedWidgetConfs = addCordinateChanges(newLayouts, widgetConfigs);
    const newWidgetConfWrapper = {
      ...widgetConfWrapper,
      widgetConfigs: updatedWidgetConfs,
    };
    props.setWidgetConfigs(newWidgetConfWrapper);
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
    const newwidgetConfWrapper = {
      ...widgetConfWrapper,
      widgetConfigs: newWidgetConfig,
    };
    props.setWidgetConfigs(newwidgetConfWrapper);
  };

  return (
    <>
      <div style={{ height: '85vh', padding: '10px' }}>
        <GridLayout
          layouts={getGridLayoutsMemo}
          widgetConfigs={widgetConfigs}
          onRemoveItem={onRemoveWidget}
          onDragStop={onDragStop}
          isDraggable={isDraggable}
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
  widgetConfWrapper: state.appState.widgetConfWrapper,
  newWidget: state.appState.newWidget,
});

const mapDispatchToProps = (dispatch: Dispatch<RootAction>) =>
  bindActionCreators(dispatchProps, dispatch);

type GridContainerProps = { isDraggable?: boolean } & ReturnType<
  typeof mapDispatchToProps
> &
  ReturnType<typeof mapStateToProps>;

export default connect(mapStateToProps, dispatchProps)(GridContainer);
