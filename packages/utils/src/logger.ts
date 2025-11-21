import winston, { Logform } from 'winston';
import { TransformableInfo } from 'logform';
import path from 'path';
import fs from 'fs';

const logDir = path.join(process.cwd(), 'apps', 'orchestrator', 'logs');

// Create the log directory if it doesn't exist
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir, { recursive: true });
}

const { combine, timestamp, printf, colorize } = winston.format;

const logFormat = printf((info: TransformableInfo) => {
  const { level, message, timestamp: ts, stack } = info;
  return `${ts} ${level}: ${message}${stack ? `\n${stack}` : ''}`;
});

export const logger = winston.createLogger({
  level: 'info',
  format: combine(timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), logFormat),
  transports: [
    new winston.transports.Console({
      format: combine(colorize(), logFormat),
    }),
    new winston.transports.File({ filename: path.join(logDir, 'orchestrator.log'), level: 'info' }),
    new winston.transports.File({ filename: path.join(logDir, 'error.log'), level: 'error' }),
  ],
});

// Also create a service for writing to markdown files
export const writeLogToFile = async (logType: 'orchestrator' | 'tasks', message: string) => {
  const filename = logType === 'tasks' ? 'tasks.md' : 'orchestrator.log';
  const filePath = path.join(logDir, filename);
  const timestamp = new Date().toISOString();
  const logEntry = `## ${timestamp}\n\n${message}\n\n---\n\n`;
  try {
    await fs.promises.appendFile(filePath, logEntry, 'utf8');
  } catch (error) {
    logger.error(`Failed to write to ${filename}:`, error);
  }
};

export const getLogsFromFile = async (logType: 'orchestrator' | 'tasks'): Promise<string> => {
  const filename = logType === 'tasks' ? 'tasks.md' : 'orchestrator.log';
  const filePath = path.join(logDir, filename);
  try {
    return await fs.promises.readFile(filePath, 'utf8');
  } catch (error) {
    logger.error(`Failed to read from ${filename}:`, error);
    return `Error reading logs from ${filename}.`;
  }
};
