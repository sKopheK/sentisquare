import { getTypeGraphData } from 'components/Graphs/List/helpers';

export interface PieGraphProps {
  data: ReturnType<typeof getTypeGraphData>;
}
