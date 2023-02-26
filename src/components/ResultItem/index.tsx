import { FC, useState } from 'react';

import Accordion from 'react-bootstrap/Accordion';
import Table from 'react-bootstrap/Table';

import { NlpEntity } from 'components/types';
import { ResultItemProps } from './types';

import ErrorMessage from 'components/ResultList/error';
import TextHighlight from 'components/TextHighlight';

import styles from './styles.module.scss';

const ResultItem: FC<ResultItemProps> = ({ text, entities }) => {
  const [highlightedEntity, setHighlightedEntity] = useState<NlpEntity>();

  const entityData = entities.read();

  return (
    <>
      {!Array.isArray(entityData) ? (
        <ErrorMessage error={{ name: '', message: entityData }} />
      ) : (
        <Accordion.Item eventKey={text}>
          <Accordion.Header as="h3" className={styles.wrap}>
            <TextHighlight
              content={text}
              entities={entityData}
              highlightedEntity={highlightedEntity}
              setHighlightedEntity={setHighlightedEntity}
            />
          </Accordion.Header>
          <Accordion.Body>
            {entityData.length === 0 ? (
              <p>No entities discovered.</p>
            ) : (
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Entity</th>
                    <th>Type</th>
                    <th>Confidence Score</th>
                    <th>Relevance Score</th>
                    <th>Link</th>
                  </tr>
                </thead>
                <tbody>
                  {entityData.map((entity) => (
                    <tr
                      key={entity.id}
                      onMouseEnter={() => setHighlightedEntity(entity)}
                      onMouseLeave={() => setHighlightedEntity(undefined)}
                      className={
                        highlightedEntity === entity ? styles.active : ''
                      }
                    >
                      <td>{entity.id}</td>
                      <td>{entity.entityId}</td>
                      <td>
                        {Array.isArray(entity.type) && (
                          <ul>
                            {entity.type.map((type, i) => (
                              <li key={`${type}${i}`}>{type}</li>
                            ))}
                          </ul>
                        )}
                      </td>
                      <td>{entity.confidenceScore}</td>
                      <td>{entity.relevanceScore}</td>
                      <td>
                        {entity.wikiLink && <a href={entity.wikiLink}>Wiki</a>}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            )}
          </Accordion.Body>
        </Accordion.Item>
      )}
    </>
  );
};

export default ResultItem;
