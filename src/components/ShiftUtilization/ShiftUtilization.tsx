import React from 'react';
import CircularPrograssBar from '../CircularPrograssBar/CircularPrograssBar';
import ElapsedTime from './ElsapsedTime/ElapsedTime';
import './ShiftUtilization.css';

const ShiftUtilization = (props: any) => {
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
        <CircularPrograssBar percentage={props.precentage} />
      </div>
    </div>
  );
};

export default ShiftUtilization;
