// Copyright 2020 Cognite AS
import { mockDataPoints } from 'mocks/widgetsMockData/tsWideNumericMock';
import { generateXAxisVals } from './utills';

describe('time series utills', () => {
  const xAxisPointsNumber = 10;

  it('should not give empty results when input correct data', () => {
    const [convertedDps, xVals, unit] = generateXAxisVals(
      mockDataPoints,
      xAxisPointsNumber
    );
    expect(convertedDps.length).toEqual(mockDataPoints.length);
    expect(unit).not.toEqual('');
    expect(xVals).not.toEqual([]);
  });
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
  it('should not change data points which are not selected to display in x-axis', () => {
    const [convertedDps, xVals]: [any[], any, any] = generateXAxisVals(
      mockDataPoints,
      xAxisPointsNumber
    );
    let dpsWithoutXVals = [...convertedDps];
    xVals.forEach((xval: string) => {
      dpsWithoutXVals = dpsWithoutXVals.filter(
        (dp: any) => dp.timestamp !== xval
      );
    });
    dpsWithoutXVals.forEach((dp: any) =>
      expect(convertedDps).toContainEqual(dp)
    );
  });
  it('should not fail when number of xvals wanted is 1', () => {
    const [convertedDps, xVals]: [any[], any, any] = generateXAxisVals(
      mockDataPoints,
      1
    );
    expect(xVals.length).toEqual(1);
    expect(convertedDps[0]).not.toContainEqual(mockDataPoints);
  });
  it('should not fail when input empty results', () => {
    const [convertedDps, xVals] = generateXAxisVals([], 1);
    expect(convertedDps.length).toEqual(0);
    expect(xVals.length).toEqual(0);

    const [convertedDps2, xVals2] = generateXAxisVals([], -100);
    expect(convertedDps2.length).toEqual(0);
    expect(xVals2.length).toEqual(0);
  });
});
