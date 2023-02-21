import { mockEntities } from 'tests/mockData';
import { getConfidenceData } from './helpers';

describe('Confidence Graph helpers', () => {
  it('should return data for confidence graph', () => {
    const data = getConfidenceData(mockEntities);
    expect(data).toStrictEqual([
      {
        name: 'Hygiene',
        value: 1.306,
      },
      {
        name: 'Sweden',
        value: 3.516,
      },
      {
        name: 'Finland',
        value: 4.916,
      },
    ]);
  });
});
