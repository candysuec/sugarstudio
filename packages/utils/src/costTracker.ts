// sugarstudio/apps/orchestrator/src/utils/costTracker.ts

import { logger } from './logger';

interface GeminiUsageRecord {
  timestamp: Date;
  model: string;
  promptTokens: number;
  completionTokens: number;
  totalTokens: number;
  costEstimate: number; // Placeholder for actual cost calculation
  jobType?: string; // Optional: link to the job type that triggered it
}

interface GeminiAnalyticsRecord {
  timestamp: Date;
  model: string;
  jobType?: string;
  promptLength?: number; // Character length of the prompt
  responseLength?: number; // Character length of the response
  durationMs?: number; // Time taken for the API call
  safetyFeedback?: any; // Details about safety filters triggered
  // Add other analytics fields as needed
}

// Simple in-memory store for demonstration
const usageRecords: GeminiUsageRecord[] = [];
const analyticsRecords: GeminiAnalyticsRecord[] = [];

// Basic cost per 1k tokens (example values, replace with actuals)
const COST_PER_1K_TOKENS: { [key: string]: { input: number; output: number } } = {
  'gemini-1.5-flash': { input: 0.00035, output: 0.00105 },
  'gemini-1.5-pro': { input: 0.0035, output: 0.0105 },
  'gemini-pro-vision': { input: 0.0035, output: 0.0105 }, // Vision model pricing might differ
};

const calculateCost = (model: string, promptTokens: number, completionTokens: number): number => {
  const modelCosts = COST_PER_1K_TOKENS[model];
  if (!modelCosts) {
    logger.warn(`Unknown model '${model}' for cost calculation.`);
    return 0;
  }
  const inputCost = (promptTokens / 1000) * modelCosts.input;
  const outputCost = (completionTokens / 1000) * modelCosts.output;
  return inputCost + outputCost;
};

export const costTracker = {
  recordGeminiUsage: (
    model: string,
    promptTokens: number,
    completionTokens: number,
    jobType?: string,
  ): void => {
    const totalTokens = promptTokens + completionTokens;
    const costEstimate = calculateCost(model, promptTokens, completionTokens);

    const record: GeminiUsageRecord = {
      timestamp: new Date(),
      model,
      promptTokens,
      completionTokens,
      totalTokens,
      costEstimate,
      jobType,
    };
    usageRecords.push(record);
    logger.info(
      `Gemini Usage Recorded: Model=${model}, Tokens=${totalTokens}, Cost=$${costEstimate.toFixed(5)}, JobType=${jobType || 'N/A'}`,
    );
    // TODO: In a production environment, this would be saved to a database table (e.g., api_usage_logs)
  },

  recordGeminiAnalytics: (analytics: Omit<GeminiAnalyticsRecord, 'timestamp'>): void => {
    const record: GeminiAnalyticsRecord = {
      timestamp: new Date(),
      ...analytics,
    };
    analyticsRecords.push(record);
    logger.info(
      `Gemini Analytics Recorded: Model=${analytics.model}, JobType=${analytics.jobType || 'N/A'}, Duration=${analytics.durationMs || 'N/A'}ms`,
    );
    // TODO: In a production environment, this would be saved to a database table (e.g., gemini_analytics_logs)
  },

  getUsageRecords: (): GeminiUsageRecord[] => {
    return [...usageRecords]; // Return a copy
  },

  getAnalyticsRecords: (): GeminiAnalyticsRecord[] => {
    return [...analyticsRecords]; // Return a copy
  },

  getTotalCostEstimate: (): number => {
    return usageRecords.reduce((sum, record) => sum + record.costEstimate, 0);
  },

  clearRecords: (): void => {
    usageRecords.length = 0; // Clear the array
    analyticsRecords.length = 0; // Clear analytics records as well
  },
};
