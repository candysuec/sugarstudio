export enum DriftSeverity {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  CRITICAL = 'CRITICAL',
}

export enum DriftCategory {
  VISUAL = 'VISUAL',
  TONE_OF_VOICE = 'TONE_OF_VOICE',
  MESSAGING = 'MESSAGING',
  STRATEGY = 'STRATEGY',
  // Add more categories as needed
}

export interface DriftEvent {
  id: string;
  brandId: string;
  timestamp: Date;
  category: DriftCategory;
  severity: DriftSeverity;
  description: string;
  detectedBy: 'AI' | 'Manual' | 'System';
  metadata?: Record<string, any>; // e.g., diffs, links to offending content
  resolved: boolean;
  resolvedAt?: Date;
  resolvedBy?: string;
}
