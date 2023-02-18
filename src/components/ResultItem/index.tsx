import { FC } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import Table from 'react-bootstrap/Table';
import { ResultItemProps } from './types';

const ResultItem: FC<ResultItemProps> = ({ text, entities }) => {
  return (
    <Accordion.Item eventKey={text}>
      <Accordion.Header>{text}</Accordion.Header>
      <Accordion.Body>
        {entities.length === 0 ? (
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
              {entities.map((entity) => (
                <tr key={entity.id}>
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
  );
};

export default ResultItem;
