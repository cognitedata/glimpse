import React, { FC } from 'react';
import './TSWideNumeric.css';
import Chart from '../Chart/Chart';
import { generateXAxisVals } from '../utills';
import { AggregateDatapoint } from '../interfaces';

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
  let [xAxisLabels, convertedDps, unit]: any[] = [];
  if (data.length > 0) {
    [convertedDps, xAxisLabels, unit] = generateXAxisVals(data, 25);
  }

  return (
    <div className="TimeSeriesWideNumeric">
      <div className="content">
        <div className="title">
          {title}
          {` ( ${unit} )`}
        </div>
        <Chart
          data={convertedDps}
          xAxisLabels={xAxisLabels}
          width={width}
          height={height}
          xDataKey={xDataKey}
          yDataKey={yDataKey}
        />
      </div>
    </div>
  );
};

export default TSWideNumeric;
