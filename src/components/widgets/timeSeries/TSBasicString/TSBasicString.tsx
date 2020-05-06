// Copyright 2020 Cognite AS
import React, { FC } from 'react';
import './TSBasicString.css';
import { useElapsedTime } from 'hooks/useElapsedTime';

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
const TSBasicString: FC<TSBasicStringProps> = (props: TSBasicStringProps) => {
  const { name, value, timestamp, isElapsedTimeEnabled } = props;
  const elapsedTime = useElapsedTime(timestamp);

  return (
    <div className="basic-string">
      <div title={name} className="name">
        {name}
      </div>
      <div className="time">{isElapsedTimeEnabled && elapsedTime}</div>
      <div className="value">{value}</div>
    </div>
  );
};

export default TSBasicString;
