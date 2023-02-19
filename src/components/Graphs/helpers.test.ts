import { NlpEntity } from 'components/types';
import { getAllEntities, getTypeGraphData } from './helpers';

const mockEntities: NlpEntity[] = [
  {
    id: 0,
    matchingTokens: [1],
    entityId: 'Hygiene',
    confidenceScore: 1.306,
    wikiLink: 'http://en.wikipedia.org/wiki/Hygiene',
    matchedText: 'hygiene',
    freebaseId: '/m/012sj0',
    relevanceScore: 0.01721,
    entityEnglishId: 'Hygiene',
    startingPos: 4,
    endingPos: 11,
    wikidataId: 'Q162297',
  },
  {
    id: 1,
    type: ['Place', 'PopulatedPlace', 'Country'],
    matchingTokens: [14],
    entityId: 'Sweden',
    confidenceScore: 3.516,
    wikiLink: 'http://en.wikipedia.org/wiki/Sweden',
    matchedText: 'Sweden',
    freebaseId: '/m/0d0vqn',
    relevanceScore: 0.01114,
    entityEnglishId: 'Sweden',
    startingPos: 81,
    endingPos: 87,
    wikidataId: 'Q34',
  },
  {
    id: 2,
    type: ['Country'],
    matchingTokens: [14],
    entityId: 'Finland',
    confidenceScore: 3.516,
    wikiLink: 'http://en.wikipedia.org/wiki/Finland',
    matchedText: 'Finland',
    freebaseId: '/m/0d0vqn',
    relevanceScore: 0.01114,
    entityEnglishId: 'Finland',
    startingPos: 81,
    endingPos: 87,
    wikidataId: 'Q34',
  },
];

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

describe('type graph', () => {
  it('should throw on invalid input', () => {
    // @ts-expect-error invalid param type
    expect(() => getTypeGraphData('ahoj')).toThrow();
    // @ts-expect-error invalid param type
    expect(() => getTypeGraphData()).toThrow();
    // @ts-expect-error invalid param type
    expect(() => getTypeGraphData(new Map())).toThrow();
  });

  it('should prepare data for graph', () => {
    const data = getTypeGraphData(mockEntities);
    const expectedResult = [
      { name: 'Place', value: 1 },
      { name: 'PopulatedPlace', value: 1 },
      { name: 'Country', value: 2 },
    ];
    expect(data).toStrictEqual(expectedResult);
  });
});
