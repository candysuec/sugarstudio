"use strict";
// sugarstudio/apps/orchestrator/src/utils/costTracker.ts
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.costTracker = void 0;
var logger_1 = require("./logger");
// Simple in-memory store for demonstration
var usageRecords = [];
var analyticsRecords = [];
// Basic cost per 1k tokens (example values, replace with actuals)
var COST_PER_1K_TOKENS = {
    'gemini-1.5-flash': { input: 0.00035, output: 0.00105 },
    'gemini-1.5-pro': { input: 0.0035, output: 0.0105 },
    'gemini-pro-vision': { input: 0.0035, output: 0.0105 }, // Vision model pricing might differ
};
var calculateCost = function (model, promptTokens, completionTokens) {
    var modelCosts = COST_PER_1K_TOKENS[model];
    if (!modelCosts) {
        logger_1.logger.warn("Unknown model '".concat(model, "' for cost calculation."));
        return 0;
    }
    var inputCost = (promptTokens / 1000) * modelCosts.input;
    var outputCost = (completionTokens / 1000) * modelCosts.output;
    return inputCost + outputCost;
};
exports.costTracker = {
    recordGeminiUsage: function (model, promptTokens, completionTokens, jobType) {
        var totalTokens = promptTokens + completionTokens;
        var costEstimate = calculateCost(model, promptTokens, completionTokens);
        var record = {
            timestamp: new Date(),
            model: model,
            promptTokens: promptTokens,
            completionTokens: completionTokens,
            totalTokens: totalTokens,
            costEstimate: costEstimate,
            jobType: jobType,
        };
        usageRecords.push(record);
        logger_1.logger.info("Gemini Usage Recorded: Model=".concat(model, ", Tokens=").concat(totalTokens, ", Cost=$").concat(costEstimate.toFixed(5), ", JobType=").concat(jobType || 'N/A'));
        // TODO: In a production environment, this would be saved to a database table (e.g., api_usage_logs)
    },
    recordGeminiAnalytics: function (analytics) {
        var record = __assign({ timestamp: new Date() }, analytics);
        analyticsRecords.push(record);
        logger_1.logger.info("Gemini Analytics Recorded: Model=".concat(analytics.model, ", JobType=").concat(analytics.jobType || 'N/A', ", Duration=").concat(analytics.durationMs || 'N/A', "ms"));
        // TODO: In a production environment, this would be saved to a database table (e.g., gemini_analytics_logs)
    },
    getUsageRecords: function () {
        return __spreadArray([], usageRecords, true); // Return a copy
    },
    getAnalyticsRecords: function () {
        return __spreadArray([], analyticsRecords, true); // Return a copy
    },
    getTotalCostEstimate: function () {
        return usageRecords.reduce(function (sum, record) { return sum + record.costEstimate; }, 0);
    },
    clearRecords: function () {
        usageRecords.length = 0; // Clear the array
        analyticsRecords.length = 0; // Clear analytics records as well
    },
};
