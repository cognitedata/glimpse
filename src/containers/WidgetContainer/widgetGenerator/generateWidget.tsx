// Copyright 2020 Cognite AS
import { WidgetConfig } from 'components/grid/interfaces';
import widgetConnector from 'store/connectors/widgetConnector';
import WIDGET_SETTINGS from 'constants/widgetSettings';
import { getUniqueKey } from 'utils/utils';
import React from 'react';
import addRemoveBtn from './addRemoveButton/addRemoveBtn';

/**
 * Return widget based on the current page
 */
export default (
  widgetConfig: WidgetConfig,
  onRemoveItem: Function,
  isOnSettingPage: boolean
) => {
  const widgetSetting = WIDGET_SETTINGS[widgetConfig.widgetTypeId];

  const requestKey = getUniqueKey(widgetConfig.queryParams);

  const actionKey = `${widgetSetting.dataFetcher}-${requestKey}`;

  const renderWidget = () => {
    if (widgetSetting !== undefined) {
      return widgetConnector(
        widgetSetting.mapStateToProps(widgetConfig.valueMapping, actionKey),
        widgetSetting.component
      );
    }
    return <></>;
  };
  return (
    <div key={widgetConfig.i} data-testid={widgetConfig.i}>
      {isOnSettingPage
        ? addRemoveBtn(widgetConfig.i, onRemoveItem, renderWidget())
        : renderWidget()}
    </div>
  );
};
