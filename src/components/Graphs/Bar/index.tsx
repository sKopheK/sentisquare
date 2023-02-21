import { FC } from 'react';

import {
  Bar,
  BarChart,
  Brush,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import { BarGraphProps } from './types';

import { GRAPH_COLORS } from '../List/constants';
import { DEFAULT_GRAPH_HEIGHT } from '../constants';

const BarGraph: FC<BarGraphProps> = ({
  data,
  interval = 1,
  showBrush = true,
}) => {
  return (
    <ResponsiveContainer width="100%" height={DEFAULT_GRAPH_HEIGHT}>
      <BarChart data={data}>
        <XAxis dataKey="name" />
        <YAxis interval={interval} />
        <Tooltip />
        <Bar dataKey="value">
          {data.map((_, index) => (
            <Cell
              key={`cell-${index}`}
              fill={GRAPH_COLORS[index % GRAPH_COLORS.length]}
            />
          ))}
        </Bar>
        {showBrush && <Brush dataKey="name" height={25} stroke="#999" />}
      </BarChart>
    </ResponsiveContainer>
  );
};

export default BarGraph;
