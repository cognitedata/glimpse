export interface Layout {
  i: string;
  x: number;
  y: number;
  w: number;
  h: number;
  static?: boolean;
}

export interface ComponentDetail {
  i: string;
  compName: string;
}

export interface GridLayoutProps {
  layouts: Layout[];
  components: ComponentDetail[];
  onLayoutChange: (newLayout: Layout[]) => void;
  onRemoveItem: (key: string) => void;
  size: { height: number };
}
