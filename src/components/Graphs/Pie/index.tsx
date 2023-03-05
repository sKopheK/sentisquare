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
import { DEFAULT_GRAPH_HEIGHT } from '../constants';

const PieGraph: FC<PieGraphProps> = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={DEFAULT_GRAPH_HEIGHT}>
      {data.length === 0 ? (
        <div style={{ height: DEFAULT_GRAPH_HEIGHT + 'px' }}>
          <div className="position-absolute top-50 start-50 translate-middle">
            No data to display.
          </div>
        </div>
      ) : (
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
          <Legend
            align="left"
            layout="vertical"
            verticalAlign="middle"
            iconType="wye"
          />
          <Tooltip />
        </PieChart>
      )}
    </ResponsiveContainer>
  );
};

export default PieGraph;
