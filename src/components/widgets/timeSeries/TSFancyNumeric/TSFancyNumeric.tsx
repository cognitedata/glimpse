import React, { FC } from 'react';
import CircularPrograssBar from './CircularLoader/CircularLoader';
import ElapsedTime from './ElsapsedTime/ElapsedTime';
import './TSFancyNumeric.css';
import { TSFancyNumericProps } from './interfaces';

export const TSFancyNumeric: FC<TSFancyNumericProps> = (
  props: TSFancyNumericProps
) => {
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
