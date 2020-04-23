// Copyright 2020 Cognite AS
import { WidgetConfig } from 'components/grid/interfaces';
import WIDGET_SETTINGS from 'constants/widgetSettings';
import { getUniqueKey } from 'utils/utils';
import store from 'store';

type PollingEndAction = {
  action: any;
  key: string;
};
const pollingEndActions: PollingEndAction[] = [];

/**
 * Dispactch distinct data fetching actions
 */
export const dispatchDistinctActions = (widgetConfigs: WidgetConfig[]) => {
  const dispatchedActions: string[] = [];
  widgetConfigs.forEach(widgetConfig => {
    const widgetSetting = WIDGET_SETTINGS[widgetConfig.widgetTypeId];

    if (widgetSetting.dataFetcher) {
      const requestKey = getUniqueKey(widgetConfig.queryParams);

      const actionKey = `${widgetSetting.dataFetcher}-${requestKey}`;

      if (dispatchedActions.indexOf(actionKey) === -1) {
        dispatchedActions.push(actionKey);

        const actionPaylod = {
          queryParams: widgetConfig.queryParams,
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
  return endPolling;
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
 * Fire dispatch action to end all the polling
 */
export const endPolling = () => {
  pollingEndActions.forEach((pollingEndAction: PollingEndAction) => {
    store.dispatch({
      type: pollingEndAction.action,
      payload: pollingEndAction.key,
    });
  });
};
