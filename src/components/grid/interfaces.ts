import { Layout } from 'react-grid-layout';
import { Widget } from 'constants/components';

export interface ComponentDetail {
  i: string;
  compName: Widget;
  props?: {};
}

export interface GridLayoutProps {
  layouts: Layout[];
  components: ComponentDetail[];
  onLayoutChange: (newLayout: Layout[]) => void;
  onRemoveItem: (key: string) => void;
  size: { height: number; width: number };
}
