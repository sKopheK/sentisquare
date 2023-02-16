import ApiService from './Api';

class TextRazor {
  private apiKey: string;
  private apiService: ApiService;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
    this.apiService = new ApiService();
  }

  async processData(data: string) {
    return this.apiService.post(
      '/',
      {
        text: encodeURIComponent(data),
        extractors: 'entities',
      },
      {
        headers: {
          'X-TextRazor-Key': this.apiKey,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );
  }
}

export default TextRazor;
