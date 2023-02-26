import { mockEntities } from 'tests/mockData';
import { getAllEntities } from './helpers';
import { ResultList } from 'components/types';
import { wrapPromise } from 'helpers/wrapPromise';

describe('get all entities', () => {
  it('should return all entities from result map', async () => {
    const resultMap: ResultList = [
      [
        'sentence 1',
        wrapPromise(Promise.resolve([mockEntities[0], mockEntities[1]])),
      ],
      ['sentence 3', wrapPromise(Promise.resolve([mockEntities[2]]))],
    ];
    const entities = await getAllEntities(resultMap);
    expect(entities).toStrictEqual(mockEntities);
  });
});
