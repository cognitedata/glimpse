import { Layout } from 'react-grid-layout';

export interface ComponentDetail {
  i: string;
  compName: string;
}

export interface GridLayoutProps {
  layouts: Layout[];
  components: ComponentDetail[];
  onLayoutChange: (newLayout: Layout[]) => void;
  onRemoveItem: (key: string) => void;
  size: { height: number; width: number };
}
