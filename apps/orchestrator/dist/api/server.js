"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createServer = createServer;
// src/api/server.ts
const express_1 = __importDefault(require("express"));
const env_1 = require("../core/env");
const logger_1 = require("../core/logger");
const routes_1 = require("./routes");
function createServer() {
    const app = (0, express_1.default)();
    app.use(express_1.default.json());
    app.use("/v1", routes_1.router);
    app.use((err, _req, res, _next) => {
        logger_1.logger.error("Unhandled error:", err);
        const status = err.status || 500;
        res.status(status).json({
            error: err.message ?? "Internal server error",
        });
    });
    app.listen(env_1.env.PORT, () => {
        logger_1.logger.info(`Orchestrator listening on port ${env_1.env.PORT}`);
    });
}
