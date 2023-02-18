import { NlpEntity } from 'components/types';
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
        text: data,
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

  async getTextEntities(file: AsyncGenerator<string>) {
    const entities = new Map<string, NlpEntity[]>();
    for await (const line of file) {
      const result = await this.processData(line);
      if (!line.trim()) continue;
      if (
        !result.ok ||
        !result.response ||
        !Array.isArray(result.response.entities)
      ) {
        console.error('Error processing file on line: ' + line);
        continue;
      }
      result.response.entities.forEach((entity: NlpEntity) =>
        entities.set(line, [...(entities.get(line) ?? []), entity])
      );
      // TODO
      if (entities.size >= 2) break;
    }
    return entities;
  }
}

export default TextRazor;
