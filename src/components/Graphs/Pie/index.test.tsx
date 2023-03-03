import { render } from '@testing-library/react';
import PieGraph from '.';

describe('PieGraph component', () => {
  it('should render component', () => {
    expect(() => render(<PieGraph data={[]} />)).not.toThrow();
  });
});
