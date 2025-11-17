"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.startTaskWorker = void 0;
var queueService_1 = require("../services/queueService");
var logger_1 = require("../utils/logger");
var supabaseService_1 = require("../services/supabaseService");
var notionService_1 = require("../services/notionService");
var sopsService_1 = require("../services/sopsService");
var logService_1 = require("../services/logService");
var TASK_PROCESSING_INTERVAL = 5000; // Process tasks every 5 seconds
var processTask = function (task) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                logger_1.logger.info("Processing task: ".concat(task.type, " (ID: ").concat(task.id, ")"));
                return [4 /*yield*/, (0, logService_1.writeLogToFile)("Processing task: ".concat(task.type, " (ID: ").concat(task.id, ")"))];
            case 1:
                _b.sent();
                _b.label = 2;
            case 2:
                _b.trys.push([2, 14, , 16]);
                _a = task.type;
                switch (_a) {
                    case 'MONITOR_LOGS': return [3 /*break*/, 3];
                    case 'TRIGGER_WORKFLOW': return [3 /*break*/, 5];
                    case 'GENERATE_SOP': return [3 /*break*/, 7];
                    case 'PROCESS_AI_TASK': return [3 /*break*/, 9];
                    case 'SYNC_DATA': return [3 /*break*/, 10];
                    case 'RUN_MAINTENANCE': return [3 /*break*/, 11];
                }
                return [3 /*break*/, 12];
            case 3:
                // Logic to monitor logs and events
                logger_1.logger.info("Monitoring logs for: ".concat(task.payload.source));
                // Example: log to Supabase
                return [4 /*yield*/, (0, supabaseService_1.logToSupabase)({ level: 'info', message: "Monitored logs for ".concat(task.payload.source), timestamp: new Date().toISOString() })];
            case 4:
                // Example: log to Supabase
                _b.sent();
                return [3 /*break*/, 13];
            case 5:
                // Logic to trigger a specific workflow
                logger_1.logger.info("Triggering workflow: ".concat(task.payload.workflowName));
                // Example: create a Notion page
                return [4 /*yield*/, (0, notionService_1.createNotionPage)('YOUR_NOTION_DATABASE_ID', "Workflow Triggered: ".concat(task.payload.workflowName), "Details: ".concat(JSON.stringify(task.payload)))];
            case 6:
                // Example: create a Notion page
                _b.sent();
                return [3 /*break*/, 13];
            case 7:
                // Logic to generate SOP using AI
                logger_1.logger.info("Generating SOP for: ".concat(task.payload.topic));
                return [4 /*yield*/, (0, sopsService_1.generateSOPWithAI)(task.payload.topic)];
            case 8:
                _b.sent();
                return [3 /*break*/, 13];
            case 9:
                // Logic to process AI tasks asynchronously
                logger_1.logger.info("Processing AI task: ".concat(task.payload.aiModel));
                return [3 /*break*/, 13];
            case 10:
                // Logic to sync data between Supabase, Notion, etc.
                logger_1.logger.info("Syncing data for: ".concat(task.payload.entity));
                return [3 /*break*/, 13];
            case 11:
                // Logic for scheduled maintenance
                logger_1.logger.info("Running maintenance task: ".concat(task.payload.maintenanceType));
                return [3 /*break*/, 13];
            case 12:
                logger_1.logger.warn("Unknown task type: ".concat(task.type));
                _b.label = 13;
            case 13:
                logger_1.logger.info("Task ".concat(task.type, " (ID: ").concat(task.id, ") completed successfully."));
                return [3 /*break*/, 16];
            case 14:
                error_1 = _b.sent();
                logger_1.logger.error("Error processing task ".concat(task.type, " (ID: ").concat(task.id, "): ").concat(error_1.message), error_1.stack);
                return [4 /*yield*/, (0, supabaseService_1.logToSupabase)({ level: 'error', message: "Error processing task ".concat(task.type, ": ").concat(error_1.message), timestamp: new Date().toISOString(), metadata: { taskId: task.id, error: error_1.message } })];
            case 15:
                _b.sent();
                return [3 /*break*/, 16];
            case 16: return [2 /*return*/];
        }
    });
}); };
var taskWorkerLoop = function () { return __awaiter(void 0, void 0, void 0, function () {
    var task;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, queueService_1.dequeueTask)()];
            case 1:
                task = _a.sent();
                if (!task) return [3 /*break*/, 3];
                return [4 /*yield*/, processTask(task)];
            case 2:
                _a.sent();
                _a.label = 3;
            case 3:
                setTimeout(taskWorkerLoop, TASK_PROCESSING_INTERVAL);
                return [2 /*return*/];
        }
    });
}); };
var startTaskWorker = function () {
    logger_1.logger.info('Task worker started.');
    taskWorkerLoop();
};
exports.startTaskWorker = startTaskWorker;
