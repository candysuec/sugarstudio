export declare enum DriftSeverity {
    LOW = "LOW",
    MEDIUM = "MEDIUM",
    HIGH = "HIGH",
    CRITICAL = "CRITICAL"
}
export declare enum DriftCategory {
    VISUAL = "VISUAL",
    TONE_OF_VOICE = "TONE_OF_VOICE",
    MESSAGING = "MESSAGING",
    STRATEGY = "STRATEGY"
}
export interface DriftEvent {
    id: string;
    brandId: string;
    timestamp: Date;
    category: DriftCategory;
    severity: DriftSeverity;
    description: string;
    detectedBy: 'AI' | 'Manual' | 'System';
    metadata?: Record<string, any>;
    resolved: boolean;
    resolvedAt?: Date;
    resolvedBy?: string;
}
