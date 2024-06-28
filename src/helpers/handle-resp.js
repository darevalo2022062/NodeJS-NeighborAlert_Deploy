import { logger } from "./logger.js";
const log = logger.child({path: 'helpers/handle-resp.js'});

export const handleResponse = (res, promise) => {
  log.info('Start request in handling response');
  promise
      .then(data => {
          log.info('Request successful');
          res.status(200).json(data);
      })
      .catch(error => {
          log.error('Error:', error);
          res.status(500).json({ error: 'Internal server error' });
      });
};