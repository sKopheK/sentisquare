import { FC } from 'react';

import { Card } from 'react-bootstrap';
import { BsFillBarChartFill, BsPieChartFill } from 'react-icons/bs';

import { SwitchGraphType } from 'components/Graphs/TypeSwitch/types';
import { GraphType } from 'components/Graphs/types';
import { FrequencyGraphProps } from './types';

import { GRAPH_TYPE_STORAGE_KEY } from './constants';

import { getFrequencyData } from './helpers';

import useGraphType from 'components/Graphs/TypeSwitch/hooks';

import TypeSwitch from 'components/Graphs/TypeSwitch';

const frequencyGraphTypes: SwitchGraphType[] = [
  {
    icon: <BsPieChartFill />,
    label: 'Pie',
    type: GraphType.Pie,
  },
  {
    icon: <BsFillBarChartFill />,
    label: 'Bar',
    type: GraphType.Bar,
  },
];

const FrequencyGraph: FC<FrequencyGraphProps> = ({ entities }) => {
  const typeFrequencies = getFrequencyData(entities);

  const [GraphComponent, graphType, setGraphType] = useGraphType(
    GRAPH_TYPE_STORAGE_KEY,
    GraphType.Pie
  );

  return (
    <Card>
      <Card.Header className="d-flex justify-content-between align-center">
        <h3>Frequency</h3>
        <TypeSwitch
          blockId={GRAPH_TYPE_STORAGE_KEY}
          selected={graphType}
          setType={setGraphType}
          types={frequencyGraphTypes}
        />
      </Card.Header>
      <Card.Body>
        <GraphComponent data={typeFrequencies} />
      </Card.Body>
    </Card>
  );
};

export default FrequencyGraph;
