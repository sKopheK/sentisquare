import { FC } from 'react';

import { Col, Row } from 'react-bootstrap';

import { GraphListProps } from './types';

import { getAllEntities } from 'components/Graphs/helpers';

import ConfidenceGraph from 'components/Graphs/Confidence';
import FrequencyGraph from 'components/Graphs/Frequency';

const GraphList: FC<GraphListProps> = ({ results }) => {
  const entities = getAllEntities(results);

  return (
    <Row xs={1} lg={2} className="g-4">
      <Col>
        <FrequencyGraph entities={entities} />
      </Col>
      <Col>
        <ConfidenceGraph entities={entities} />
      </Col>
    </Row>
  );
};

export default GraphList;
