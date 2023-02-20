import { FC } from 'react';

import { Card, CardGroup } from 'react-bootstrap';

import { GraphListProps } from './types';

import { getAllEntities, getFrequencyData } from '../helpers';

import * as Graph from '..';

const GraphList: FC<GraphListProps> = ({ results }) => {
  const entities = getAllEntities(results);
  const typeFrequencies = getFrequencyData(entities);

  return (
    <CardGroup>
      <Card>
        <Card.Header>
          <h3>Frequency</h3>
        </Card.Header>
        <Card.Body>
          <Graph.Pie data={typeFrequencies} />
        </Card.Body>
      </Card>
    </CardGroup>
  );
};

export default GraphList;
