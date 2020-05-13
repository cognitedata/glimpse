// Copyright 2020 Cognite AS
import moment from 'moment';
import { AggregateDatapoint } from './interfaces';

/**
 * get time difference as a representation of array ([day,hour,minute,second] diff)
 * @param timestamp1 number (timestamp)
 * @param timestamp2 number (timestamp)
 */
function getTimeDifference(timestamp1: number, timestamp2: number) {
  const timeA = moment(timestamp2);
  const timeB = moment(timestamp1);

  return [
    Math.abs(Math.floor(timeA.diff(timeB, 'days', true))),
    Math.abs(Math.floor(timeA.diff(timeB, 'hours', true))),
    Math.abs(Math.floor(timeA.diff(timeB, 'minutes', true))),
    Math.abs(Math.floor(timeA.diff(timeB, 'seconds', true))),
  ];
}

/**
 * get equal distance points from a given array
 * @param array AggregateDatapoint[]
 * @param noOfPoints number
 */
function getNPointsFromArray(array: AggregateDatapoint[], noOfPoints: number) {
  const pointsArr: number[] = [];
  if (noOfPoints <= 1) {
    return [0];
  }
  const eqlDistance = array.length / (noOfPoints - 1);
  for (let i = 0; i <= array.length; i += eqlDistance) {
    if (i >= array.length) {
      pointsArr.push(array.length - 1);
    } else pointsArr.push(Math.floor(i));
  }
  return pointsArr;
}

/**
 * conditionally return converted x axis and unit according to number of xpoints wanted
 * @param dpArr AggregateDatapoint[]
 * @param noOfPoints number
 */

export function generateXAxisVals(
  dpArr: AggregateDatapoint[],
  noOfPoints: number
): [AggregateDatapoint[], string[], string] {
  let noOfXVals = noOfPoints;
  if (dpArr.length === 0) {
    return [[], [], ''];
  }
  if (noOfPoints >= dpArr.length) {
    noOfXVals = dpArr.length;
  }
  const timeDiff = getTimeDifference(
    dpArr[0].timestamp,
    dpArr[dpArr.length - 1].timestamp
  );
  if (timeDiff[0] >= noOfXVals - 1) {
    // days
    return getConvertedDataArrays(
      dpArr,
      (timestamp: number) => moment(timestamp).format('DD'),
      noOfXVals,
      `day`
    );
  }
  if (timeDiff[0] > 0) {
    // days and hours
    return getConvertedDataArrays(
      dpArr,
      (timestamp: number) => moment(timestamp).format('D|H'),
      noOfXVals,
      `day | hour`
    );
  }
  if (timeDiff[1] >= noOfXVals - 1) {
    // hours
    return getConvertedDataArrays(
      dpArr,
      (timestamp: number) => moment(timestamp).format('H'),
      noOfXVals,
      `hour`
    );
  }
  if (timeDiff[1] > 0) {
    // hours and miniutes
    return getConvertedDataArrays(
      dpArr,
      (timestamp: number) => moment(timestamp).format('H:m'),
      noOfXVals,
      `hour : minute`
    );
  }
  if (timeDiff[2] >= noOfXVals - 1) {
    // miniutes
    return getConvertedDataArrays(
      dpArr,
      (timestamp: number) => moment(timestamp).format('m'),
      noOfXVals,
      `minute`
    );
  }
  if (timeDiff[2] > 0) {
    // minuts and seconds
    return getConvertedDataArrays(
      dpArr,
      (timestamp: number) => moment(timestamp).format('m:s'),
      noOfXVals,
      `minute : second`
    );
  }
  // seconds
  return getConvertedDataArrays(
    dpArr,
    (timestamp: number) => moment(timestamp).format('s'),
    noOfXVals,
    `seconds`
  );
}

/**
 * get converted aggregation points as [convertedAggrPointsArray, xAxisValArray, unit]
 * @param arr AggregateDatapoint[]
 * @param fun Function
 * @param noOfDataPoints number
 * @param unit string
 */
function getConvertedDataArrays(
  arr: AggregateDatapoint[],
  fun: Function,
  noOfDataPoints: number,
  unit: string
): [AggregateDatapoint[], string[], string] {
  const mapedArr = [...arr];
  const xValsIndexes: number[] = getNPointsFromArray(mapedArr, noOfDataPoints);
  const xVals: string[] = [];
  xValsIndexes.forEach((index: number) => {
    xVals.push(fun(arr[index].timestamp));
    mapedArr[index] = {
      ...mapedArr[index],
      timestamp: fun(arr[index].timestamp),
    };
  });
  return [mapedArr, xVals, unit];
}
