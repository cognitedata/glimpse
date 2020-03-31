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
      <label className="title">{title}</label>
      <label className="time">
        {timeDisplayKey} : {time}
      </label>
    </div>
  );
};

export default ElaspedTime;
