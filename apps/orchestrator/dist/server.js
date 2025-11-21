"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.startServer = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const utils_1 = require("@sugarstudio/utils");
const env_1 = require("./utils/env");
// Import routes
const health_1 = __importDefault(require("./routes/health"));
const tasks_1 = __importDefault(require("./routes/tasks"));
const logs_1 = __importDefault(require("./routes/logs"));
const aiJobWorker_1 = require("./workers/aiJobWorker");
const app = (0, express_1.default)();
// Start the AI Job Worker when the server bootstraps
(0, aiJobWorker_1.startAIJobWorker)();
// Middleware
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Routes
app.use('/health', health_1.default);
app.use('/tasks', tasks_1.default);
app.use('/logs', logs_1.default);
// Error handling middleware
app.use((err, req, res, next) => {
    utils_1.logger.error(`Unhandled error: ${err.message}`, err.stack);
    res.status(500).send('Something broke!');
});
const startServer = () => {
    app.listen(env_1.PORT, () => {
        utils_1.logger.info(`Orchestrator server listening on port ${env_1.PORT}`);
    });
};
exports.startServer = startServer;
