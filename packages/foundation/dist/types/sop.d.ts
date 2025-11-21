export interface SOPStep {
    id: string;
    description: string;
    order: number;
    expectedOutcome?: string;
    toolsUsed?: string[];
}
export interface SOP {
    id: string;
    title: string;
    description: string;
    category: string;
    version: string;
    authorId: string;
    createdAt: Date;
    updatedAt: Date;
    steps: SOPStep[];
    relatedTasks?: string[];
    metadata?: Record<string, any>;
}
