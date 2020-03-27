import React, { FC } from 'react';
import './TSWideNumeric.css';
import Chart from '../Chart/Chart';

type Props = {
  title?: string;
  xAxisLabelFormat?: string;
  data: Array<object>;
  width?: string | number;
  height?: string | number;
};

const TSWideNumeric: FC<Props> = ({
  title,
  data = [],
  width,
  height,
}: Props) => {
  const xAxisLabels = data
    .map((item: any) => item.xValue)
    .filter((value, index, self) => self.indexOf(value) === index);

  return (
    <div className="TimeSeriesWideNumeric">
      <div className="content">
        <div className="title">{title} </div>
        <Chart
          data={data}
          xAxisLabels={xAxisLabels}
          width={width}
          height={height}
        />
      </div>
    </div>
  );
};

export default TSWideNumeric;
