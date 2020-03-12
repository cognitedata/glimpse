import { Layout } from 'react-grid-layout';

/**
 * Get calculated matrix related to given layout
 * empty positions marked as 0, filled with components marked as 1
 * @param layout layOuts array
 * @param maxCols
 * @param maxRows
 */
const getGridMap = (layout: Layout[], maxCols: number, maxRows: number) => {
  const matrix = new Array(maxCols)
    .fill(0)
    .map(() => new Array(maxRows).fill(0));
  layout.forEach((compDetails: any) => {
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
 * @param layout
 * @param width
 * @param height
 * @param maxCols
 * @param maxRows
 */
export const getEmptyPositions = (
  layout: any,
  width: number,
  height: number,
  maxCols: number,
  maxRows: number
) => {
  const matrix = getGridMap(layout, maxCols, maxRows);
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
