import appRoot from "app-root-path";
import { createLogger, format, transports } from "winston";

const LOG_FILE_PATH = `${appRoot}/logs/app.log`;
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const MAX_FILES = 5;

const alignedWithColorsAndTime = format.combine(
  format.colorize({
    message: false,
  }),
  format.timestamp({
    format: "HH:mm:ss.SSS",
  }),
  format.printf((info) => {
    const {
      timestamp, level, message, ...args
    } = info;

    let messageStr = message;
    if (typeof message === "object") {
      messageStr = JSON.stringify(messageStr);
    }

    return `${timestamp} [${level}]: ${messageStr} ${
      Object.keys(args).length ? JSON.stringify(args, null, 2) : ""
    }`;
  }),
);

const fileOptions = {
  level: "info",
  format: format.json(),
  filename: LOG_FILE_PATH,
  handleExceptions: true,
  maxsize: MAX_FILE_SIZE,
  maxFiles: MAX_FILES,
};

const consoleOptions = {
  level: "debug",
  format: alignedWithColorsAndTime,
  handleExceptions: true,
};

// instantiate a new winston Logger with the settings above
const logger = createLogger({
  exitOnError: false,
  transports: [new transports.File(fileOptions), new transports.Console(consoleOptions)],
});

export default logger;
