import { FC } from 'react';

import cx from 'classnames';
import { Badge, Card } from 'react-bootstrap';

import Data from 'components/Data';
import ResultList from 'components/ResultList';

import styles from './styles.module.scss';

const Layout: FC = () => {
  return (
    <main className={cx(styles.main, 'p-3')}>
      <h1 className="mb-3 d-flex justify-content-between">
        Sentisquare Code Challenge
        <Badge bg="info" className="ms-3">
          v{process.env.REACT_APP_VERSION}
        </Badge>
      </h1>
      <Card className="mb-3">
        <Card.Header className="h2">Data</Card.Header>
        <Card.Body>
          <Data />
        </Card.Body>
      </Card>
      <Card>
        <Card.Header className="h2">Results</Card.Header>
        <Card.Body>
          <ResultList />
        </Card.Body>
      </Card>
    </main>
  );
};

export default Layout;
