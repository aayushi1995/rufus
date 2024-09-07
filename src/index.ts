import { OpenAIClient } from './openClient';
import { WebScraper } from './scraper';
import logger from './utils/logger';
import { AppError, handleError } from './utils/errorHandler';

const API_KEY = process.env.OPENAI_API_KEY || ''; 

(async () => {
  if (!API_KEY) {
    logger.error('OpenAI API key is missing.');
    return;
  }

  const openAiClient = new OpenAIClient(API_KEY);
  const scraper = new WebScraper();

  try {
    const userPrompt = "Find information about product features and customer FAQs.";
    const instructions = await openAiClient.getScrapingInstructions(userPrompt);
    logger.info('Scraping instructions received.');

    const url = 'https://example.com';
    const pageContent = await scraper.scrapePage(url);
    logger.info('Page content fetched, extracting relevant data...');

    const extractedData = scraper.extractData(pageContent, instructions);
    logger.info('Data extraction completed successfully.');
    console.log('Extracted data:', extractedData);
    
  } catch (error) {
    const err = handleError(error);
    logger.error(`Error occurred: ${err.message}`);
  }
})();

