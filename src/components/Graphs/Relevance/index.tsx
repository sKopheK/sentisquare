import { FC, useState } from 'react';

import { Card } from 'react-bootstrap';

import { FrequencyGraphProps } from './types';

import {
  getDataWithinRange,
  getMaximumValue,
  getRelevanceData,
} from './helpers';

import BarGraph from 'components/Graphs/Bar';
import ValueRange from '../ValueRange';
import { MIN_VALUE } from './constants';
import { DEFAULT_GRAPH_HEIGHT } from '../constants';

const RelevanceGraph: FC<FrequencyGraphProps> = ({ entities }) => {
  const relevanceData = getRelevanceData(entities);
  const maxValue = getMaximumValue(relevanceData);

  const [values, setValues] = useState([MIN_VALUE, maxValue]);

  const filteredData = getDataWithinRange(relevanceData, values[0], values[1]);

  return (
    <Card>
      <Card.Header>
        <h3 className="m-0">Relevance</h3>
        <p className="mb-0 text-muted text-truncate">
          Relevance this entity has to the source text, scale 0-1.
        </p>
      </Card.Header>
      <Card.Body className="d-flex align-items-start">
        <div className="ms-3 pt-1">
          <ValueRange
            min={MIN_VALUE}
            max={maxValue}
            setValues={setValues}
            step={0.1}
            values={values}
            height={DEFAULT_GRAPH_HEIGHT * 0.78}
          />
        </div>
        <BarGraph data={filteredData} interval={0} />
      </Card.Body>
    </Card>
  );
};

export default RelevanceGraph;
