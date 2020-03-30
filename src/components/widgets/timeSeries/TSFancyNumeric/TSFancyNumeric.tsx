import React, { FC } from 'react';
import { useElsapsedTime } from 'hooks/useElsapsedTime';
import CircularPrograssBar from './CircularLoader/CircularLoader';
import ElapsedTime from './ElsapsedTime/ElapsedTime';
import './TSFancyNumeric.css';
import { TSFancyNumericProps } from './interfaces';

export const TSFancyNumeric: FC<TSFancyNumericProps> = (
  props: TSFancyNumericProps
) => {
  const { precentage, title, timeDisplayKey, timestamp = new Date() } = props;
  const elapsedTime = useElsapsedTime(timestamp);
  return (
    <div className="circular-progress">
      <div>
        <ElapsedTime
          title={title}
          timeDisplayKey={timeDisplayKey}
          time={elapsedTime}
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
