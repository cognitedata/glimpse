import React, { useEffect, useState } from 'react';
import './gridLayout.css';
import { Responsive, WidthProvider } from 'react-grid-layout';
import sizeMe from 'react-sizeme';
import {
  DUMMY_COMP_ID,
  MAXROWS,
  MARGIN,
  BREAKPOINTS,
  MAXCOLS,
  DEFAULT_LAYOUT_WIDTH,
} from 'constants/grid';
import generateComponent from '../../componentFactory/components';

const ResponsiveGridLayout = WidthProvider(Responsive);

const GridLayout = (props: any) => {
  const [height, setHeight] = useState(600);
  const [layout, setLayout] = useState(props.layout);

  useEffect(() => {
    setHeight(props.size.height);
  }, []);

  useEffect(() => {
    setLayout(props.layout);
  }, [props.layout]);

  const generateComponents = (components: any) => {
    return components.map((comp: any) =>
      generateComponent(comp.i, comp.component, {
        ...comp.props,
        onRemoveItem: props.onRemoveItem,
      })
    );
  };

  const revertChange = () => {
    setLayout((prevLayout: any) => {
      let newLayOut = [...prevLayout];
      if (newLayOut.find(item => item.i === DUMMY_COMP_ID)) {
        newLayOut = newLayOut.filter(item => item.i !== DUMMY_COMP_ID);
      } else {
        newLayOut.push({ i: DUMMY_COMP_ID, x: 0, y: 0, w: 0, h: 0 });
      }
      return newLayOut;
    });
  };

  const onLayoutChange = (ChangedLayout: any) => {
    if (ChangedLayout.find((comp: any) => comp.y + comp.h > MAXROWS)) {
      revertChange();
      return;
    }
    props.onLayoutChange(
      ChangedLayout.filter((item: any) => item.i !== DUMMY_COMP_ID)
    );
  };

  return (
    <ResponsiveGridLayout
      className="layout"
      compactType={null}
      onLayoutChange={onLayoutChange}
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
//
// export default sizeMe({ monitorHeight: true })(BasicLayout);

export default sizeMe({ monitorHeight: true })(GridLayout);
