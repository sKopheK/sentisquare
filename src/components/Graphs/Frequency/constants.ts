import PieGraph from 'components/Graphs/Pie';

export const GRAPH_TYPE_STORAGE_KEY = 'frequencyGraphType';

export enum GraphType {
  Pie,
}

export const GRAPH_TYPE_MAP = {
  [GraphType.Pie]: PieGraph,
};
