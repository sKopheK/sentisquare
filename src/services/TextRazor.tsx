import { NlpEntity } from 'components/types';
import ApiService from './Api';

class TextRazor {
  private apiKey: string;
  private apiService: ApiService;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
    this.apiService = new ApiService();
  }

  async getTextEntities(text: string) {
    return new Promise<NlpEntity[]>((resolve, reject) =>
      this.apiService
        .post(
          '/',
          {
            text,
            extractors: 'entities',
          },
          {
            headers: {
              'X-TextRazor-Key': this.apiKey,
              'Content-Type': 'application/x-www-form-urlencoded',
            },
          }
        )
        .then((result) => {
          if (
            !result.ok ||
            !result.response ||
            !Array.isArray(result.response.entities)
          ) {
            throw new Error('Error processing file on line: ' + text);
          }
          resolve(result.response.entities);
        })
        .catch((err) => {
          reject(err);
        })
    );
  }
}

export default TextRazor;
