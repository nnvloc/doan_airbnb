const winston = require('winston');

winston.addColors({
  info: 'green',
  error: 'red',
  warn: 'yellow',
});

const options = {
  file: {
    level: 'info',
    filename: 'logs/app.log',
    handleExceptions: true,
    json: true,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
    colorize: true,
  },
  console: {
    level: 'debug',
    handleExceptions: true,
    json: false,
    colorize: true,
  },
};

export const logger = winston.createLogger({
  levels: winston.config.npm.levels,
  transports: [
    new winston.transports.Console({format: winston.format.combine(
      winston.format.colorize(),
      winston.format.simple(),
    )}),
    
  ],
  exitOnError: false,
});

export const fileLogger = winston.createLogger({
  levels: winston.config.npm.levels,
  transports: [
    new winston.transports.File(options.file, {
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple(),
      ), 
    }),
  ],
  exitOnError: false,
});
