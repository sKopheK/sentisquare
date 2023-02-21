import { FC } from 'react';

import {
  Bar,
  BarChart,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import { BarGraphProps } from './types';

import { GRAPH_COLORS } from '../List/constants';
import { DEFAULT_GRAPH_HEIGHT } from '../constants';

const BarGraph: FC<BarGraphProps> = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={DEFAULT_GRAPH_HEIGHT}>
      <BarChart data={data}>
        <XAxis dataKey="name" />
        <YAxis interval={1} />
        <Tooltip />
        <Bar data={data} dataKey="value">
          {data.map((_, index) => (
            <Cell
              key={`cell-${index}`}
              fill={GRAPH_COLORS[index % GRAPH_COLORS.length]}
            />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default BarGraph;
