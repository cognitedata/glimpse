import React from 'react';
import CircularPrograssBar from './CircularLoader/CircularLoader';
import ElapsedTime from './ElsapsedTime/ElapsedTime';
import './CircularProgress.css';

type ShiftUtilizationProps = {
  precentage: number;
};
const ShiftUtilization = (props: ShiftUtilizationProps) => {
  return (
    <div className="card">
      <div>
        <ElapsedTime
          title="Shift Utilization"
          timeDisplayKey="Elapsed Time - Job"
          time="33:58:18"
        />
      </div>
      <div className="progress-circle">
        <div className="inner">
          <CircularPrograssBar percentage={props.precentage} />
        </div>
      </div>
    </div>
  );
};

export default ShiftUtilization;
