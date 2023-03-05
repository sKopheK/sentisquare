import { render } from '@testing-library/react';
import BarGraph from '.';

describe('BarGraph', () => {
  it('should display only message when there are no data', () => {
    const { getByText } = render(<BarGraph data={[]} />);
    expect(getByText('No data to display.')).toBeInTheDocument();
  });

  // unable to test recharts - nothing gets rendered inside ResponsiveContainer
  // @see https://github.com/recharts/recharts/issues/2166
  it.skip('should display graph', async () => {
    const { getByTitle } = render(
      <BarGraph data={[{ value: 4, name: 'something' }]} width="500" />
    );
    expect(getByTitle('Bar chart')).toBeInTheDocument();
  });
});
