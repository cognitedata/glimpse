import React, { FC, useEffect, useState } from 'react';
import moment from 'moment';
import './TSBasicString.css';

type TSBasicStringProps = {
  name: string;
  value: string;
  timestamp: Date;
  isElapsedTimeEnabled: boolean;
};
/**
 * Display custom name for time series, elapsed time since latest datapoint and a sting value
 * @param props TSBasicStringProps
 */

const zeroPad = (num: number) => String(num).padStart(2, '0');

const TSBasicString: FC<TSBasicStringProps> = (props: TSBasicStringProps) => {
  const { name, value, timestamp, isElapsedTimeEnabled } = props;

  const [elapsedTime, setElapsedTime] = useState('');

  useEffect(() => {
    const counter = setInterval(() => {
      if (isElapsedTimeEnabled && timestamp) {
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
  }, [timestamp]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="basic-string">
      <label className="name">{name}</label>
      <label className="time">{elapsedTime}</label>
      <label className="value">{value}</label>
    </div>
  );
};

export default TSBasicString;
