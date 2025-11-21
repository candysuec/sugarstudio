interface GeminiUsageRecord {
    timestamp: Date;
    model: string;
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
    costEstimate: number;
    jobType?: string;
}
interface GeminiAnalyticsRecord {
    timestamp: Date;
    model: string;
    jobType?: string;
    promptLength?: number;
    responseLength?: number;
    durationMs?: number;
    safetyFeedback?: any;
}
export declare const costTracker: {
    recordGeminiUsage: (model: string, promptTokens: number, completionTokens: number, jobType?: string) => void;
    recordGeminiAnalytics: (analytics: Omit<GeminiAnalyticsRecord, "timestamp">) => void;
    getUsageRecords: () => GeminiUsageRecord[];
    getAnalyticsRecords: () => GeminiAnalyticsRecord[];
    getTotalCostEstimate: () => number;
    clearRecords: () => void;
};
export {};
//# sourceMappingURL=costTracker.d.ts.map