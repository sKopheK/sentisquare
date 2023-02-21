import { useCallback, useState } from 'react';

import { GRAPH_TYPE_MAP, GraphComponent, GraphType } from '../types';

import StorageService from 'services/Storage';

const useTypeSwitch = (
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

export default useTypeSwitch;
