import {
  logger as WinstonLogger,
  fileLogger as WinstonFileLogger,
} from './winston';

class Logger {
  constructor(name) {
    this.logger = WinstonLogger;
    this.fileLogger = WinstonFileLogger;
    this.name = name || '';
  }

  info(message) {
    this.logger.info(`${this.name}: ${message}`);
  }
  error(message, err) {
    this.logger.error(`${this.name}: ${message}`, err);
  }
  warn(message) {
    this.logger.warn(`${this.name}: ${message}`);
  }
  debug(message) {
    /* your implementation */
  }
  verbose(message) {
    /* your implementation */
  }
  file({type, message, data, ...rest}) {
    this.fileLogger.log(type, `${this.name}: ${message}`, data, rest);
  }
}

export default Logger;
