"use client";

import React, { useState } from "react";
import { Case, Difficulty, AccusationSubmission, AccusationResult } from "@/types/game";
import { calculateDetectiveScore } from "@/lib/storage";
import { soundEngine } from "@/lib/audio";
import { VerdictModal } from "./VerdictModal";
import { CheckCircle2, AlertOctagon, HelpCircle, FileText, X } from "lucide-react";

interface AccusationModalProps {
  currentCase: Case;
  difficulty: Difficulty;
  discoveredEvidenceIds: string[];
  hintsUsed: number;
  secondsElapsed: number;
  accusationAttempts: number;
  onAccusationSubmitted: (result: AccusationResult) => void;
  onReplayCase: () => void;
}

export function AccusationModal({
  currentCase,
  difficulty,
  discoveredEvidenceIds,
  hintsUsed,
  secondsElapsed,
  accusationAttempts,
  onAccusationSubmitted,
  onReplayCase,
}: AccusationModalProps) {
  const [culpritId, setCulpritId] = useState<string>(currentCase.suspects[0]?.id || "");
  const [motiveId, setMotiveId] = useState<string>(
    currentCase.deductionFormOptions.motives[0]?.id || ""
  );
  const [methodId, setMethodId] = useState<string>(
    currentCase.deductionFormOptions.methods[0]?.id || ""
  );
  const [decisiveEvidenceId, setDecisiveEvidenceId] = useState<string>(
    currentCase.evidence[0]?.id || ""
  );
  const [contradictionId, setContradictionId] = useState<string>(
    currentCase.deductionFormOptions.contradictions[0]?.id || ""
  );
  const [detectiveNotes, setDetectiveNotes] = useState("");

  const [verdictResult, setVerdictResult] = useState<AccusationResult | null>(null);
  const [isVerdictOpen, setIsVerdictOpen] = useState(false);

  const handleSubmitWarrant = (e: React.FormEvent) => {
    e.preventDefault();

    // Grade submission
    const isCulpritCorrect = culpritId === currentCase.solution.culpritId;

    // Check motive
    const correctMotivePrefixes: Record<string, string> = {
      "case-001": "mot-embezzle",
      "case-002": "mot-orchid-theft",
      "case-003": "mot-crypto-embezzle",
      "case-004": "mot-imposter-identity",
    };
    const isMotiveCorrect = motiveId === correctMotivePrefixes[currentCase.id];

    // Check method
    const correctMethodPrefixes: Record<string, string> = {
      "case-001": "meth-thread",
      "case-002": "meth-tamper-heat",
      "case-003": "meth-fiber-cable",
      "case-004": "meth-priest-hole",
    };
    const isMethodCorrect = methodId === correctMethodPrefixes[currentCase.id];

    // Check decisive evidence
    const isEvidenceCorrect = currentCase.solution.decisiveEvidenceIds.includes(decisiveEvidenceId);

    // Check contradiction
    const correctContradictionPrefixes: Record<string, string> = {
      "case-001": "con-dining-fire",
      "case-002": "con-perlite-shoes",
      "case-003": "con-smartwatch-heart",
      "case-004": "con-footprint-wall",
    };
    const isContradictionCorrect = contradictionId === correctContradictionPrefixes[currentCase.id];

    const isAllCorrect =
      isCulpritCorrect &&
      isMotiveCorrect &&
      isMethodCorrect &&
      isEvidenceCorrect &&
      isContradictionCorrect;

    const { score, rank } = calculateDetectiveScore({
      isCorrect: isAllCorrect,
      difficulty,
      hintsUsed,
      attempts: accusationAttempts + 1,
      secondsElapsed,
    });

    let feedbackMessage = "";
    if (isAllCorrect) {
      feedbackMessage =
        "Flawless deduction. Your evidence connections, motive reconstruction, and mechanical breakdown are incontrovertible. The magistrate has issued an immediate warrant for arrest.";
    } else if (!isCulpritCorrect) {
      feedbackMessage =
        "The named suspect has a verified alibi or did not commit this crime. Review the timeline and physical traces.";
    } else if (!isMethodCorrect || !isEvidenceCorrect) {
      feedbackMessage =
        "You have identified the correct suspect, but your explanation of their physical method or decisive evidence is unsupported by crime scene exhibits.";
    } else {
      feedbackMessage =
        "Your accusation contains logical discrepancies. Re-examine the decisive contradiction that shatters the alibi.";
    }

    soundEngine.playVerdictFanfare(isAllCorrect);

    const result: AccusationResult = {
      isCorrect: isAllCorrect,
      isCulpritCorrect,
      isMotiveCorrect,
      isMethodCorrect,
      isEvidenceCorrect,
      isContradictionCorrect,
      score,
      rank,
      feedbackMessage,
    };

    setVerdictResult(result);
    setIsVerdictOpen(true);
    onAccusationSubmitted(result);
  };

  return (
    <>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#38342D] pb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="font-mono text-xs uppercase tracking-widest text-[#a52a2a] font-bold">
                MAGISTRATE SUMMARY PROCEEDINGS
              </span>
              <span className="h-1.5 w-1.5 rounded-full bg-[#a52a2a]" />
              <span className="font-mono text-xs text-[#9B958B]">FINAL CRIMINAL WARRANT</span>
            </div>
            <h2 className="font-serif text-2xl lg:text-3xl text-[#EAE3D5]">
              Formal Accusation
            </h2>
            <p className="font-sans text-sm text-[#9B958B] mt-1 max-w-3xl">
              Submit your formal indictment to the Crown Magistrate. Identify the true perpetrator, prove their decisive motive, explain the mechanical method, and present the single contradiction that shattered their alibi.
            </p>
          </div>

          <div className="font-mono text-xs text-[#dfc38c] bg-[#201E1A] px-3 py-1.5 border border-[#38342D]">
            ATTEMPTS RECORDED: {accusationAttempts}
          </div>
        </div>

        {/* Accusation Form Card */}
        <form
          onSubmit={handleSubmitWarrant}
          className="bg-[#191816] border border-[#38342D] p-6 shadow-2xl space-y-6 max-w-4xl"
        >
          {/* 1. Suspected Perpetrator */}
          <div className="space-y-2">
            <label className="font-mono text-xs uppercase tracking-wider text-[#dfc38c] font-bold block">
              1. SUSPECTED PERPETRATOR (WHO COMMITTED THE CRIME?)
            </label>
            <select
              value={culpritId}
              onChange={(e) => setCulpritId(e.target.value)}
              className="w-full bg-[#201E1A] border border-[#38342D] text-sm font-serif text-[#EAE3D5] p-3 focus:border-[#dfc38c] focus:outline-none"
            >
              {currentCase.suspects.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name} — {s.occupation}
                </option>
              ))}
            </select>
          </div>

          {/* 2. Primary Motive */}
          <div className="space-y-2">
            <label className="font-mono text-xs uppercase tracking-wider text-[#dfc38c] font-bold block">
              2. DECISIVE MOTIVE (WHY DID THEY ACT?)
            </label>
            <select
              value={motiveId}
              onChange={(e) => setMotiveId(e.target.value)}
              className="w-full bg-[#201E1A] border border-[#38342D] text-sm font-sans text-[#EAE3D5] p-3 focus:border-[#dfc38c] focus:outline-none"
            >
              {currentCase.deductionFormOptions.motives.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.label}
                </option>
              ))}
            </select>
          </div>

          {/* 3. Execution Method */}
          <div className="space-y-2">
            <label className="font-mono text-xs uppercase tracking-wider text-[#dfc38c] font-bold block">
              3. METHOD &amp; LOCKED-ROOM RUSE (HOW DID THEY CARRY OUT THE MURDER?)
            </label>
            <select
              value={methodId}
              onChange={(e) => setMethodId(e.target.value)}
              className="w-full bg-[#201E1A] border border-[#38342D] text-sm font-sans text-[#EAE3D5] p-3 focus:border-[#dfc38c] focus:outline-none"
            >
              {currentCase.deductionFormOptions.methods.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.label}
                </option>
              ))}
            </select>
          </div>

          {/* 4. Decisive Physical Evidence */}
          <div className="space-y-2">
            <label className="font-mono text-xs uppercase tracking-wider text-[#dfc38c] font-bold block">
              4. DECISIVE EXHIBIT (WHICH PIECE OF PHYSICAL PROOF IS INDISPENSABLE?)
            </label>
            <select
              value={decisiveEvidenceId}
              onChange={(e) => setDecisiveEvidenceId(e.target.value)}
              className="w-full bg-[#201E1A] border border-[#38342D] text-sm font-mono text-[#EAE3D5] p-3 focus:border-[#dfc38c] focus:outline-none"
            >
              {currentCase.evidence.map((ev) => {
                const isDiscovered = discoveredEvidenceIds.includes(ev.id);
                return (
                  <option key={ev.id} value={ev.id}>
                    {ev.id.toUpperCase()}: {ev.title} {isDiscovered ? "(DISCOVERED)" : "(UNEXAMINED)"}
                  </option>
                );
              })}
            </select>
          </div>

          {/* 5. Fatal Alibi Contradiction */}
          <div className="space-y-2">
            <label className="font-mono text-xs uppercase tracking-wider text-[#dfc38c] font-bold block">
              5. CENTRAL ALIBI CONTRADICTION (WHAT DISPROVES THEIR DEFENSE?)
            </label>
            <select
              value={contradictionId}
              onChange={(e) => setContradictionId(e.target.value)}
              className="w-full bg-[#201E1A] border border-[#38342D] text-sm font-sans text-[#EAE3D5] p-3 focus:border-[#dfc38c] focus:outline-none"
            >
              {currentCase.deductionFormOptions.contradictions.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.label}
                </option>
              ))}
            </select>
          </div>

          {/* 6. Detective Free-Text Rationale */}
          <div className="space-y-2">
            <label className="font-mono text-xs uppercase tracking-wider text-[#9B958B] block">
              6. DETECTIVE SUMMARY &amp; FINAL RATIONALE (OPTIONAL MEMORANDUM)
            </label>
            <textarea
              rows={3}
              value={detectiveNotes}
              onChange={(e) => setDetectiveNotes(e.target.value)}
              placeholder="State your overall theory of the crime and timeline reconstruction..."
              className="w-full bg-[#201E1A] border border-[#38342D] text-xs font-mono text-[#EAE3D5] p-3 focus:border-[#dfc38c] focus:outline-none placeholder-[#9B958B]"
            />
          </div>

          {/* Submit Button */}
          <div className="pt-4 border-t border-[#38342D] flex items-center justify-between">
            <div className="font-mono text-[11px] text-[#9B958B]">
              STATUS: READY TO SUBMIT FOR JUDICIAL REVIEW
            </div>
            <button
              type="submit"
              className="px-6 py-3 bg-[#a52a2a] hover:bg-[#8C2323] text-white font-mono text-xs uppercase tracking-widest font-bold transition-all shadow-xl hover:shadow-red-950/50 flex items-center gap-2"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>SUBMIT FORMAL ACCUSATION</span>
            </button>
          </div>
        </form>
      </div>

      {verdictResult && (
        <VerdictModal
          isOpen={isVerdictOpen}
          onClose={() => setIsVerdictOpen(false)}
          currentCase={currentCase}
          result={verdictResult}
          hintsUsed={hintsUsed}
          secondsElapsed={secondsElapsed}
          onReplayCase={onReplayCase}
        />
      )}
    </>
  );
}
