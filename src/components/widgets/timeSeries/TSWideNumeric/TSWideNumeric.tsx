import React, { FC } from 'react';
import './TSWideNumeric.css';
import Chart from '../Chart/Chart';
import { generateXAxisVals } from '../utills';
import { AggregateDatapoint } from '../interfaces';

const X_DATAPOINTS_NUMBER = 25;

type Props = {
  title?: string;
  xAxisLabelFormat?: string;
  data: AggregateDatapoint[];
  width?: string | number;
  height?: string | number;
  xDataKey?: string;
  yDataKey?: string;
};

const TSWideNumeric: FC<Props> = ({
  title,
  data = [],
  width,
  height,
  xDataKey = 'timestamp',
  yDataKey = 'average',
}: Props) => {
  let [xAxisLabels, convertedDps, unitLabel]: any[] = [];
  if (data.length > 0) {
    [convertedDps, xAxisLabels, unitLabel] = generateXAxisVals(
      data,
      X_DATAPOINTS_NUMBER
    );
  }

  return (
    <div className="TimeSeriesWideNumeric">
      <div className="content">
        <div className="title">{title}</div>
        <Chart
          data={convertedDps}
          xAxisLabels={xAxisLabels}
          width={width}
          height={height}
          xDataKey={xDataKey}
          yDataKey={yDataKey}
        />
        <div className="unit-label">
          <label>{unitLabel}</label>
        </div>
      </div>
    </div>
  );
};

export default TSWideNumeric;
