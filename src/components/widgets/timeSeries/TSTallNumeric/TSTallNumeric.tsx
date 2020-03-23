import React, { FC } from 'react';
import './TSTallNumeric.css';
import Chart from '../Chart/Chart';
import TSBasicNumeric from '../TSBasicNumeric/TSBasicNumeric';
import { TSBasicNumericProps } from '../TSBasicNumeric/interfaces';

type TSTallNumericProps = TSBasicNumericProps & {
  xAxisLabelFormat?: string;
  data: Array<object>;
  width?: string | number;
  height?: string | number;
};

const TSTallNumeric: FC<TSTallNumericProps> = ({
  data,
  width,
  height,
  name,
  value,
  unit,
}: TSTallNumericProps) => {
  const xAxisLabels = data
    .map((item: any) => item.xValue)
    .filter((val, index, self) => self.indexOf(val) === index);

  return (
    <div className="ts-tall-numeric">
      <div className="ts-basic-numeric">
        <TSBasicNumeric name={name} value={value} unit={unit} />
      </div>
      <div className="content">
        <Chart
          data={data}
          xAxisLabels={xAxisLabels}
          width={width}
          height={height}
          iscartesianGridEnabled={false}
          seriesColor="black"
          chartColor="#936f27"
        />
      </div>
    </div>
  );
};

export default TSTallNumeric;
