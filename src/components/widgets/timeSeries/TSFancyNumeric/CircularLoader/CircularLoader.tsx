// Copyright 2020 Cognite AS
import React, { FC } from 'react';
import './CircularLoader.css';

type CircularBarProps = {
  sqSize?: number;
  percentage: number;
  strokeWidth?: number;
  strokeWidthPadding?: number;
};
const CircularProgressBar: FC<CircularBarProps> = (props: CircularBarProps) => {
  const {
    sqSize = 150,
    percentage = 25,
    strokeWidth = 15,
    strokeWidthPadding = 4,
  } = props;
  // sqSize -> Size of the enclosing square
  // SVG centers the stroke width on the radius, subtract out so circle fits in square
  const radius = (sqSize - strokeWidth) / 2;
  // Enclose cicle in a circumscribing square
  const viewBox = `0 0 ${sqSize} ${sqSize}`;
  // Arc length at 100% coverage is the circle circumference
  const dashArray = radius * Math.PI * 2;
  // Scale 100% coverage overlay with the actual percent
  const dashOffset = dashArray - (dashArray * percentage) / 100;

  return (
    <svg
      width={sqSize}
      height={sqSize}
      viewBox={viewBox}
      className="circular-loader"
    >
      <circle
        className="circle-background"
        cx={sqSize / 2}
        cy={sqSize / 2}
        r={radius}
        strokeWidth={`${strokeWidth}px`}
      />

      <circle
        className="circle-progress"
        cx={sqSize / 2}
        cy={sqSize / 2}
        r={radius}
        strokeWidth={`${strokeWidth - strokeWidthPadding * 2}px`}
        // Start progress marker at 12 O'Clock
        transform={`rotate(-90 ${sqSize / 2} ${sqSize / 2})`}
        style={{
          strokeDasharray: dashArray,
          strokeDashoffset: dashOffset,
        }}
      />

      <text
        className="circle-text"
        x="50%"
        y="50%"
        dy=".3em"
        textAnchor="middle"
      >
        {`${percentage.toFixed(0)}%`}
      </text>
    </svg>
  );
};

export default CircularProgressBar;
