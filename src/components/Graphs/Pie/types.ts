import { getTypeGraphData } from 'components/Graphs/helpers';

export interface PieGraphProps {
  data: ReturnType<typeof getTypeGraphData>;
}
