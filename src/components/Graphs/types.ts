import { FC } from 'react';
import PieGraph from './Pie';

export enum GraphType {
  Pie = 'Pie',
}

export const GRAPH_TYPE_MAP = {
  [GraphType.Pie]: PieGraph,
};

export type GraphData = {
  name: string;
  value: number;
}[];

export interface GraphProps {
  data: GraphData;
}

export type GraphComponent = FC<GraphProps>;
