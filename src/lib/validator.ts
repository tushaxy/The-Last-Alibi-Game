import { Case } from "@/types/game";
import { ALL_CASES } from "@/data/cases";

export interface ValidationError {
  caseId: string;
  field: string;
  message: string;
}

export function validateCaseData(cases: Case[] = ALL_CASES): {
  isValid: boolean;
  errors: ValidationError[];
} {
  const errors: ValidationError[] = [];

  cases.forEach((c) => {
    // 1. Check basic metadata
    if (!c.id || !c.slug || !c.title) {
      errors.push({ caseId: c.id || "unknown", field: "metadata", message: "Missing id, slug, or title" });
    }

    // 2. Check at least 4 suspects
    if (!c.suspects || c.suspects.length < 4) {
      errors.push({ caseId: c.id, field: "suspects", message: `Expected at least 4 suspects, found ${c.suspects?.length}` });
    }

    const suspectIds = new Set(c.suspects.map((s) => s.id));
    if (suspectIds.size !== c.suspects.length) {
      errors.push({ caseId: c.id, field: "suspects", message: "Duplicate suspect IDs found" });
    }

    // 3. Check evidence items
    if (!c.evidence || c.evidence.length < 5) {
      errors.push({ caseId: c.id, field: "evidence", message: `Expected at least 5 evidence items, found ${c.evidence?.length}` });
    }

    const evidenceIds = new Set(c.evidence.map((e) => e.id));
    if (evidenceIds.size !== c.evidence.length) {
      errors.push({ caseId: c.id, field: "evidence", message: "Duplicate evidence IDs found" });
    }

    // 4. Check hotspots link to valid evidence
    c.crimeScene.hotspots.forEach((hs) => {
      if (!evidenceIds.has(hs.evidenceId)) {
        errors.push({ caseId: c.id, field: "hotspots", message: `Hotspot ${hs.id} references non-existent evidence ${hs.evidenceId}` });
      }
    });

    // 5. Check interview stages unlock conditions and required evidence
    c.suspects.forEach((sus) => {
      sus.interviewStages.forEach((stage) => {
        if (stage.requiredEvidenceId && !evidenceIds.has(stage.requiredEvidenceId)) {
          errors.push({
            caseId: c.id,
            field: "interviewStages",
            message: `Suspect ${sus.name} question ${stage.id} requires non-existent evidence ${stage.requiredEvidenceId}`,
          });
        }
      });
    });

    // 6. Check timeline events reference valid suspects and evidence
    c.timeline.forEach((tl) => {
      tl.relatedEvidence.forEach((evId) => {
        if (!evidenceIds.has(evId)) {
          errors.push({ caseId: c.id, field: "timeline", message: `Timeline ${tl.id} references non-existent evidence ${evId}` });
        }
      });
      tl.relatedSuspects.forEach((susId) => {
        if (!suspectIds.has(susId)) {
          errors.push({ caseId: c.id, field: "timeline", message: `Timeline ${tl.id} references non-existent suspect ${susId}` });
        }
      });
    });

    // 7. Check Solution validity
    if (!suspectIds.has(c.solution.culpritId)) {
      errors.push({ caseId: c.id, field: "solution", message: `Culprit ${c.solution.culpritId} does not match any suspect` });
    }

    c.solution.decisiveEvidenceIds.forEach((evId) => {
      if (!evidenceIds.has(evId)) {
        errors.push({ caseId: c.id, field: "solution", message: `Decisive evidence ${evId} does not exist in evidence locker` });
      }
    });

    // Check innocent suspect explanations exist for all other suspects
    c.suspects.forEach((sus) => {
      if (sus.id !== c.solution.culpritId) {
        if (!c.solution.innocentSuspectExplanations[sus.id]) {
          errors.push({
            caseId: c.id,
            field: "innocentSuspectExplanations",
            message: `Missing innocent suspect explanation for ${sus.name} (${sus.id})`,
          });
        }
      }
    });

    // Check red herrings have documented explanations
    c.evidence
      .filter((e) => e.isRedHerring)
      .forEach((rh) => {
        if (!c.solution.redHerringExplanations[rh.id]) {
          errors.push({
            caseId: c.id,
            field: "redHerringExplanations",
            message: `Missing red herring explanation for evidence ${rh.title} (${rh.id})`,
          });
        }
      });

    // 8. Check hints exist for all difficulties
    const difficulties = ["easy", "medium", "hard", "very-hard"] as const;
    difficulties.forEach((diff) => {
      if (!c.difficultyHints[diff] || c.difficultyHints[diff].length === 0) {
        errors.push({ caseId: c.id, field: "difficultyHints", message: `Missing hints for difficulty ${diff}` });
      }
    });

    // 9. Check deduction form options exist
    if (
      !c.deductionFormOptions ||
      c.deductionFormOptions.motives.length < 2 ||
      c.deductionFormOptions.methods.length < 2 ||
      c.deductionFormOptions.contradictions.length < 2
    ) {
      errors.push({ caseId: c.id, field: "deductionFormOptions", message: "Incomplete deduction form options" });
    }
  });

  return {
    isValid: errors.length === 0,
    errors,
  };
}
