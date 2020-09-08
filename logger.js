/* eslint-disable new-cap */
import {
  createLogger,
  transports,
  format,
} from 'winston';

const {
  combine,
  timestamp,
  printf,
  colorize,
} = format;

// Set default NYPL agreed upon log levels
const nyplLogLevels = {
  levels: {
    emergency: 0,
    alert: 1,
    critical: 2,
    error: 3,
    warning: 4,
    notice: 5,
    info: 6,
    debug: 7,
  },
  colors: {
    emergency: 'red',
    alert: 'red',
    critical: 'red',
    error: 'red',
    warning: 'yellow',
    notice: 'green',
    info: 'blue',
  },
};

const getLogLevelCode = (levelString) => {
  switch (levelString) {
    case 'emergency':
      return 0;
    case 'alert':
      return 1;
    case 'critical':
      return 2;
    case 'error':
      return 3;
    case 'warning':
      return 4;
    case 'notice':
      return 5;
    case 'info':
      return 6;
    case 'debug':
      return 7;
    default:
      return 'n/a';
  }
};

// const logLevel = (process.env.NODE_ENV === 'production') ? 'info' : 'debug';
// const timestamp = () => new Date().toISOString();
const nyplFormat = printf((info) => {
  const result = {
    timestamp: info.timestamp,
    levelCode: getLogLevelCode(info.level),
    level: info.level.toUpperCase(),
  };

  if (process.pid) {
    result.pid = process.pid.toString();
  }

  if (info.message) {
    result.message = info.message;
  }

  return JSON.stringify(result);
});

const loggerTransports = [
  new transports.File({
    filename: './log/global-search.log',
    handleExceptions: true,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
    format: combine(
      timestamp(),
      nyplFormat,
    ),
  }),
];

// spewing logs while running tests is annoying
if (process.env.NODE_ENV !== 'test') {
  loggerTransports.push(new transports.Console({
    handleExceptions: true,
    format: combine(
      timestamp(),
      nyplFormat,
      colorize({
        all: true,
      }),
    ),
  }));
}

const logger = new createLogger({
  levels: nyplLogLevels.levels,
  transports: loggerTransports,
  exitOnError: false,
});

export default logger;
