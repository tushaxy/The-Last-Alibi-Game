export type Difficulty = "easy" | "medium" | "hard" | "very-hard";

export type EvidenceCategory =
  | "physical"
  | "document"
  | "digital"
  | "statement"
  | "photograph"
  | "forensic"
  | "historical"
  | "audio";

export type Reliability = "verified" | "reported" | "disputed" | "unknown";

export interface EvidenceObservation {
  id: string;
  label: string;
  detail: string;
  requiresClueId?: string;
}

export interface Hotspot {
  id: string;
  evidenceId: string;
  label: string;
  xPercent: number; // 0 - 100
  yPercent: number; // 0 - 100
  previewText: string;
}

export interface EvidenceItem {
  id: string;
  title: string;
  category: EvidenceCategory;
  description: string;
  image: string;
  discoveryLocation: string;
  availableObservations: string[];
  unlockConditions?: string[]; // IDs of evidence that must be found first
  relatedSuspects: string[];
  relatedTimelineEvents: string[];
  isRedHerring: boolean;
  explanation: string;
  forensicReport?: string;
}

export interface InterviewStage {
  id: string;
  question: string;
  response: string;
  requiredEvidenceId?: string; // Evidence needed to ask this question
  unlocksEvidenceId?: string; // Evidence unlocked by asking this question
  unlockedByQuestionId?: string;
  revealsNote?: string;
  exposesContradiction?: boolean;
}

export interface Suspect {
  id: string;
  name: string;
  occupation: string;
  portrait: string;
  relationshipToVictim: string;
  publicMotive: string;
  privateHistory: string;
  alibi: string;
  actualActions: string;
  interviewStages: InterviewStage[];
}

export interface TimelineEvent {
  id: string;
  time: string;
  sortOrder: number;
  title: string;
  description: string;
  reliability: Reliability;
  source: string;
  relatedEvidence: string[];
  relatedSuspects: string[];
}

export interface Solution {
  culpritId: string;
  motive: string;
  method: string;
  decisiveEvidenceIds: string[];
  alibiContradiction: string;
  chronologicalSequence: string[];
  innocentSuspectExplanations: Record<string, string>;
  redHerringExplanations: Record<string, string>;
  fullResolutionNarrative: string;
}

export interface CaseDeductionOption {
  id: string;
  label: string;
}

export interface Case {
  id: string;
  slug: string;
  caseNumber: string;
  title: string;
  genre: string;
  synopsis: string;
  tagline: string;
  incidentDate: string;
  incidentLocation: string;
  defaultDifficulty: Difficulty;
  estimatedMinutes: number;
  coverImage: string;
  victim: {
    name: string;
    age: number;
    occupation: string;
    causeOfDeath: string;
    summary: string;
    portrait: string;
  };
  crimeScene: {
    title: string;
    image: string;
    description: string;
    hotspots: Hotspot[];
  };
  suspects: Suspect[];
  evidence: EvidenceItem[];
  timeline: TimelineEvent[];
  solution: Solution;
  difficultyHints: Record<Difficulty, string[]>;
  deductionFormOptions: {
    motives: CaseDeductionOption[];
    methods: CaseDeductionOption[];
    contradictions: CaseDeductionOption[];
  };
}

export interface BoardConnection {
  id: string;
  fromId: string;
  toId: string;
  label: string;
  isContradiction?: boolean;
}

export interface BoardCardPosition {
  id: string;
  x: number;
  y: number;
}

export interface PlayerCaseProgress {
  caseId: string;
  difficulty: Difficulty;
  discoveredEvidenceIds: string[];
  inspectedEvidenceIds: string[];
  unlockedQuestionIds: string[];
  askedQuestionIds: string[];
  playerNotes: Record<string, string>;
  starredEvidenceIds: string[];
  boardPositions: Record<string, { x: number; y: number }>;
  connections: BoardConnection[];
  hintsUsed: number;
  accusationAttempts: number;
  isSolved: boolean;
  score?: number;
  solvedAt?: string;
  secondsElapsed: number;
}

export interface AccusationSubmission {
  culpritId: string;
  motiveId: string;
  methodId: string;
  decisiveEvidenceId: string;
  contradictionId: string;
  detectiveNotes?: string;
}

export interface AccusationResult {
  isCorrect: boolean;
  isCulpritCorrect: boolean;
  isMotiveCorrect: boolean;
  isMethodCorrect: boolean;
  isEvidenceCorrect: boolean;
  isContradictionCorrect: boolean;
  score: number;
  rank: string;
  feedbackMessage: string;
}
