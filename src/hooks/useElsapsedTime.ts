import { useState, useEffect } from 'react';
import moment from 'moment';

export const useElsapsedTime = (timestamp: Date) => {
  const [elapsedTime, setElapsedTime] = useState('');
  const zeroPad = (num: number) => String(num).padStart(2, '0');

  useEffect(() => {
    const counter = setInterval(() => {
      if (timestamp) {
        const diff = moment.duration(moment.utc().diff(moment.utc(timestamp)));
        const diffInFormat = `${zeroPad(diff.get('hours'))}:${zeroPad(
          diff.get('minutes')
        )}:${zeroPad(diff.get('seconds'))}`;
        setElapsedTime(diffInFormat);
      }
    }, 1000);
    return () => {
      clearInterval(counter);
    };
  }, [timestamp]);
  return elapsedTime;
};
