// Copyright 2020 Cognite AS
import { Layout } from 'react-grid-layout';

import { ValueMapping, QueryParams } from 'constants/widgetSettings';

export interface WidgetConfig {
  i: string;
  layout?: { static?: boolean };
  cordinates: [number, number];
  widgetTypeId: string;
  valueMapping?: ValueMapping;
  queryParams?: QueryParams;
}

export interface GridLayoutProps {
  layouts: Layout[];
  widgetConfigs: WidgetConfig[];
  onLayoutChange?: (newLayout: Layout[]) => void;
  onDragStop?: (newLayout: Layout[]) => void;
  isDraggable?: boolean;
  onRemoveItem: (key: string) => void;
  size: { height: number; width: number };
}

export interface WidgetConfWrapper {
  id: string;
  lastUpdated: Date | null;
  widgetConfigs: WidgetConfig[];
}
