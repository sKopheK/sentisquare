import { TEXTRAZOR } from 'apiKeys';
import { NlpEntity } from 'components/types';
import TextRazor from './TextRazor';

describe('TextRazor service', () => {
  it('should fetch data from API', async () => {
    const sentences = [
      'lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore',
      'sentence 2',
      'sentence 3',
      'sentence 4',
    ];
    const entities: NlpEntity[] = [
      {
        id: 1,
        confidenceScore: 5,
        entityId: 'adipiscing',
        matchedText: 'adipiscing',
        relevanceScore: 1,
        startingPos: 50,
        wikiLink: 'http://www.wikipedia.org/wiki/adipiscing',
        type: ['term'],
      },
    ];
    const serverData = {
      ok: true,
      response: {
        entities,
      },
    };
    fetchMock.mockResponse(JSON.stringify(serverData));

    const textrazorService = new TextRazor(TEXTRAZOR);

    const expectedResult: Record<string, NlpEntity[]> = {};
    const responseData: Record<string, NlpEntity[]> = {};
    sentences.forEach(async (sentence) => {
      responseData[sentence] = await textrazorService.getTextEntities(sentence);
      expectedResult[sentence] = entities;
    });

    expect(responseData).toStrictEqual(expectedResult);
  });
});
