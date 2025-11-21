"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLogsFromFile = exports.writeLogToFile = exports.logger = void 0;
const winston_1 = __importDefault(require("winston"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const logDir = path_1.default.join(process.cwd(), 'apps', 'orchestrator', 'logs');
// Create the log directory if it doesn't exist
if (!fs_1.default.existsSync(logDir)) {
    fs_1.default.mkdirSync(logDir, { recursive: true });
}
const { combine, timestamp, printf, colorize } = winston_1.default.format;
const logFormat = printf((info) => {
    const { level, message, timestamp: ts, stack } = info;
    return `${ts} ${level}: ${message}${stack ? `\n${stack}` : ''}`;
});
exports.logger = winston_1.default.createLogger({
    level: 'info',
    format: combine(timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), logFormat),
    transports: [
        new winston_1.default.transports.Console({
            format: combine(colorize(), logFormat),
        }),
        new winston_1.default.transports.File({ filename: path_1.default.join(logDir, 'orchestrator.log'), level: 'info' }),
        new winston_1.default.transports.File({ filename: path_1.default.join(logDir, 'error.log'), level: 'error' }),
    ],
});
// Also create a service for writing to markdown files
const writeLogToFile = async (logType, message) => {
    const filename = logType === 'tasks' ? 'tasks.md' : 'orchestrator.log';
    const filePath = path_1.default.join(logDir, filename);
    const timestamp = new Date().toISOString();
    const logEntry = `## ${timestamp}\n\n${message}\n\n---\n\n`;
    try {
        await fs_1.default.promises.appendFile(filePath, logEntry, 'utf8');
    }
    catch (error) {
        exports.logger.error(`Failed to write to ${filename}:`, error);
    }
};
exports.writeLogToFile = writeLogToFile;
const getLogsFromFile = async (logType) => {
    const filename = logType === 'tasks' ? 'tasks.md' : 'orchestrator.log';
    const filePath = path_1.default.join(logDir, filename);
    try {
        return await fs_1.default.promises.readFile(filePath, 'utf8');
    }
    catch (error) {
        exports.logger.error(`Failed to read from ${filename}:`, error);
        return `Error reading logs from ${filename}.`;
    }
};
exports.getLogsFromFile = getLogsFromFile;
