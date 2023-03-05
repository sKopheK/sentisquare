import { render } from '@testing-library/react';
import PieGraph from '.';

describe('PieGraph component', () => {
  it('should render component', () => {
    expect(() => render(<PieGraph data={[]} />)).not.toThrow();
  });

  it('should render empty data disclaimer', () => {
    const { getByText } = render(<PieGraph data={[]} />);
    expect(getByText('No data to display.')).toBeInTheDocument();
  });
});
