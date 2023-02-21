import { FC } from 'react';

import { Card } from 'react-bootstrap';

import { ConfidenceGraphProps } from './types';

import { getConfidenceData } from './helpers';

import BarGraph from 'components/Graphs/Bar';

const ConfidenceGraph: FC<ConfidenceGraphProps> = ({ entities }) => {
  const confidenceData = getConfidenceData(entities);

  return (
    <Card>
      <Card.Header>
        <h3 className="m-0">Confidence</h3>
        <p className="mb-0 text-muted text-truncate">
          The confidence that TextRazor is correct that this is a valid entity.
        </p>
      </Card.Header>
      <Card.Body>
        <BarGraph data={confidenceData} />
      </Card.Body>
    </Card>
  );
};

export default ConfidenceGraph;
