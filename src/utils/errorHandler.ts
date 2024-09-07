import logger from './logger';

export class AppError extends Error {
  constructor(message: string, public statusCode: number) {
    super(message);
    this.statusCode = statusCode;
  }
}

export const handleError = (error: any) => {
  if (error instanceof AppError) {
    logger.error(`${error.statusCode} - ${error.message}`);
  } else {
    logger.error(`500 - ${error.message || 'Internal Server Error'}`);
  }
  return {
    message: error.message || 'An unexpected error occurred',
    statusCode: error.statusCode || 500
  };
};
