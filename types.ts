// Experiment: Dark mode theme implementation
export enum PipelineStatus {
  IDLE = 'IDLE',
  RUNNING = 'RUNNING',
  SUCCESS = 'SUCCESS',
  FAILED = 'FAILED',
}

export enum StageStatus {
  PENDING = 'PENDING',
  RUNNING = 'RUNNING',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
  SKIPPED = 'SKIPPED',
}

export interface PipelineStage {
  id: string;
  name: string;
  tool: string; // e.g., 'Git', 'Maven', 'Docker'
  status: StageStatus;
  logs: string[];
  duration?: number;
}

export interface MetricPoint {
  time: string;
  cpu: number;
  memory: number;
  requests: number;
  errors: number;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export enum View {
  DASHBOARD = 'DASHBOARD',
  PIPELINE = 'PIPELINE',
  MONITORING = 'MONITORING',
  AI_ASSISTANT = 'AI_ASSISTANT',
  DOCS = 'DOCS'
}