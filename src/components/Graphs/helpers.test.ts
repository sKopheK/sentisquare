import { mockEntities } from 'tests/mockData';
import { getAllEntities } from './helpers';

describe('get all entities', () => {
  it('should return all entities from result map', () => {
    const resultMap = new Map([
      ['sentence 1', [mockEntities[0], mockEntities[1]]],
      ['sentence 3', [mockEntities[2]]],
    ]);
    const entities = getAllEntities(resultMap);
    expect(entities).toStrictEqual(mockEntities);
  });
});
