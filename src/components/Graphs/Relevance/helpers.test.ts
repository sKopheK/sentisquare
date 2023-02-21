import { mockEntities } from 'tests/mockData';
import {
  getDataWithinRange,
  getMaximumValue,
  getRelevanceData,
} from './helpers';

describe('relevance graph', () => {
  it('should throw on invalid input', () => {
    // @ts-expect-error invalid param type
    expect(() => getRelevanceData('ahoj')).toThrow();
    // @ts-expect-error invalid param type
    expect(() => getRelevanceData()).toThrow();
    // @ts-expect-error invalid param type
    expect(() => getRelevanceData(new Map())).toThrow();
  });

  it('should prepare data for graph', () => {
    const data = getRelevanceData(mockEntities);
    expect(data).toStrictEqual([
      {
        name: 'Hygiene',
        value: 0.01721,
      },
      {
        name: 'Sweden',
        value: 0.01114,
      },
      {
        name: 'Finland',
        value: 0.25114,
      },
    ]);
  });

  it('should return maximum value', () => {
    const data = getRelevanceData(mockEntities);
    const max = getMaximumValue(data);
    expect(max).toEqual(0.25114);
  });

  it('should return data within range', () => {
    const data = getRelevanceData(mockEntities);
    const filtered = getDataWithinRange(data, 0.017, 0.24);
    expect(filtered).toStrictEqual([
      {
        name: 'Hygiene',
        value: 0.01721,
      },
    ]);
  });
});
