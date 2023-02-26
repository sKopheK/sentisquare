import { FC, Suspense, useContext } from 'react';

import { Alert, Button, Spinner } from 'react-bootstrap';
import Accordion from 'react-bootstrap/Accordion';
import { ErrorBoundary } from 'react-error-boundary';

import { ActionType } from 'components/constants';

import { AppContext } from 'components/context';

import GraphList from 'components/Graphs/List';
import ResultItem from 'components/ResultItem';
import ErrorMessage from './error';

const ResultList: FC = () => {
  const { results, hasMoreResults, dispatch } = useContext(AppContext);

  const handleLoadMore = () => dispatch([ActionType.loadMore]);

  const isResultsLoaded = Object.keys(results).length > 0;

  return (
    <>
      {isResultsLoaded && (
        <>
          <Accordion>
            {results.map(([sentence, entries], i) => (
              <ErrorBoundary
                FallbackComponent={ErrorMessage}
                key={i}
                onError={(error) => {
                  dispatch([ActionType.replaceLastError, error.message]);
                }}
              >
                <Suspense
                  fallback={
                    <div className="d-flex align-center h3">
                      <Spinner
                        animation="border"
                        role="status"
                        className="me-2"
                      />
                      Loading...
                    </div>
                  }
                >
                  <ResultItem text={sentence} entities={entries} />
                </Suspense>
              </ErrorBoundary>
            ))}
          </Accordion>
        </>
      )}

      {hasMoreResults && (
        <Button onClick={handleLoadMore} className="mt-3">
          Load more
        </Button>
      )}

      {isResultsLoaded && (
        <div className="mt-4">
          <GraphList results={results} />
        </div>
      )}
    </>
  );
};

export default ResultList;
