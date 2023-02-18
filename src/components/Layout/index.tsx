import { FC, Suspense } from 'react';

import { Card } from 'react-bootstrap';

import ResultList from 'components/ResultList';

import styles from './styles.module.scss';

const Layout: FC = () => {
  return (
    <main className={styles.main}>
      <h1>Sentisquare Code Challenge</h1>
      <Card>
        <Card.Header className="h2">Results</Card.Header>
        <Card.Body>
          <Suspense fallback="Loading...">
            <ResultList />
          </Suspense>
        </Card.Body>
      </Card>
    </main>
  );
};

export default Layout;
