import { render } from '@testing-library/react';
import ConfidenceGraph from '.';

describe('Confidence component', () => {
  it('should render component', () => {
    expect(() => render(<ConfidenceGraph entities={[]} />)).not.toThrow();
  });
});
