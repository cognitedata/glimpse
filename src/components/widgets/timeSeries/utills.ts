// Copyright 2020 Cognite AS
import { AggregateDatapoint } from './interfaces';

/**
 * get time difference as a representation of array ([day,hour,minute,second] diff)
 * @param timstamp1 number (timestamp)
 * @param timestamp2 number (timestamp)
 */
function getTimeDifference(timstamp1: number, timestamp2: number) {
  let difference = Math.abs(timestamp2 - timstamp1);

  const daysDifference = Math.floor(difference / 1000 / 60 / 60 / 24);
  difference -= daysDifference * 1000 * 60 * 60 * 24;

  const hoursDifference = Math.floor(difference / 1000 / 60 / 60);
  difference -= hoursDifference * 1000 * 60 * 60;

  const minutesDifference = Math.floor(difference / 1000 / 60);
  difference -= minutesDifference * 1000 * 60;

  const secondsDifference = Math.floor(difference / 1000);
  return [
    daysDifference,
    hoursDifference,
    minutesDifference,
    secondsDifference,
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
  if (timeDiff[0] >= noOfXVals) {
    // days
    return getConvertedDataArrays(
      dpArr,
      (timestamp: number) => `${new Date(timestamp).getDate()}`,
      noOfXVals,
      `day`
    );
  }
  if (timeDiff[0] > 0) {
    // days and hours
    return getConvertedDataArrays(
      dpArr,
      (timestamp: number) => {
        const date = new Date(timestamp);
        return `${date.getDate()}|${date.getHours()}`;
      },
      noOfXVals,
      `day | hour`
    );
  }
  if (timeDiff[1] >= noOfXVals) {
    // hours
    return getConvertedDataArrays(
      dpArr,
      (timestamp: number) => `${new Date(timestamp).getHours()}`,
      noOfXVals,
      `hour`
    );
  }
  if (timeDiff[1] > 0) {
    // hours and miniutes
    return getConvertedDataArrays(
      dpArr,
      (timestamp: number) => {
        const date = new Date(timestamp);
        return `${date.getHours()}:${date.getMinutes()}`;
      },
      noOfXVals,
      `hour : minute`
    );
  }
  if (timeDiff[2] >= noOfXVals) {
    // miniutes
    return getConvertedDataArrays(
      dpArr,
      (timestamp: number) => `${new Date(timestamp).getMinutes()}`,
      noOfXVals,
      `minute`
    );
  }
  if (timeDiff[2] > 0) {
    // minuts and seconds
    return getConvertedDataArrays(
      dpArr,
      (timestamp: number) => {
        const date = new Date(timestamp);
        return `${date.getMinutes()}:${date.getSeconds()}`;
      },
      noOfXVals,
      `minute : second`
    );
  }
  // seconds
  return getConvertedDataArrays(
    dpArr,
    (timestamp: number) => `${new Date(timestamp).getSeconds()}`,
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
