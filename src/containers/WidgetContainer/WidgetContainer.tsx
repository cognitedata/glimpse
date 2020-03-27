import React, { useEffect } from 'react';

import WIDGET_SETTINGS from 'constants/widgetSettings';
import CSS from 'csstype';
import { WidgetConfig } from 'components/grid/interfaces';
import { getUniqueKey } from '../../utills/utills';
import widgetConnector from '../../store/connectors/widgetConnector';

import store from '../../store/index';

/**
 * This contains some major functions related to widget generator.
 */

type PollingEndAction = {
  action: any;
  key: string;
};

const pollingEndActions: PollingEndAction[] = [];

/**
 *
 * Return widget element connected with state
 */
const generateWidget = (widgetConfig: WidgetConfig, onRemoveItem: Function) => {
  const widgetSetting = WIDGET_SETTINGS[widgetConfig.widgetTypeId];

  const sourcePath = getUniqueKey(widgetConfig.valueFilter);

  return (
    <div key={widgetConfig.i} data-testid={widgetConfig.i}>
      <button
        type="button"
        style={removeStyle}
        onClick={() => onRemoveItem(widgetConfig.i)}
      >
        x
      </button>
      {widgetSetting !== undefined
        ? widgetConnector(
            widgetSetting.mapStateToProps(
              widgetConfig.valueMapping,
              sourcePath
            ),
            widgetSetting.component
          )
        : null}
    </div>
  );
};

/**
 *
 * Return list widget elements connected with state
 */
const generateWidgets = (
  widgetConfigs: WidgetConfig[],
  onRemoveItem: Function
) => {
  return widgetConfigs.map((widgetConfig: WidgetConfig) =>
    generateWidget(widgetConfig, onRemoveItem)
  );
};

/**
 *
 * Store polling end action list to fire on component unmount
 */
const updatePollingEndActionList = (
  pollingEndAction: any,
  actionKey: string
) => {
  if (pollingEndAction) {
    pollingEndActions.push({
      action: pollingEndAction,
      key: actionKey,
    });
  }
};

/**
 *
 * Identify distinct dispatch actions and fire
 */
const dispatchDistinctActions = (widgetConfigs: WidgetConfig[]) => {
  const dispatchedActions: string[] = [];
  widgetConfigs.forEach(widgetConfig => {
    const widgetSetting = WIDGET_SETTINGS[widgetConfig.widgetTypeId];

    const sourcePath = getUniqueKey(widgetConfig.valueFilter);

    if (widgetSetting.dataFetcher) {
      const actionKey = `${widgetSetting.dataFetcher}-${sourcePath}`;

      if (dispatchedActions.indexOf(actionKey) === -1) {
        dispatchedActions.push(actionKey);

        const actionPaylod = {
          ...widgetConfig.valueFilter,
          sourcePath,
          pollingInterval: widgetSetting.pollingInterval,
          actionKey,
        };
        store.dispatch({
          type: widgetSetting.dataFetcher,
          payload: actionPaylod,
        });

        updatePollingEndActionList(widgetSetting.pollingEndAction, actionKey);
      }
    }
  });
};

/**
 * Fire dispatch action to end all the polling
 */
const endPolling = () => {
  pollingEndActions.forEach((pollingEndAction: PollingEndAction) => {
    store.dispatch({
      type: pollingEndAction.action,
      payload: pollingEndAction.key,
    });
  });
};

const WidgetContainer = (props: Props) => {
  useEffect(() => {
    dispatchDistinctActions(props.widgetConfigs);
    return endPolling;
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return generateWidgets(props.widgetConfigs, props.onRemoveItem);
};

export default WidgetContainer;

type Props = {
  widgetConfigs: WidgetConfig[];
  onRemoveItem: Function;
};

const removeStyle: CSS.Properties = {
  position: 'absolute',
  right: '2px',
  top: 0,
  background: 'none',
  border: 'none',
  margin: 0,
  padding: 0,
  fontSize: '25px',
  cursor: 'pointer',
  color: '#b31616',
};
