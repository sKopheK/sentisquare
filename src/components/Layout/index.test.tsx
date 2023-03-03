import { render } from '@testing-library/react';
import Layout from '.';

describe('Layout component', () => {
  it('should render component', () => {
    expect(() => render(<Layout />)).not.toThrow();
  });
});
