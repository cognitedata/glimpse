import React, { FC, useEffect, useState, useRef, useCallback } from 'react';
import './GridLayout.css';
import { Responsive, Layout } from 'react-grid-layout';
import sizeMe from 'react-sizeme';
import {
  DUMMY_COMP_ID,
  MAXROWS,
  MARGIN,
  BREAKPOINTS,
  MAXCOLS,
  IS_RESIZABLE,
  MIN_WIDTH,
  MIN_ROW_HEIGHT,
} from 'constants/grid';
import generateComponent from '../../componentFactory/componentsFactory';
import { ComponentDetail, GridLayoutProps } from '../interfaces';

const ResponsiveGridLayout = Responsive;

const GridLayout: FC<GridLayoutProps> = (props: GridLayoutProps) => {
  const refGridLayout = useRef() as React.MutableRefObject<HTMLInputElement>;
  const [height, setHeight] = useState(600);
  const [layout, setLayout] = useState(props.layouts);

  const updateWindowDimensions = useCallback(() => {
    setHeight(
      refGridLayout.current.parentElement
        ? refGridLayout.current.parentElement.clientHeight
        : window.innerHeight
    );
  }, [refGridLayout]);

  useEffect(() => {
    setLayout(props.layouts);
  }, [props.layouts]);

  // change gridlayout height on resize events of the browser
  useEffect(() => {
    updateWindowDimensions();
    window.addEventListener('resize', updateWindowDimensions);
    return () => window.removeEventListener('resize', updateWindowDimensions);
  }, [updateWindowDimensions]);

  const generateComponents = (components: ComponentDetail[]) => {
    return components.map((comp: ComponentDetail) =>
      generateComponent(comp.i, comp.compName, {
        ...comp.props,
        onRemoveItem: props.onRemoveItem,
      })
    );
  };

  /**
   * For change grid layout to previous position, Need to change the layout array length (library implementation)
   * so need to push dummy layout or remove dummy layout
   */
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

  const getRowHeight = (): number => {
    const currentRowHeight = height / MAXROWS - MARGIN[1];
    return currentRowHeight < MIN_ROW_HEIGHT
      ? MIN_ROW_HEIGHT
      : currentRowHeight;
  };

  return (
    <>
      <div ref={refGridLayout} className="gridLayout">
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
          rowHeight={getRowHeight()}
          width={props.size.width < MIN_WIDTH ? MIN_WIDTH : props.size.width}
        >
          {generateComponents(props.components)}
        </ResponsiveGridLayout>
      </div>
    </>
  );
};

export default sizeMe({ monitorHeight: true })(GridLayout);
