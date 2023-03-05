import { fireEvent, render, waitFor } from '@testing-library/react';
import { AppContext } from 'components/context';
import { NlpEntity } from 'components/types';
import { wrapPromise } from 'helpers/wrapPromise';
import ResultList from '.';
import { ActionType } from 'components/constants';

const defaultContextValues = {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  dispatch: () => {},
  fileContent: [],
  hasMoreResults: false,
  results: [],
};

describe('ResultList component', () => {
  it('should display disclaimer when no data are available', () => {
    const { getByText } = render(
      <AppContext.Provider value={defaultContextValues}>
        <ResultList />
      </AppContext.Provider>
    );
    expect(getByText('No data available')).toBeInTheDocument();
  });

  it('should display hint to load results', () => {
    const { getByText } = render(
      <AppContext.Provider
        value={{
          ...defaultContextValues,
          hasMoreResults: true,
        }}
      >
        <ResultList />
      </AppContext.Provider>
    );
    expect(
      getByText('Click the button to load first set of results')
    ).toBeInTheDocument();
  });

  describe('load more button', () => {
    it('should display button to load more entities', () => {
      const { getByRole } = render(
        <AppContext.Provider
          value={{
            ...defaultContextValues,
            hasMoreResults: true,
          }}
        >
          <ResultList />
        </AppContext.Provider>
      );
      const btn = getByRole('button');
      expect(btn).toHaveTextContent('Load more');
      expect(btn).toBeInTheDocument();
    });

    it('should not display button to load more entities', () => {
      const { getByText } = render(
        <AppContext.Provider
          value={{
            ...defaultContextValues,
            hasMoreResults: false,
          }}
        >
          <ResultList />
        </AppContext.Provider>
      );
      expect(() => getByText('Load more')).toThrow(
        'Unable to find an element with the text'
      );
    });

    it('should call proper dispatch action upon click', () => {
      const mockDispatch = jest.fn();
      const { getByText } = render(
        <AppContext.Provider
          value={{
            ...defaultContextValues,
            hasMoreResults: true,
            dispatch: mockDispatch,
          }}
        >
          <ResultList />
        </AppContext.Provider>
      );
      const btn = getByText('Load more');
      fireEvent.click(btn);
      expect(mockDispatch).toBeCalledWith([ActionType.loadMore]);
    });
  });

  it('should display loading status', () => {
    const { getByText } = render(
      <AppContext.Provider
        value={{
          ...defaultContextValues,
          results: [
            [
              'Sentence jako víno',
              wrapPromise(
                new Promise<string>((resolve) => resolve('Some random text'))
              ),
            ],
          ],
        }}
      >
        <ResultList />
      </AppContext.Provider>
    );
    expect(getByText('Loading...')).toBeInTheDocument();
  });

  it('should display correct elements in case results are loaded', async () => {
    const promise = wrapPromise(
      new Promise<NlpEntity[]>((resolve) =>
        resolve([
          {
            id: 5,
            confidenceScore: 5,
            entityId: 'analyze',
            matchedText: 'analyze',
            relevanceScore: 0.0297,
            startingPos: 8,
            wikiLink: 'https://www.google.com',
          },
          {
            id: 5,
            confidenceScore: 1,
            entityId: 'test',
            matchedText: 'Test',
            relevanceScore: 2.45,
            startingPos: 0,
            wikiLink: 'https://www.seznam.cz',
          },
        ])
      )
    );
    const { asFragment, getAllByRole } = render(
      <AppContext.Provider
        value={{
          ...defaultContextValues,
          hasMoreResults: true,
          results: [
            ['Test to analyze', promise],
            ['More text', promise],
          ],
        }}
      >
        <ResultList />
      </AppContext.Provider>
    );
    await waitFor(async () => getAllByRole('table'));
    expect(asFragment()).toMatchSnapshot();
  });
});
