import React from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Area,
} from 'recharts';
import * as chartConstants from '../../../../constants/timeSeriesWideNumeric';

type Props = {
  seriesColor?: string;
  xAxisLabels?: string[];
  data: Array<object>;
  width?: string | number;
  height?: string | number;
};

const Chart = ({
  seriesColor = '#f1b927',
  xAxisLabels = [],
  data,
  width = '100%',
  height = '80%',
}: Props) => {
  return (
    <ResponsiveContainer width={width} height={height}>
      <AreaChart data={data} margin={chartConstants.CHART_MARGINS}>
        <defs>
          <linearGradient id="seriesFillColor" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={seriesColor} stopOpacity={0.2} />
            <stop offset="95%" stopColor={seriesColor} stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis
          axisLine={false}
          tickLine={false}
          dataKey="xValue"
          stroke={chartConstants.CHART_COLOR}
          ticks={xAxisLabels}
        />
        <YAxis
          axisLine={false}
          tickLine={false}
          stroke={chartConstants.CHART_COLOR}
        />
        <CartesianGrid
          vertical={false}
          strokeDasharray={chartConstants.CHART_STROKE_DASH_ARRAY}
          stroke={chartConstants.CHART_COLOR}
        />
        <Area
          type="monotone"
          dataKey="yValue"
          stroke={seriesColor}
          fillOpacity={chartConstants.CHART_AREA_FILL_OPACITY}
          fill="url(#seriesFillColor)"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default Chart;
