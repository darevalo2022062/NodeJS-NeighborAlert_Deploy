import { logger } from "./logger.js";

export const handleResponse = (res, promise) => {
  logger.info('Start request in handling response');
  promise
      .then(data => {
          logger.info('Request successful');
          res.status(200).json(data);
      })
      .catch(error => {
          logger.error('Error:', error);
          res.status(500).json({ error: 'Internal server error' });
      });
};