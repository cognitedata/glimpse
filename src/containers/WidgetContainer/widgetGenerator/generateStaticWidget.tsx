// Copyright 2020 Cognite AS
import { WidgetConfig } from 'components/grid/interfaces';
import WIDGET_SETTINGS from 'constants/widgetSettings';
import { getUniqueKey } from 'utils/utils';
import widgetConnector from 'store/connectors/widgetConnector';
import React from 'react';

/**
 * Return a widget without settings.
 */
export default (widgetConfig: WidgetConfig) => {
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
    return null;
  };
  return (
    <div key={widgetConfig.i} data-testid={widgetConfig.i}>
      {renderWidget()}
    </div>
  );
};
