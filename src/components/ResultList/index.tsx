import { FC, useContext } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import { AppContext } from '../context';
import ResultItem from '../ResultItem';
import { Card } from 'react-bootstrap';

const ResultList: FC = () => {
  const { results } = useContext(AppContext);

  return (
    <Card>
      <Card.Header className="h2">Results</Card.Header>
      <Card.Body>
        {results.size > 0 && (
          <Accordion>
            {[...results].map(([sentence, resultItem]) => (
              <ResultItem
                key={sentence}
                text={sentence}
                entities={resultItem}
              />
            ))}
          </Accordion>
        )}
      </Card.Body>
    </Card>
  );
};

export default ResultList;
