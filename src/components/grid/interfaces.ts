import { Layout } from 'react-grid-layout';

import { WIDGET_TYPE_IDS, ValueMapping } from 'constants/widgetSettings';

export interface WidgetConfig {
  i: string;
  widgetTypeId: WIDGET_TYPE_IDS;
  valueMapping?: ValueMapping;
  valueFilter?: any;
}

export interface GridLayoutProps {
  layouts: Layout[];
  widgetConfigs: WidgetConfig[];
  onLayoutChange: (newLayout: Layout[]) => void;
  onRemoveItem: (key: string) => void;
  size: { height: number; width: number };
}
