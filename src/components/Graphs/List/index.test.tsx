import { render } from '@testing-library/react';
import GraphList from '.';

describe('GraphList component', () => {
  it('should render component', () => {
    expect(() => render(<GraphList results={[]} />)).not.toThrow();
  });
});
