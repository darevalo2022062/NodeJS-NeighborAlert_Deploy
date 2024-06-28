import { logger } from "./logger.js";
const logger = logger.child();

export const handleResponse = (res, promise) => {
  logger.info('Start request in handling response');
  promise
      .then(data => {
          childLogger.info('Request successful');
          res.status(200).json(data);
      })
      .catch(error => {
          childLogger.error('Error:', error);
          res.status(500).json({ error: 'Internal server error' });
      });
};