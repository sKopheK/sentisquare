import { TEXTRAZOR } from 'apiKeys';
import { NlpEntity } from 'components/App.types';
import TextRazor from './TextRazor';

describe('TextRazor service', () => {
  it('should fetch data from API', async () => {
    const serverData = { isReality: false };
    fetchMock.mockResponse(JSON.stringify(serverData));

    const text = 'lorem ipsum dolor sit amet';
    const textrazorService = new TextRazor(TEXTRAZOR);

    const response = await textrazorService.processData(text);

    expect(fetchMock).toBeCalled();
    expect(response).toStrictEqual(serverData);
  });

  it('should return entities from file stream', async () => {
    const sentences = [
      'lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore',
      'sentence 2',
      // 'sentence 3',
      // 'sentence 4',
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

    const stream = async function* (): AsyncGenerator<string> {
      for (const line of sentences) {
        yield line;
      }
    };

    const expectedResult = new Map<string, NlpEntity[]>();
    sentences.forEach((sentence) => {
      expectedResult.set(sentence, entities);
    });

    const response = await textrazorService.getTextEntities(stream());
    expect(response).toStrictEqual(expectedResult);
  });
});
