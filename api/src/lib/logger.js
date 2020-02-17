import { createLogger, format, transports } from 'winston';

const COLORS = {
  RESET: '\x1b[0m',
  BRIGHT: '\x1b[1m',
  FG_RED: '\x1b[31m',
  DIM: '\x1b[2m',
};

const formatWebpackStackTracePath = stack =>
  stack
    ? stack
        .replace(/.+\/webpack:\/webpack\/bootstrap:.+/gm, ' ')
        .replace(/$\s+^/gm, '\n')
        .replace(
          /(\(\/.+)\/build\/webpack:(.+?)(\))/gm,
          `${COLORS.RESET}${COLORS.FG_RED}${COLORS.BRIGHT}$1$2$3${COLORS.RESET}`,
        )
        .replace(/(.+)/gm, `${COLORS.DIM}${COLORS.FG_RED}$1${COLORS.RESET}`)
    : stack;

const customFormat = format.printf(
  info =>
    `[${info.timestamp}] ${info.level}: ${JSON.stringify(info.message, null, 2)} ${
      info.stack ? `\n${formatWebpackStackTracePath(info.stack)}` : ''
    }`,
);

const errorStackFormat = format(info => {
  if (info instanceof Error) {
    return Object.assign({}, info, {
      stack: info.stack,
      message: info.message,
    });
  }
  return info;
});

const logger = createLogger({
  transports: [new transports.Console()],
  format: format.combine(errorStackFormat(), format.timestamp(), format.colorize(), customFormat),
});

export default logger;
