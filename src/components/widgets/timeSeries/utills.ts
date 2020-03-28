import { clone } from 'utills/utills';
import { AggregateDatapoint } from './interfaces';

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

function getNPointsFromArray(array: AggregateDatapoint[], noOfPoints: number) {
  const eqlDistance = array.length / (noOfPoints - 1);
  const pointsArr = [];
  for (let i = 0; i <= array.length; i += eqlDistance) {
    if (i >= array.length) {
      pointsArr.push(array.length - 1);
    } else pointsArr.push(Math.floor(i));
  }
  return pointsArr;
}

export function generateXAxisVals(
  dpArr: AggregateDatapoint[],
  xValCount: number
): [AggregateDatapoint[], string[], string] {
  let noOfXVals = xValCount;
  if (xValCount >= dpArr.length) {
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

function getConvertedDataArrays(
  arr: AggregateDatapoint[],
  fun: Function,
  noOfDataPoints: number,
  unit: string
): [AggregateDatapoint[], string[], string] {
  const mapedArr = clone(arr);
  const xValsIndexes = getNPointsFromArray(mapedArr, noOfDataPoints);
  const xVals = xValsIndexes.map(index => fun(arr[index].timestamp));
  xValsIndexes.forEach(index => {
    mapedArr[index].timestamp = fun(arr[index].timestamp);
  });
  return [mapedArr, xVals, unit];
}
