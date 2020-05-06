// Copyright 2020 Cognite AS
import React, { FC } from 'react';
import './ElapsedTime.css';

type ElaspedTimeProps = {
  title: string;
  timeDisplayKey: string;
  time: string;
};
const ElaspedTime: FC<ElaspedTimeProps> = (props: ElaspedTimeProps) => {
  const { title, timeDisplayKey, time } = props;
  return (
    <div className="elasped-time">
      <div title={title} className="title">
        {title}
      </div>
      <div className="time">
        {' '}
        {timeDisplayKey} : {time}{' '}
      </div>
    </div>
  );
};

export default ElaspedTime;
