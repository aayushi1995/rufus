import puppeteer from 'puppeteer';
import cheerio from 'cheerio';
import logger from './utils/logger';
import { AppError, handleError } from './utils/errorHandler';

export class WebScraper {
  async scrapePage(url: string): Promise<string> {
    try {
      logger.info(`Starting to scrape: ${url}`);
      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      await page.goto(url, { waitUntil: 'networkidle2' });
      const content = await page.content();
      await browser.close();
      logger.info(`Successfully scraped: ${url}`);
      return content;
    } catch (error) {
      const err = handleError(error);
      throw new AppError(`Failed to scrape the page: ${err.message}`, err.statusCode);
    }
  }

  extractData(html: string, instructions: string): any {
    try {
      logger.info('Extracting data based on the given instructions');
      const $ = cheerio.load(html);
      const data: string[] = [];
      $('p').each((_idx, el) => {
        data.push($(el).text());
      });
      return data;
    } catch (error) {
      const err = handleError(error);
      throw new AppError(`Data extraction failed: ${err.message}`, err.statusCode);
    }
  }
}
