// Copyright 2020 Cognite AS
import { WidgetConfig } from 'components/grid/interfaces';
import generateWidgetsWithSettings from './generateWidgetWithSettings';
import generateStaticWidget from './generateStaticWidget';

/**
 * Return widget based on the current page
 */
export default (
  widgetConfig: WidgetConfig,
  onRemoveItem: Function,
  isOnSettingPage: boolean
) => {
  if (isOnSettingPage) {
    return generateWidgetsWithSettings(widgetConfig, onRemoveItem);
  }
  return generateStaticWidget(widgetConfig);
};
