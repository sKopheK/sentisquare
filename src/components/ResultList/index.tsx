import { FC, useContext } from 'react';

import Accordion from 'react-bootstrap/Accordion';

import { AppContext } from '../context';

import ResultItem from 'components/ResultItem';

const ResultList: FC = () => {
  const { results } = useContext(AppContext);

  const resultData = results.read();

  return (
    <>
      {resultData.size > 0 && (
        <Accordion>
          {[...resultData].map(([sentence, resultItem]) => (
            <ResultItem key={sentence} text={sentence} entities={resultItem} />
          ))}
        </Accordion>
      )}
    </>
  );
};

export default ResultList;
