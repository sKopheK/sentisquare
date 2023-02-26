import { GraphProps } from 'components/Graphs/types';
import { AxisDomain, AxisInterval } from 'recharts/types/util/types';

export interface BarGraphProps extends GraphProps {
  interval?: AxisInterval;
  showBrush?: boolean;
  yAxisDomain?: AxisDomain;
}
