import React, { useEffect, useState } from 'react';
import './gridLayout.css';
import { Responsive, WidthProvider, Layout } from 'react-grid-layout';
import sizeMe from 'react-sizeme';
import {
  DUMMY_COMP_ID,
  MAXROWS,
  MARGIN,
  BREAKPOINTS,
  MAXCOLS,
  DEFAULT_LAYOUT_WIDTH,
  IS_RESIZABLE,
} from 'constants/grid';
import generateComponent from '../../componentFactory/componentsFactory';
import { ComponentDetail, GridLayoutProps } from '../interfaces';

const ResponsiveGridLayout = WidthProvider(Responsive);

const GridLayout = (props: GridLayoutProps) => {
  const [height, setHeight] = useState(600);
  const [layout, setLayout] = useState(props.layouts);

  useEffect(() => {
    setHeight(props.size.height);
  }, []);

  useEffect(() => {
    setLayout(props.layouts);
  }, [props.layouts]);

  const generateComponents = (components: ComponentDetail[]) => {
    return components.map((comp: ComponentDetail) =>
      generateComponent(comp.i, comp.compName, {
        onRemoveItem: props.onRemoveItem,
      })
    );
  };

  const revertChange = () => {
    setLayout((prevLayouts: Layout[]) => {
      let newLayOuts = [...prevLayouts];
      if (newLayOuts.find(layOutItem => layOutItem.i === DUMMY_COMP_ID)) {
        newLayOuts = newLayOuts.filter(
          layOutItem => layOutItem.i !== DUMMY_COMP_ID
        );
      } else {
        newLayOuts.push({ i: DUMMY_COMP_ID, x: 0, y: 0, w: 0, h: 0 });
      }
      return newLayOuts;
    });
  };

  const onLayoutChange = (ChangedLayout: Layout[]) => {
    if (
      ChangedLayout.find(
        (layoutItem: Layout) => layoutItem.y + layoutItem.h > MAXROWS
      )
    ) {
      revertChange();
      return;
    }
    props.onLayoutChange(
      ChangedLayout.filter(
        (layoutItem: Layout) => layoutItem.i !== DUMMY_COMP_ID
      )
    );
  };

  return (
    <ResponsiveGridLayout
      className="layout"
      compactType={null}
      onLayoutChange={onLayoutChange}
      isResizable={IS_RESIZABLE}
      margin={MARGIN}
      breakpoints={BREAKPOINTS}
      layouts={{ lg: layout }}
      cols={{ lg: MAXCOLS }}
      preventCollision
      rowHeight={height / MAXROWS}
      width={DEFAULT_LAYOUT_WIDTH}
    >
      {generateComponents(props.components)}
    </ResponsiveGridLayout>
  );
};

export default sizeMe({ monitorHeight: true })(GridLayout);
