import ApiService from './Api';

describe('Api Service', () => {
  afterEach(() => {
    fetchMock.resetMocks();
  });

  it('should return response', async () => {
    const mockedData = { test: true };
    fetchMock.mockResponse(JSON.stringify(mockedData));

    const apiService = new ApiService();
    const result = await apiService.get('https://www.google.com');

    expect(result).toStrictEqual(mockedData);
  });

  it('should call endpoint with passed params', async () => {
    fetchMock.mockResponse(JSON.stringify({ test: 44 }));
    const url = 'https://www.google.com';
    const params = {
      param1: 'a',
      param2: 23,
    };
    const parsedUrl = new URL(url);
    parsedUrl.searchParams.append('param1', params.param1);
    parsedUrl.searchParams.append('param2', String(params.param2));

    const apiService = new ApiService();
    apiService.get(url, params);

    expect(fetchMock).toHaveBeenCalledWith(parsedUrl.toString(), undefined);
  });

  it('should make a successful POST request', () => {
    fetchMock.mockResponse(JSON.stringify({ success: 'ok' }));

    const url = 'https://whatever.com/';

    const apiService = new ApiService();
    const options = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    apiService.post(url, {}, options);

    expect(fetchMock).toHaveBeenCalledWith(url, {
      method: 'POST',
      ...options,
    });
  });
});
