import { FC } from 'react';

import { CardGroup } from 'react-bootstrap';

import { GraphListProps } from './types';

import { getAllEntities } from '../helpers';

import FrequencyGraph from '../Frequency';

const GraphList: FC<GraphListProps> = ({ results }) => {
  const entities = getAllEntities(results);

  return (
    <CardGroup>
      <FrequencyGraph entities={entities} />
    </CardGroup>
  );
};

export default GraphList;
