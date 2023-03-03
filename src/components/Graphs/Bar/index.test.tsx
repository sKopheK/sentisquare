import { render } from '@testing-library/react';
import BarGraph from '.';

describe('BarGraph', () => {
  it('should display only message when there are no data', () => {
    const { getByText } = render(<BarGraph data={[]} />);
    expect(getByText('No data to display.')).toBeInTheDocument();
  });

  it('should display graph', () => {
    const { getByTestId } = render(
      <BarGraph data={[{ value: 4, name: 'something' }]} />
    );
    expect(getByTestId('bar-graph')).toBeInTheDocument();
  });
});
