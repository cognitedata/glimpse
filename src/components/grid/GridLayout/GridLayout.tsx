// Copyright 2020 Cognite AS
import React, { FC, useEffect, useState, useRef, useCallback } from 'react';
import './GridLayout.css';
import { Responsive as ResponsiveGridLayout } from 'react-grid-layout';
import sizeMe from 'react-sizeme';
import {
  MAXROWS,
  MARGIN,
  BREAKPOINTS,
  MAXCOLS,
  IS_RESIZABLE,
  MIN_WIDTH,
  MIN_ROW_HEIGHT,
} from 'constants/grid';
import { GridLayoutProps } from '../interfaces';
import WidgetContainer from '../../../containers/WidgetContainer/WidgetContainer';

const GridLayout: FC<GridLayoutProps> = (props: GridLayoutProps) => {
  const refGridLayout = useRef() as React.MutableRefObject<HTMLInputElement>;
  const [height, setHeight] = useState(600);
  const { onDragStop, isDraggable, onLayoutChange, layouts, size } = props;

  const updateWindowDimensions = useCallback(() => {
    setHeight(
      refGridLayout.current.parentElement
        ? refGridLayout.current.parentElement.clientHeight
        : window.innerHeight
    );
  }, [refGridLayout]);

  // change gridlayout height on resize events of the browser
  useEffect(() => {
    updateWindowDimensions();
    window.addEventListener('resize', updateWindowDimensions);
    return () => window.removeEventListener('resize', updateWindowDimensions);
  }, [updateWindowDimensions]);

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
          onDragStop={onDragStop}
          isDraggable={isDraggable || false}
          onLayoutChange={onLayoutChange}
          isResizable={IS_RESIZABLE}
          margin={MARGIN}
          maxRows={MAXROWS}
          breakpoints={BREAKPOINTS}
          layouts={{ lg: layouts }}
          cols={{ lg: MAXCOLS }}
          preventCollision
          rowHeight={getRowHeight()}
          width={size.width < MIN_WIDTH ? MIN_WIDTH : size.width}
        >
          {WidgetContainer(props)}
        </ResponsiveGridLayout>
      </div>
    </>
  );
};

export default sizeMe({ monitorHeight: true })(GridLayout);
