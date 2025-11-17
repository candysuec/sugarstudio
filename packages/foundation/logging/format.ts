import winston from 'winston';

const { combine, timestamp, printf } = winston.format;

export const format = combine(
  timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  printf(({ level, message, timestamp, stack }) => {
    return `${timestamp} ${level}: ${message}${stack ? `\n${stack}` : ''}`;
  })
);
