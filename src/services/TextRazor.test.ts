import { TEXTRAZOR } from 'apiKeys';

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
});
