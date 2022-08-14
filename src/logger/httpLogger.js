const morgan = require('morgan');
const json = require('morgan-json');
const format = json({
  method: ':method',
  url: ':url',
  status: ':status',
  contentLength: ':res[content-length]',
  responseTime: ':response-time'
})

import Logger from '@src/logger';
const logger = new Logger('HTTP');

const httpLogger = morgan(format, {
  stream: {
    write: (message) => {
      const {
        method,
        url,
        status,
        contentLength,
        responseTime
      } = JSON.parse(message);

      logger.file({
        type: 'info',
        message: 'HTTP Access Log',
        data: {
          timestamp: new Date().toString(),
          method,
          url,
          status: Number(status),
          contentLength,
          responseTime: Number(responseTime)
        },
      });
    }
  }
})

export default httpLogger
