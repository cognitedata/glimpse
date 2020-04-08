// Copyright 2020 Cognite AS
import { WidgetConfig } from 'components/grid/interfaces';
import generateWidgetsWithSettings from './generateWidgetWithSettings';
import generateStaticWidget from './generateStaticWidget';
// Copyright 2020 Cognite AS
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
