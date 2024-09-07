import OpenAI from 'openai';
import logger from './utils/logger';
import { AppError, handleError } from './utils/errorHandler';

export class OpenAIClient {
  private openai: OpenAI;

  constructor(apiKey: string) {
    const client = new OpenAI({
        apiKey: apiKey
      });
    this.openai = client
  }

  async getScrapingInstructions(prompt: string): Promise<string> {
    try {
      logger.info(`Fetching scraping instructions from OpenAI for prompt: ${prompt}`);
      const response = await this.openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: prompt}],
        temperature: 0.5
      });
      console.log(response.choices[0].message?.content)
      return response.choices[0].message?.content || 'No instructions';
    } catch (error) {
      const err = handleError(error);
      throw new AppError(`Failed to get instructions from OpenAI: ${err.message}`, err.statusCode);
    }
  }
}
