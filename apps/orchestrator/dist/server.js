"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.startServer = void 0;
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var logger_1 = require("./utils/logger");
var env_1 = require("./utils/env");
// Import routes
var health_1 = __importDefault(require("./routes/health"));
var tasks_1 = __importDefault(require("./routes/tasks"));
var logs_1 = __importDefault(require("./routes/logs"));
var app = (0, express_1.default)();
// Middleware
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Routes
app.use('/health', health_1.default);
app.use('/tasks', tasks_1.default);
app.use('/logs', logs_1.default);
// Error handling middleware
app.use(function (err, req, res, next) {
    logger_1.logger.error("Unhandled error: ".concat(err.message), err.stack);
    res.status(500).send('Something broke!');
});
var startServer = function () {
    app.listen(env_1.PORT, function () {
        logger_1.logger.info("Orchestrator server listening on port ".concat(env_1.PORT));
    });
};
exports.startServer = startServer;
