import { FC, useEffect, useState } from 'react';

import { Card } from 'react-bootstrap';

import { RelevanceGraphProps } from './types';

import {
  getDataWithinRange,
  getMaximumValue,
  getRelevanceData,
} from './helpers';

import BarGraph from 'components/Graphs/Bar';
import ValueRange from '../ValueRange';
import { DEFAULT_GRAPH_HEIGHT } from '../constants';
import { HEIGHT_CORRECTION, MIN_VALUE, RANGE_STEPS_AMOUNT } from './constants';

const RelevanceGraph: FC<RelevanceGraphProps> = ({ entities }) => {
  const relevanceData = getRelevanceData(entities);
  const maxValue = getMaximumValue(relevanceData);

  const [range, setRange] = useState([MIN_VALUE, maxValue]);

  useEffect(() => {
    setRange([MIN_VALUE, maxValue]);
  }, [maxValue]);

  const filteredData = getDataWithinRange(relevanceData, range[0], range[1]);
  const step = (maxValue - MIN_VALUE) / RANGE_STEPS_AMOUNT;

  return (
    <Card>
      <Card.Header>
        <h3 className="m-0">Relevance</h3>
        <p className="mb-0 text-muted text-truncate">
          Relevance this entity has to the source text, scale 0-1.
        </p>
      </Card.Header>
      <Card.Body className="d-flex align-items-start position-relative">
        {filteredData.length > 0 && (
          <div className="ms-3 pt-1">
            <ValueRange
              min={MIN_VALUE}
              max={maxValue}
              setValues={setRange}
              step={step}
              values={range}
              height={DEFAULT_GRAPH_HEIGHT * HEIGHT_CORRECTION}
            />
          </div>
        )}
        <BarGraph
          data={filteredData}
          interval={0}
          yAxisDomain={['auto', maxValue]}
        />
      </Card.Body>
    </Card>
  );
};

export default RelevanceGraph;
