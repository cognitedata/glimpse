import { Layout } from 'react-grid-layout';

const getGridMap = (layout: Layout[], cols: number, rows: number) => {
  const matrix = new Array(cols).fill(0).map(() => new Array(rows).fill(0));
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

const isWidthAvailable = (
  matrix: number[][],
  x: number,
  y: number,
  width: number
) => {
  for (let i = x; i <= x + width - 1; i++) {
    if (matrix[i][y] === 1) {
      return false;
    }
  }
  return true;
};

const isHeightAvailable = (
  matrix: number[][],
  x: number,
  y: number,
  height: number
) => {
  for (let j = y; j <= y + height - 1; j++) {
    if (matrix[x][j] === 1) {
      return false;
    }
  }
  return true;
};

export const getEmptyPositions = (
  layout: any,
  width: number,
  height: number,
  cols: number,
  rows: number
) => {
  const matrix = getGridMap(layout, cols, rows);
  for (let j = 0; j + height <= rows; j++) {
    for (let i = 0; i + width <= cols; i++) {
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
