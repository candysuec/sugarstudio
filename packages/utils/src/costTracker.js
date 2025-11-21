"use strict";
// sugarstudio/apps/orchestrator/src/utils/costTracker.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.costTracker = void 0;
const logger_1 = require("./logger");
// Simple in-memory store for demonstration
const usageRecords = [];
const analyticsRecords = [];
// Basic cost per 1k tokens (example values, replace with actuals)
const COST_PER_1K_TOKENS = {
    'gemini-1.5-flash': { input: 0.00035, output: 0.00105 },
    'gemini-1.5-pro': { input: 0.0035, output: 0.0105 },
    'gemini-pro-vision': { input: 0.0035, output: 0.0105 }, // Vision model pricing might differ
};
const calculateCost = (model, promptTokens, completionTokens) => {
    const modelCosts = COST_PER_1K_TOKENS[model];
    if (!modelCosts) {
        logger_1.logger.warn(`Unknown model '${model}' for cost calculation.`);
        return 0;
    }
    const inputCost = (promptTokens / 1000) * modelCosts.input;
    const outputCost = (completionTokens / 1000) * modelCosts.output;
    return inputCost + outputCost;
};
exports.costTracker = {
    recordGeminiUsage: (model, promptTokens, completionTokens, jobType) => {
        const totalTokens = promptTokens + completionTokens;
        const costEstimate = calculateCost(model, promptTokens, completionTokens);
        const record = {
            timestamp: new Date(),
            model,
            promptTokens,
            completionTokens,
            totalTokens,
            costEstimate,
            jobType,
        };
        usageRecords.push(record);
        logger_1.logger.info(`Gemini Usage Recorded: Model=${model}, Tokens=${totalTokens}, Cost=$${costEstimate.toFixed(5)}, JobType=${jobType || 'N/A'}`);
        // TODO: In a production environment, this would be saved to a database table (e.g., api_usage_logs)
    },
    recordGeminiAnalytics: (analytics) => {
        const record = {
            timestamp: new Date(),
            ...analytics,
        };
        analyticsRecords.push(record);
        logger_1.logger.info(`Gemini Analytics Recorded: Model=${analytics.model}, JobType=${analytics.jobType || 'N/A'}, Duration=${analytics.durationMs || 'N/A'}ms`);
        // TODO: In a production environment, this would be saved to a database table (e.g., gemini_analytics_logs)
    },
    getUsageRecords: () => {
        return [...usageRecords]; // Return a copy
    },
    getAnalyticsRecords: () => {
        return [...analyticsRecords]; // Return a copy
    },
    getTotalCostEstimate: () => {
        return usageRecords.reduce((sum, record) => sum + record.costEstimate, 0);
    },
    clearRecords: () => {
        usageRecords.length = 0; // Clear the array
        analyticsRecords.length = 0; // Clear analytics records as well
    },
};
