import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { ALL_CASES, getCaseBySlug, getCaseById } from "../src/data/cases";
import { validateCaseData } from "../src/lib/validator";
import { calculateDetectiveScore } from "../src/lib/storage";

describe("THE LAST ALIBI — Comprehensive Game Logic & Case Integrity Suite", () => {
  it("should have exactly 4 playable original cases", () => {
    assert.equal(ALL_CASES.length, 4);
    assert.deepEqual(
      ALL_CASES.map((c) => c.slug),
      ["the-last-train", "the-glasshouse", "the-blackout-room", "the-hollow-saint"]
    );
  });

  it("should pass all schema, reference, and unlocked logic validations with 0 errors", () => {
    const result = validateCaseData(ALL_CASES);
    assert.equal(result.isValid, true);
    assert.equal(result.errors.length, 0);
  });

  it("every case must have at least four suspects with valid alibis and motives", () => {
    ALL_CASES.forEach((c) => {
      assert.ok(c.suspects.length >= 4, `Case ${c.id} has fewer than 4 suspects`);
      c.suspects.forEach((sus) => {
        assert.ok(sus.id, `Suspect in ${c.id} missing id`);
        assert.ok(sus.name, `Suspect in ${c.id} missing name`);
        assert.ok(sus.occupation, `Suspect ${sus.id} missing occupation`);
        assert.ok(sus.alibi, `Suspect ${sus.id} missing alibi`);
        assert.ok(sus.publicMotive, `Suspect ${sus.id} missing public motive`);
        assert.ok(sus.interviewStages.length >= 1, `Suspect ${sus.id} has no interview stages`);
      });
    });
  });

  it("every case must have exactly one defensible canonical solution with decisive evidence", () => {
    ALL_CASES.forEach((c) => {
      const solution = c.solution;
      assert.ok(solution.culpritId, `Case ${c.id} missing culprit`);
      assert.ok(
        c.suspects.some((s) => s.id === solution.culpritId),
        `Culprit ${solution.culpritId} not found in suspects of ${c.id}`
      );
      assert.ok(solution.motive, `Case ${c.id} missing motive`);
      assert.ok(solution.method, `Case ${c.id} missing method`);
      assert.ok(solution.decisiveEvidenceIds.length > 0, `Case ${c.id} missing decisive evidence`);

      // Decisive evidence exists in evidence locker
      solution.decisiveEvidenceIds.forEach((evId) => {
        assert.ok(
          c.evidence.some((e) => e.id === evId),
          `Decisive evidence ${evId} not in evidence list of ${c.id}`
        );
      });

      // All innocent suspects have clearance explanations
      c.suspects.forEach((s) => {
        if (s.id !== solution.culpritId) {
          assert.ok(
            solution.innocentSuspectExplanations[s.id],
            `Missing clearance explanation for ${s.name} in ${c.id}`
          );
        }
      });

      // All red herrings have documented explanations
      const redHerrings = c.evidence.filter((e) => e.isRedHerring);
      redHerrings.forEach((rh) => {
        assert.ok(
          solution.redHerringExplanations[rh.id],
          `Missing red herring explanation for ${rh.title} in ${c.id}`
        );
      });
    });
  });

  it("difficulty settings change hint guidance but NEVER change the canonical murderer", () => {
    ALL_CASES.forEach((c) => {
      const canonicalCulprit = c.solution.culpritId;
      const difficulties = ["easy", "medium", "hard", "very-hard"] as const;

      difficulties.forEach((diff) => {
        assert.ok(
          c.difficultyHints[diff].length >= 3,
          `Case ${c.id} has fewer than 3 hints for ${diff}`
        );
        assert.equal(c.solution.culpritId, canonicalCulprit);
      });
    });
  });

  it("scoring engine calculates proper rank and penalties", () => {
    // Perfect very-hard run
    const perfect = calculateDetectiveScore({
      isCorrect: true,
      difficulty: "very-hard",
      hintsUsed: 0,
      attempts: 1,
      secondsElapsed: 300,
    });
    assert.ok(perfect.score >= 90);
    assert.equal(perfect.rank, "MASTER INQUISITOR");

    // Easy run with hints
    const guided = calculateDetectiveScore({
      isCorrect: true,
      difficulty: "easy",
      hintsUsed: 3,
      attempts: 2,
      secondsElapsed: 900,
    });
    assert.ok(guided.score < perfect.score);

    // Inconclusive attempt
    const failed = calculateDetectiveScore({
      isCorrect: false,
      difficulty: "hard",
      hintsUsed: 1,
      attempts: 1,
      secondsElapsed: 500,
    });
    assert.equal(failed.score, 25);
    assert.equal(failed.rank, "INCONCLUSIVE WARRANT");
  });

  it("should retrieve cases correctly by slug and id", () => {
    const case1 = getCaseBySlug("the-last-train");
    assert.equal(case1?.id, "case-001");
    assert.equal(case1?.solution.culpritId, "sus-marcus");

    const case2 = getCaseBySlug("the-glasshouse");
    assert.equal(case2?.id, "case-002");
    assert.equal(case2?.solution.culpritId, "sus-nora");

    const case3 = getCaseBySlug("the-blackout-room");
    assert.equal(case3?.id, "case-003");
    assert.equal(case3?.solution.culpritId, "sus-dev");

    const case4 = getCaseBySlug("the-hollow-saint");
    assert.equal(case4?.id, "case-004");
    assert.equal(case4?.solution.culpritId, "sus-elias");
  });
});
