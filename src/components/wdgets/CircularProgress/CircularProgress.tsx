import React from 'react';
import CircularPrograssBar from './CircularLoader/CircularLoader';
import ElapsedTime from './ElsapsedTime/ElapsedTime';
import './CircularProgress.css';

type ShiftUtilizationProps = {
  precentage: number;
  title: string;
  timeDisplayKey: string;
  time: string;
};

const ShiftUtilization = (props: ShiftUtilizationProps) => {
  const { precentage, title, timeDisplayKey, time } = props;
  return (
    <div className="card">
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

export default ShiftUtilization;
