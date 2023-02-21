import { AxisInterval } from 'recharts/types/util/types';
import { GraphProps } from 'components/Graphs/types';

export interface BarGraphProps extends GraphProps {
  interval?: AxisInterval;
  showBrush?: boolean;
}
