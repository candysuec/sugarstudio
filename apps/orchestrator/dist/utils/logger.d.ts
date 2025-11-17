import winston from 'winston';
export declare const logger: winston.Logger;
export declare const writeLogToFile: (logType: "orchestrator" | "tasks", message: string) => Promise<void>;
export declare const getLogsFromFile: (logType: "orchestrator" | "tasks") => Promise<string>;
//# sourceMappingURL=logger.d.ts.map