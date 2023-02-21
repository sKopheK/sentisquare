import { useCallback, useState } from 'react';

import { GraphComponent, GraphType } from '../types';

import StorageService from 'services/Storage';

import BarGraph from '../Bar';
import PieGraph from '../Pie';

const GRAPH_TYPE_MAP = {
  [GraphType.Pie]: PieGraph,
  [GraphType.Bar]: BarGraph,
};

const useGraphType = (
  key: string,
  defaultValue: GraphType
): [GraphComponent, GraphType, (type: GraphType) => void] => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const isValidGraphType = (graphType: any): graphType is GraphType => {
    return Object.keys(GRAPH_TYPE_MAP).includes(graphType);
  };

  const [graphType, setGraphType] = useState<GraphType>(() => {
    const stored = StorageService.get(key);
    return isValidGraphType(stored) ? stored : defaultValue;
  });

  const setType = useCallback(
    (type: GraphType) => {
      if (!isValidGraphType(type)) return;
      StorageService.set(key, String(type));
      setGraphType(type);
    },
    [key]
  );

  const Component = GRAPH_TYPE_MAP[graphType];

  return [Component, graphType, setType];
};

export default useGraphType;
