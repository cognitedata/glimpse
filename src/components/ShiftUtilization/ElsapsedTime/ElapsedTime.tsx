import React from 'react';
import './ElapsedTime.css';

const ElaspedTime = (props: any) => {
  const { title, timeDisplayKey, time } = props;
  return (
    <div>
      <label className="title">{title}</label>
      <label className="time">
        {timeDisplayKey} : {time}
      </label>
    </div>
  );
};

export default ElaspedTime;
