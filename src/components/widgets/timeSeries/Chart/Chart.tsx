// Copyright 2020 Cognite AS
import React from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Area,
} from 'recharts';
import {
  CHART_MARGINS,
  CHART_COLOR,
  CHART_STROKE_DASH_ARRAY,
  CHART_AREA_FILL_OPACITY,
} from 'constants/tSWideNumeric';

type Props = {
  seriesColor?: string;
  chartColor?: string;
  xAxisLabels?: string[];
  iscartesianGridEnabled?: boolean;
  data: Array<object>;
  width?: string | number;
  height?: string | number;
  xDataKey?: string;
  yDataKey?: string;
};

const Chart = ({
  seriesColor = '#f1b927',
  xAxisLabels = [],
  chartColor = CHART_COLOR,
  iscartesianGridEnabled = true,
  data,
  width = '100%',
  height = '80%',
  xDataKey = 'xValue',
  yDataKey = 'yValue',
}: Props) => {
  return (
    <ResponsiveContainer width={width} height={height}>
      <AreaChart data={data} margin={CHART_MARGINS}>
        <defs>
          <linearGradient id="seriesFillColor" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={seriesColor} stopOpacity={0.2} />
            <stop offset="95%" stopColor={seriesColor} stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis
          axisLine={false}
          tickLine={false}
          interval={0}
          dataKey={xDataKey}
          stroke={chartColor}
          ticks={xAxisLabels}
        />
        <YAxis axisLine={false} tickLine={false} stroke={chartColor} />
        {iscartesianGridEnabled && (
          <CartesianGrid
            vertical={false}
            strokeDasharray={CHART_STROKE_DASH_ARRAY}
            stroke={chartColor}
          />
        )}
        <Area
          type="monotone"
          dataKey={yDataKey}
          stroke={seriesColor}
          fillOpacity={CHART_AREA_FILL_OPACITY}
          fill="url(#seriesFillColor)"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default Chart;
