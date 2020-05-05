// Copyright 2020 Cognite AS
import { Layout } from 'react-grid-layout';
import { WidgetConfig } from 'components/grid/interfaces';
import WIDGET_SETTINGS from 'constants/widgetSettings';
import findIndex from 'lodash/findIndex';

/**
 * Get calculated matrix related to the given layout
 * empty positions marked as 0, filled with components marked as 1
 * @param layout layOuts array
 * @param maxCols
 * @param maxRows
 */
const getGridMap = (layout: Layout[], maxCols: number, maxRows: number) => {
  const matrix = new Array(maxCols)
    .fill(0)
    .map(() => new Array(maxRows).fill(0));
  layout.forEach(compDetails => {
    const { x, y, w, h } = compDetails;
    for (let i = x; i <= x + w - 1; i++) {
      for (let j = y; j <= y + h - 1; j++) {
        matrix[i][j] = 1;
      }
    }
  });
  return matrix;
};

/**
 * is this given number of empty coloumns avialble from given cordinate.
 * @param matrix
 * @param x x-cordinate of the matrix,
 * @param y y-cordinate of the matrix,
 * @param width number of coloumns need from the given position
 */
const isWidthAvailable = (
  matrix: number[][],
  x: number,
  y: number,
  width: number
): boolean => {
  for (let i = x; i <= x + width - 1; i++) {
    if (matrix[i][y] === 1) {
      return false;
    }
  }
  return true;
};

/**
 * is this given number of empty rows avialble from given cordinate.
 * @param matrix
 * @param x x-cordinate of the matrix,
 * @param y y-cordinate of the matrix,
 * @param height number of rows need from the given position
 */
const isHeightAvailable = (
  matrix: number[][],
  x: number,
  y: number,
  height: number
): boolean => {
  for (let j = y; j <= y + height - 1; j++) {
    if (matrix[x][j] === 1) {
      return false;
    }
  }
  return true;
};

/**
 * return first empty position cordinate ([x,y]) if availble, else none
 * @param layouts
 * @param width
 * @param height
 * @param maxCols
 * @param maxRows
 */
export const getEmptyPositions = (
  layouts: Layout[],
  width: number,
  height: number,
  maxCols: number,
  maxRows: number
): [number, number] | null => {
  const matrix = getGridMap(layouts, maxCols, maxRows);
  for (let j = 0; j + height <= maxRows; j++) {
    for (let i = 0; i + width <= maxCols; i++) {
      if (
        isWidthAvailable(matrix, i, j, width) &&
        isHeightAvailable(matrix, i, j, height)
      ) {
        return [i, j];
      }
    }
  }
  return null;
};
/**
 * return gridLayout for a given widget-config
 * @param widgetConfig
 */
export const getGridLayout = (widgetConfig: WidgetConfig): Layout => {
  const { i, cordinates, layout, widgetTypeId } = widgetConfig;
  const isStatic = layout?.static;
  const [w, h] = WIDGET_SETTINGS[widgetTypeId].size;
  return { i, x: cordinates[0], y: cordinates[1], static: isStatic, w, h };
};
/**
 * change given wigetConfigs array cordinates with given layouts array
 * @param layouts
 * @param widgetConf
 */
export const setCordinatesFromLayouts = (
  layouts: Layout[],
  widgetConf: WidgetConfig[]
) => {
  const newWidgetConfigs = [...widgetConf];
  layouts.forEach(layout => {
    const { i, x, y } = layout;
    const index = findIndex(widgetConf, { i });
    if (index !== -1) {
      const newWidgetConfig: WidgetConfig = {
        ...widgetConf[index],
        cordinates: [x, y],
      };
      newWidgetConfigs[index] = newWidgetConfig;
    }
  });
  return newWidgetConfigs;
};
