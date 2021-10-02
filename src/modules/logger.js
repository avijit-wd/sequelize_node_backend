const { createLogger, format, transports } = require("winston");
const { combine, timestamp, splat, printf } = format;
const logFormat = printf(({ timestamp, level, message, meta }) => {
  return `${timestamp}--${level} : ${message} : ${
    meta ? JSON.stringify(meta) : ""
  }`;
});
const logger = createLogger({
  level: "debug",
  format: combine(timestamp(), splat(), logFormat),
  transports: [
    new transports.Console(),
    // new transports.File({ filename: "logs/combined.log" }),
  ],
});
exports.log = logger;
