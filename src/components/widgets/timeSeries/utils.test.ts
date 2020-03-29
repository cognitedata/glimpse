import { mockDataPoints } from 'mocks/widgetsMockData/tsWideNumericMock';
import { generateXAxisVals } from './utills';

describe('time series utills', () => {
  const xAxisPointsNumber = 10;

  it('should give correct number of x axis data points', () => {
    expect(
      generateXAxisVals(mockDataPoints, xAxisPointsNumber)[1].length
    ).toEqual(xAxisPointsNumber);
  });
  it('should not be change y values', () => {
    const convertedDps = generateXAxisVals(
      mockDataPoints,
      xAxisPointsNumber
    )[0];
    convertedDps.forEach((dp, i) =>
      expect(mockDataPoints[i].average).toEqual(dp.average)
    );
  });
  it('converted datapoints should contain all xdomain values', () => {
    const [convertedDps, xVals] = generateXAxisVals(
      mockDataPoints,
      xAxisPointsNumber
    );
    xVals.forEach((xVal: string) =>
      expect(convertedDps).toContainEqual({
        timestamp: xVal,
        average: expect.anything(),
      })
    );
  });
});
