import { mockEntities } from 'tests/mockData';
import { getFrequencyData } from './helpers';

describe('frequency graph', () => {
  it('should throw on invalid input', () => {
    // @ts-expect-error invalid param type
    expect(() => getFrequencyData('ahoj')).toThrow();
    // @ts-expect-error invalid param type
    expect(() => getFrequencyData()).toThrow();
    // @ts-expect-error invalid param type
    expect(() => getFrequencyData(new Map())).toThrow();
  });

  it('should prepare data for graph', () => {
    const data = getFrequencyData(mockEntities);
    const expectedResult = [
      { name: 'Place', value: 1 },
      { name: 'PopulatedPlace', value: 1 },
      { name: 'Country', value: 2 },
    ];
    expect(data).toStrictEqual(expectedResult);
  });
});
