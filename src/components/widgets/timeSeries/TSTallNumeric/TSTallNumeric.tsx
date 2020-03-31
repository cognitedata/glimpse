// Copyright 2020 Cognite AS
import React, { FC, useMemo } from 'react';
import './TSTallNumeric.css';
import Chart from '../Chart/Chart';
import TSBasicNumeric from '../TSBasicNumeric/TSBasicNumeric';
import { TSBasicNumericProps } from '../TSBasicNumeric/interfaces';
import { generateXAxisVals } from '../utills';
import { AggregateDatapoint } from '../interfaces';

const X_DATAPOINTS_NUMBER = 9;

type TSTallNumericProps = TSBasicNumericProps & {
  xAxisLabelFormat?: string;
  data: AggregateDatapoint[];
  width?: string | number;
  height?: string | number;
};
/**
 * Show a latest datapoint's numeric value with unit for a time series and the timeseries chart.
 * @param props TSTallNumericProps
 */
const TSTallNumeric: FC<TSTallNumericProps> = (props: TSTallNumericProps) => {
  const { data = [], width, height, name, value, unit } = props;
  const [convertedDps, xAxisLabels, unitLabel] = useMemo(
    () => generateXAxisVals(data, X_DATAPOINTS_NUMBER),
    [data]
  );
  return (
    <div className="ts-tall-numeric">
      <div className="ts-basic-numeric">
        <TSBasicNumeric name={name} value={value} unit={unit} />
      </div>
      <div className="content">
        <Chart
          data={convertedDps}
          xAxisLabels={xAxisLabels}
          width={width}
          height={height}
          iscartesianGridEnabled={false}
          seriesColor="black"
          chartColor="#936f27"
          xDataKey="timestamp"
          yDataKey="average"
        />
        <div className="unit-label">
          <label>{unitLabel}</label>
        </div>
      </div>
    </div>
  );
};

export default TSTallNumeric;
