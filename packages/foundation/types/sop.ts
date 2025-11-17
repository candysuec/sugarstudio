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
  category: string; // e.g., 'Onboarding', 'Marketing', 'Maintenance'
  version: string;
  authorId: string;
  createdAt: Date;
  updatedAt: Date;
  steps: SOPStep[];
  relatedTasks?: string[]; // IDs of tasks that might trigger this SOP
  metadata?: Record<string, any>; // Additional context, e.g., AI generation details
}
