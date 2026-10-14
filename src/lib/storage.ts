import { Difficulty, PlayerCaseProgress } from "@/types/game";

const STORAGE_KEY_PREFIX = "the_last_alibi_save_v1_";
const GLOBAL_SETTINGS_KEY = "the_last_alibi_settings_v1";

export interface GlobalSettings {
  defaultDifficulty: Difficulty;
  reducedMotion: boolean;
  highContrast: boolean;
  fontSize: "normal" | "large";
}

export function getDefaultCaseProgress(
  caseId: string,
  defaultDiff: Difficulty = "easy"
): PlayerCaseProgress {
  return {
    caseId,
    difficulty: defaultDiff,
    discoveredEvidenceIds: [],
    inspectedEvidenceIds: [],
    unlockedQuestionIds: [],
    askedQuestionIds: [],
    playerNotes: {},
    starredEvidenceIds: [],
    boardPositions: {},
    connections: [],
    hintsUsed: 0,
    accusationAttempts: 0,
    isSolved: false,
    score: undefined,
    solvedAt: undefined,
    secondsElapsed: 0,
  };
}

export function loadCaseProgress(
  caseId: string,
  defaultDiff: Difficulty = "easy"
): PlayerCaseProgress {
  if (typeof window === "undefined") {
    return getDefaultCaseProgress(caseId, defaultDiff);
  }
  try {
    const raw = localStorage.getItem(`${STORAGE_KEY_PREFIX}${caseId}`);
    if (!raw) return getDefaultCaseProgress(caseId, defaultDiff);
    const parsed = JSON.parse(raw);
    return {
      ...getDefaultCaseProgress(caseId, defaultDiff),
      ...parsed,
    };
  } catch (err) {
    console.error("Failed to load case progress from localStorage", err);
    return getDefaultCaseProgress(caseId, defaultDiff);
  }
}

export function saveCaseProgress(progress: PlayerCaseProgress): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(
      `${STORAGE_KEY_PREFIX}${progress.caseId}`,
      JSON.stringify(progress)
    );
  } catch (err) {
    console.error("Failed to save case progress", err);
  }
}

export function resetCaseProgress(
  caseId: string,
  defaultDiff: Difficulty = "easy"
): PlayerCaseProgress {
  if (typeof window !== "undefined") {
    localStorage.removeItem(`${STORAGE_KEY_PREFIX}${caseId}`);
  }
  return getDefaultCaseProgress(caseId, defaultDiff);
}

export function resetAllProgress(): void {
  if (typeof window === "undefined") return;
  try {
    const keysToRemove: string[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (k && k.startsWith(STORAGE_KEY_PREFIX)) {
        keysToRemove.push(k);
      }
    }
    keysToRemove.forEach((k) => localStorage.removeItem(k));
  } catch (err) {
    console.error("Failed to reset all progress", err);
  }
}

export function loadGlobalSettings(): GlobalSettings {
  if (typeof window === "undefined") {
    return {
      defaultDifficulty: "easy",
      reducedMotion: false,
      highContrast: false,
      fontSize: "normal",
    };
  }
  try {
    const raw = localStorage.getItem(GLOBAL_SETTINGS_KEY);
    if (!raw) {
      return {
        defaultDifficulty: "easy",
        reducedMotion: false,
        highContrast: false,
        fontSize: "normal",
      };
    }
    return JSON.parse(raw);
  } catch {
    return {
      defaultDifficulty: "easy",
      reducedMotion: false,
      highContrast: false,
      fontSize: "normal",
    };
  }
}

export function saveGlobalSettings(settings: GlobalSettings): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(GLOBAL_SETTINGS_KEY, JSON.stringify(settings));
  } catch (err) {
    console.error("Failed to save global settings", err);
  }
}

export function calculateDetectiveScore(params: {
  isCorrect: boolean;
  difficulty: Difficulty;
  hintsUsed: number;
  attempts: number;
  secondsElapsed: number;
}): { score: number; rank: string } {
  if (!params.isCorrect) {
    return { score: 25, rank: "INCONCLUSIVE WARRANT" };
  }

  let baseScore = 75;
  // Difficulty multiplier
  if (params.difficulty === "very-hard") baseScore += 25;
  else if (params.difficulty === "hard") baseScore += 20;
  else if (params.difficulty === "medium") baseScore += 15;
  else baseScore += 10;

  // Penalties
  const hintPenalty = params.hintsUsed * 5;
  const attemptPenalty = (params.attempts - 1) * 8;
  const timePenalty = Math.min(10, Math.floor(params.secondsElapsed / 600)); // 1 pt per 10 mins up to 10

  const totalScore = Math.max(40, Math.min(100, baseScore - hintPenalty - attemptPenalty - timePenalty));

  let rank = "ROOKIE CONSTABLE";
  if (totalScore >= 90) rank = "MASTER INQUISITOR";
  else if (totalScore >= 80) rank = "CHIEF INSPECTOR";
  else if (totalScore >= 70) rank = "SENIOR DETECTIVE";
  else if (totalScore >= 60) rank = "FIELD INVESTIGATOR";

  return { score: totalScore, rank };
}
