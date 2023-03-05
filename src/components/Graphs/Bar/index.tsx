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
  yAxisDomain,
  width = '100%',
}) => {
  return (
    <ResponsiveContainer width={width} height={DEFAULT_GRAPH_HEIGHT}>
      {data.length > 0 ? (
        <BarChart data={data} title="Bar chart">
          <XAxis dataKey="name" fontSize={10} />
          <YAxis interval={interval} domain={yAxisDomain} />
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
      ) : (
        <div style={{ height: DEFAULT_GRAPH_HEIGHT + 'px' }}>
          <div className="position-absolute top-50 start-50 translate-middle">
            No data to display.
          </div>
        </div>
      )}
    </ResponsiveContainer>
  );
};

export default BarGraph;
