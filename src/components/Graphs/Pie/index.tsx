import { FC } from 'react';

import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';

import { PieGraphProps } from './types';

import { GRAPH_COLORS } from '../List/constants';

const PieGraph: FC<PieGraphProps> = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={data}
          dataKey="value"
          cx="50%"
          cy="50%"
          outerRadius={70}
          label
          labelLine
        >
          {data.map((_, index) => (
            <Cell
              key={`cell-${index}`}
              fill={GRAPH_COLORS[index % GRAPH_COLORS.length]}
            />
          ))}
        </Pie>
        <Legend layout="vertical" verticalAlign="bottom" iconType="wye" />
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default PieGraph;