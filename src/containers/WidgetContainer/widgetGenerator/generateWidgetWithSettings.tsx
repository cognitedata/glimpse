// Copyright 2020 Cognite AS
import { WidgetConfig } from 'components/grid/interfaces';
import WIDGET_SETTINGS from 'constants/widgetSettings';
import { getUniqueKey } from 'utils/utils';
import widgetConnector from 'store/connectors/widgetConnector';
import React from 'react';
import CSS from 'csstype';

/**
 * Return a widget with settins (adding remove button)
 */
export default (widgetConfig: WidgetConfig, onRemoveItem: Function) => {
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
      <button
        type="button"
        style={removeStyle}
        onClick={() => onRemoveItem(widgetConfig.i)}
      >
        x
      </button>
      {renderWidget()}
    </div>
  );
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
