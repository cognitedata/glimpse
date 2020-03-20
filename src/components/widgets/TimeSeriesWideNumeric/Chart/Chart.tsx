import React from 'react';

import {
  ResponsiveContainer,
  AreaChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Area,
} from 'recharts';

const chartColor = '#6a7095';

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
      <AreaChart
        data={data}
        margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
      >
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
          stroke={chartColor}
          ticks={xAxisLabels}
        />
        <YAxis axisLine={false} tickLine={false} stroke={chartColor} />
        <CartesianGrid
          vertical={false}
          strokeDasharray="3 3"
          stroke={chartColor}
        />
        <Area
          type="monotone"
          dataKey="yValue"
          stroke={seriesColor}
          fillOpacity={1}
          fill="url(#seriesFillColor)"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default Chart;
