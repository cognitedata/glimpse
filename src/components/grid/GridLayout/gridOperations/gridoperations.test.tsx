import { MAXCOLS, MAXROWS } from 'constants/grid';
import { Layout } from 'react-grid-layout';
import { initialLayoutMocked } from 'mocks/gridMocks';
import { getEmptyPositions } from './gridOperations';

describe('grid operations', () => {
  const width = 1;
  const height = 1;
  const layouts: Layout[] = [];

  it('should give correct initial position', () => {
    expect(
      getEmptyPositions(layouts, width, height, MAXCOLS, MAXROWS)
    ).toEqual([0, 0]);
  });

  it('should give null for wrong inputs', () => {
    expect(
      getEmptyPositions(layouts, MAXCOLS + 1, MAXROWS + 1, MAXCOLS, MAXROWS)
    ).toEqual(null);
  });

  it('should give correct results for maximum size component', () => {
    expect(
      getEmptyPositions(layouts, MAXCOLS, MAXROWS, MAXCOLS, MAXROWS)
    ).toEqual([0, 0]);
  });

  it('should give null if there is no space', () => {
    expect(
      getEmptyPositions(initialLayoutMocked, MAXCOLS, MAXROWS, MAXCOLS, MAXROWS)
    ).toEqual(null);
  });

  it('should give correct position if there is components and enough spaces', () => {
    const testlayouts: Layout[] = [
      { i: 'test1', w: 1, h: 1, x: 0, y: 0 },
      { i: 'test1', w: 2, h: 2, x: 2, y: 1 },
    ];
    expect(
      getEmptyPositions(testlayouts, width, height, MAXCOLS, MAXROWS)
    ).toEqual([1, 0]);
  });
});
