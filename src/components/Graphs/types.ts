import { FC } from 'react';

export enum GraphType {
  Pie = 'Pie',
  Bar = 'Bar',
}

export type GraphData = {
  name: string;
  value: number;
}[];

export interface GraphProps {
  data: GraphData;
}

export type GraphComponent = FC<GraphProps>;
