export type ExperimentStatus = "DRAFT" | "RUNNING" | "PAUSED" | "STOPPED" | "ARCHIVED";
export type ExperimentType = "AB" | "AA" | "MULTI_ARM";
export type Strategy = "FIXED" | "EpsilonGreedy" | "Thompson";

export interface Arm {
  id: string;
  experimentId: string;
  name: string;
  aiModelId: string | null;
  initialSplit: number;
  minSplit: number | null;
  maxSplit: number | null;
  isChampion: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Metric {
  id: string;
  experimentId: string;
  armId: string | null;
  key: string;
  value: number;
  createdAt: string;
}

export interface Experiment {
  id: string;
  name: string;
  description: string | null;
  type: ExperimentType;
  status: ExperimentStatus;
  strategy: Strategy;
  startTime: string | null;
  endTime: string | null;
  notes: string | null;
  decision: string | null;
  decisionReason: string | null;
  createdAt: string;
  updatedAt: string;
  arms: Arm[];
  metrics: Metric[];
}
