import { render, waitFor } from '@testing-library/react';
import { wrapPromise } from 'helpers/wrapPromise';
import ResultItem from '.';
import { NlpEntity } from 'components/types';

describe('ResultItem component', () => {
  it('should render component', () => {
    expect(() =>
      render(
        <ResultItem
          entity={wrapPromise(Promise.resolve('error happened'))}
          content="Lorem Ipsum dolor sit amet, consectetur adip"
          accordionEventKey="0"
        />
      )
    ).not.toThrow();
  });

  it('should display error message', async () => {
    const promise = new Promise<string>((resolve) =>
      setTimeout(() => resolve('success!'), 100)
    );
    const { getByText } = render(
      <ResultItem
        entity={wrapPromise(promise)}
        content="Something long"
        accordionEventKey="1"
      />
    );
    await waitFor(() =>
      promise.then(() => {
        expect(
          getByText('Error when fetching response: success!')
        ).toBeInTheDocument();
      })
    );
  });

  it('should display disclaimer when no entities have been discovered', async () => {
    const promise = new Promise<NlpEntity[]>((resolve) =>
      setTimeout(() => resolve([]), 100)
    );
    const { getByText } = render(
      <ResultItem
        entity={wrapPromise(promise)}
        content="Another test entity"
        accordionEventKey="6"
      />
    );
    await waitFor(() =>
      promise.then(() => {
        expect(getByText('No entities discovered.')).toBeInTheDocument();
      })
    );
  });

  it('should display table with header and row for each entity', async () => {
    const promise = new Promise<NlpEntity[]>((resolve) =>
      setTimeout(
        () =>
          resolve([
            {
              id: 5,
              confidenceScoreid: 1,
              confidenceScore: 5,
              entityId: 'adipiscing',
              matchedText: 'adipiscing',
              relevanceScore: 1,
              startingPos: 50,
              wikiLink: 'http://www.wikipedia.org/wiki/adipiscing',
              type: ['term'],
            },
            {
              id: 5,
              confidenceScoreid: 1,
              confidenceScore: 0.55,
              entityId: 'lorem',
              matchedText: 'lorem',
              relevanceScore: 23,
              startingPos: 1000,
              wikiLink: 'http://www.wikipedia.org/wiki/lorem_ipsum',
              type: ['term'],
            },
          ]),
        10
      )
    );
    const { getByRole } = render(
      <ResultItem
        entity={wrapPromise(promise)}
        content="Another test entity"
        accordionEventKey="6"
      />
    );
    await waitFor(() =>
      promise.then(() => {
        const table = getByRole('table');
        expect(table).toBeInTheDocument();
        expect(table.querySelector('thead')).toBeInTheDocument();
        expect(table.querySelector('tbody')?.children).toHaveLength(2);
      })
    );
  });
});
