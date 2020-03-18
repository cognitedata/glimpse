import React from 'react';
import CircularPrograssBar from './CircularLoader/CircularLoader';
import ElapsedTime from './ElsapsedTime/ElapsedTime';
import './CircularProgress.css';
import { CircularProgressBarProps } from './interfaces';

export const CircularProgress = (props: CircularProgressBarProps) => {
  const { precentage, title, timeDisplayKey, time } = props;
  return (
    <div className="circular-progress">
      <div>
        <ElapsedTime
          title={title}
          timeDisplayKey={timeDisplayKey}
          time={time}
        />
      </div>
      <div className="progress-circle">
        <div className="inner">
          <CircularPrograssBar percentage={precentage} />
        </div>
      </div>
    </div>
  );
};
