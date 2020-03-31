// Copyright 2020 Cognite AS
import React, { FC } from 'react';
import './TSBasicString.css';
import { useElsapsedTime } from 'hooks/useElsapsedTime';

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
  const elapsedTime = useElsapsedTime(timestamp);

  return (
    <div className="basic-string">
      <label className="name">{name}</label>
      <label className="time">{isElapsedTimeEnabled && elapsedTime}</label>
      <label className="value">{value}</label>
    </div>
  );
};

export default TSBasicString;
