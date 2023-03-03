import { render } from '@testing-library/react';
import RelevanceGraph from '.';

describe('Relevance component', () => {
  it('should render component', () => {
    expect(() => render(<RelevanceGraph entities={[]} />)).not.toThrow();
    expect(() =>
      render(
        <RelevanceGraph
          entities={[
            {
              confidenceScore: 1,
              entityId: 'word',
              id: 6,
              matchedText: 'ahoj',
              relevanceScore: 88,
              startingPos: 0,
              wikiLink: '',
            },
          ]}
        />
      )
    ).not.toThrow();
  });
});
