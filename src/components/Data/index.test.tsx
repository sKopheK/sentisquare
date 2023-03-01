import { render } from '@testing-library/react';

import { AppContextModel } from 'components/types';

import { AppContext } from 'components/context';
import Data from '.';

const defaultCtxValue: AppContextModel = {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  dispatch: () => {},
  fileContent: [],
  hasMoreResults: false,
  results: [],
};

describe('Data component', () => {
  it('should display dropzone when there is no file loaded', () => {
    const { getByText } = render(<Data />);

    expect(
      getByText('Drag and drop some files here, or click to select files')
    ).toBeInTheDocument();
  });

  it('should display message that file content was loaded', () => {
    const { getByText } = render(
      <AppContext.Provider
        value={{ ...defaultCtxValue, fileContent: ['line 1'] }}
      >
        <Data />
      </AppContext.Provider>
    );

    expect(getByText('File content loaded')).toBeInTheDocument();
  });
});
