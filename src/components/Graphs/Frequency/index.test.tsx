import { render } from '@testing-library/react';
import FrequencyGraph from '.';

describe('Frequency component', () => {
  it('should render component', () => {
    expect(() => render(<FrequencyGraph entities={[]} />)).not.toThrow();
  });
});
