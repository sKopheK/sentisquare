import { FC, useEffect, useState } from 'react';

import { Col, Row } from 'react-bootstrap';

import { NlpEntity } from 'components/types';
import { GraphListProps } from './types';

import { getAllEntities } from 'components/Graphs/helpers';

import ConfidenceGraph from 'components/Graphs/Confidence';
import FrequencyGraph from 'components/Graphs/Frequency';
import RelevanceGraph from 'components/Graphs/Relevance';

const GraphList: FC<GraphListProps> = ({ results }) => {
  const [entities, setEntities] = useState<NlpEntity[]>([]);

  useEffect(() => {
    const getResolvedData = async () => {
      setEntities(await getAllEntities(results));
    };
    getResolvedData();
  }, [results]);

  return (
    <Row xs={1} md={2} xxl={3} className="g-4">
      <Col>
        <FrequencyGraph entities={entities} />
      </Col>
      <Col>
        <ConfidenceGraph entities={entities} />
      </Col>
      <Col>
        <RelevanceGraph entities={entities} />
      </Col>
    </Row>
  );
};

export default GraphList;
