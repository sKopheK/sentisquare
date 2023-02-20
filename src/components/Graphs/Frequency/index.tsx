import { FC, useState } from 'react';

import { Card } from 'react-bootstrap';

import { GraphProps } from 'components/Graphs/types';
import { FrequencyGraphProps } from './types';

import { GRAPH_TYPE_MAP, GRAPH_TYPE_STORAGE_KEY, GraphType } from './constants';

import { getFrequencyData } from 'components/Graphs/helpers';

import StorageService from 'services/Storage';

const FrequencyGraph: FC<FrequencyGraphProps> = ({ entities }) => {
  const typeFrequencies = getFrequencyData(entities);

  const [GraphComponent, setGraphComponent] = useState<FC<GraphProps>>(
    () =>
      GRAPH_TYPE_MAP[
        StorageService.get(GRAPH_TYPE_STORAGE_KEY) as unknown as GraphType
      ] ?? GRAPH_TYPE_MAP[GraphType.Pie]
  );

  return (
    <Card>
      <Card.Header>
        <h3>Frequency</h3>
      </Card.Header>
      <Card.Body>
        <GraphComponent data={typeFrequencies} />
      </Card.Body>
    </Card>
  );
};

export default FrequencyGraph;
