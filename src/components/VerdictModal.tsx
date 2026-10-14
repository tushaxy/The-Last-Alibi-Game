"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import confetti from "canvas-confetti";
import { Case, AccusationResult } from "@/types/game";
import { soundEngine } from "@/lib/audio";
import {
  ShieldCheck,
  AlertTriangle,
  RotateCcw,
  Archive,
  BookOpen,
  Award,
  CheckCircle,
  XCircle,
  HelpCircle,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

interface VerdictModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentCase: Case;
  result: AccusationResult;
  hintsUsed: number;
  secondsElapsed: number;
  onReplayCase: () => void;
}

export function VerdictModal({
  isOpen,
  onClose,
  currentCase,
  result,
  hintsUsed,
  secondsElapsed,
  onReplayCase,
}: VerdictModalProps) {
  const [showFullSolution, setShowFullSolution] = useState(result.isCorrect);
  const [showConfirmReveal, setShowConfirmReveal] = useState(false);

  useEffect(() => {
    if (isOpen && result.isCorrect) {
      setShowFullSolution(true);
      // Trigger confetti celebration
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ["#dfc38c", "#a52a2a", "#ffb3ad", "#ffffff"],
        });
      } catch {
        // canvas-confetti fallback
      }
    } else {
      setShowFullSolution(false);
    }
  }, [isOpen, result.isCorrect]);

  if (!isOpen) return null;

  const minutes = Math.floor(secondsElapsed / 60);
  const seconds = secondsElapsed % 60;
  const timeFormatted = `${minutes}m ${seconds < 10 ? "0" : ""}${seconds}s`;

  const culpritObj = currentCase.suspects.find((s) => s.id === currentCase.solution.culpritId);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl my-8 bg-[#191816] border-2 border-[#38342D] shadow-2xl p-6 md:p-8 text-[#EAE3D5] space-y-6">
        {/* Verdict Banner */}
        <div
          className={`p-5 border text-center space-y-2 ${
            result.isCorrect
              ? "bg-[#2e7d32]/20 border-[#2e7d32]"
              : "bg-[#a52a2a]/20 border-[#a52a2a]"
          }`}
        >
          <div className="flex items-center justify-center gap-2">
            {result.isCorrect ? (
              <ShieldCheck className="w-6 h-6 text-[#81c784]" />
            ) : (
              <AlertTriangle className="w-6 h-6 text-[#ffb3ad]" />
            )}
            <span
              className={`font-mono text-xs uppercase tracking-widest font-bold ${
                result.isCorrect ? "text-[#81c784]" : "text-[#ffb3ad]"
              }`}
            >
              {result.isCorrect ? "CRIMINAL WARRANT AFFIRMED" : "INSUFFICIENT PROOF // WARRANT REJECTED"}
            </span>
          </div>

          <h2 className="font-serif text-3xl font-bold">
            {result.isCorrect ? "Case Solved: True Perpetrator Unmasked" : "Accusation Inconclusive"}
          </h2>

          <p className="font-sans text-xs text-[#cdc5bb] max-w-xl mx-auto">
            {result.feedbackMessage}
          </p>

          {/* Score & Rank Badges */}
          {result.isCorrect && (
            <div className="flex flex-wrap items-center justify-center gap-4 pt-3 font-mono text-xs">
              <div className="bg-[#10100F] px-3 py-1.5 border border-[#dfc38c]">
                <span className="text-[#9B958B]">DETECTIVE SCORE: </span>
                <span className="text-[#dfc38c] font-bold">{result.score} / 100</span>
              </div>
              <div className="bg-[#10100F] px-3 py-1.5 border border-[#dfc38c]">
                <span className="text-[#9B958B]">RANK: </span>
                <span className="text-[#81c784] font-bold">{result.rank}</span>
              </div>
              <div className="bg-[#10100F] px-3 py-1.5 border border-[#38342D]">
                <span className="text-[#9B958B]">TIME: </span>
                <span className="text-[#EAE3D5]">{timeFormatted}</span>
              </div>
              <div className="bg-[#10100F] px-3 py-1.5 border border-[#38342D]">
                <span className="text-[#9B958B]">HINTS USED: </span>
                <span className="text-[#EAE3D5]">{hintsUsed}</span>
              </div>
            </div>
          )}
        </div>

        {/* Deductive Breakdown Grid (Checkmarks/Crosses) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 bg-[#10100F] p-4 border border-[#38342D] text-xs font-mono">
          <div className="flex items-center gap-2">
            {result.isCulpritCorrect ? (
              <CheckCircle className="w-4 h-4 text-[#81c784] shrink-0" />
            ) : (
              <XCircle className="w-4 h-4 text-[#ffb3ad] shrink-0" />
            )}
            <span className="truncate">CULPRIT IDENTIFIED</span>
          </div>
          <div className="flex items-center gap-2">
            {result.isMotiveCorrect ? (
              <CheckCircle className="w-4 h-4 text-[#81c784] shrink-0" />
            ) : (
              <XCircle className="w-4 h-4 text-[#ffb3ad] shrink-0" />
            )}
            <span className="truncate">MOTIVE PROVEN</span>
          </div>
          <div className="flex items-center gap-2">
            {result.isMethodCorrect ? (
              <CheckCircle className="w-4 h-4 text-[#81c784] shrink-0" />
            ) : (
              <XCircle className="w-4 h-4 text-[#ffb3ad] shrink-0" />
            )}
            <span className="truncate">METHOD EXPLAINED</span>
          </div>
          <div className="flex items-center gap-2">
            {result.isContradictionCorrect ? (
              <CheckCircle className="w-4 h-4 text-[#81c784] shrink-0" />
            ) : (
              <XCircle className="w-4 h-4 text-[#ffb3ad] shrink-0" />
            )}
            <span className="truncate">ALIBI SHATTERED</span>
          </div>
        </div>

        {/* Full Case Solution Section (Always shown on victory, or unsealed on surrender) */}
        {showFullSolution ? (
          <div className="space-y-5 border-t border-[#38342D] pt-4">
            {/* The True Culprit Dossier */}
            <div className="bg-[#201E1A] border border-[#dfc38c] p-4 flex flex-col sm:flex-row gap-4 items-center sm:items-start">
              {culpritObj && (
                <img
                  src={culpritObj.portrait}
                  alt={culpritObj.name}
                  className="w-20 h-20 object-cover border border-[#38342D] shrink-0"
                />
              )}
              <div>
                <span className="font-mono text-[10px] text-[#a52a2a] uppercase font-bold tracking-widest block mb-0.5">
                  GUILTY PARTY REVEALED
                </span>
                <h3 className="font-serif text-2xl font-bold text-[#EAE3D5]">
                  {culpritObj ? culpritObj.name : "Perpetrator Confirmed"}
                </h3>
                <p className="font-sans text-xs text-[#cdc5bb] mt-1 leading-relaxed">
                  {currentCase.solution.motive}
                </p>
              </div>
            </div>

            {/* The Execution Method & Locked-Room Breakdown */}
            <div className="bg-[#10100F] border border-[#38342D] p-4 space-y-2">
              <span className="font-mono text-xs uppercase text-[#dfc38c] font-bold block">
                THE EXECUTION &amp; MECHANICAL RUSE
              </span>
              <p className="font-sans text-xs text-[#EAE3D5] leading-relaxed">
                {currentCase.solution.method}
              </p>
            </div>

            {/* Narrative Chronological Sequence */}
            <div className="bg-[#10100F] border border-[#38342D] p-4 space-y-2">
              <span className="font-mono text-xs uppercase text-[#dfc38c] font-bold block">
                RECONSTRUCTED EVENT SEQUENCE
              </span>
              <div className="space-y-1.5">
                {currentCase.solution.chronologicalSequence.map((step, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs font-sans text-[#cdc5bb]">
                    <span className="font-mono text-[#a52a2a] font-bold shrink-0">{idx + 1}.</span>
                    <span>{step}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Innocent Suspects & Red Herring Explanations */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-[#10100F] border border-[#38342D] p-4 space-y-2">
                <span className="font-mono text-[11px] text-[#81c784] uppercase font-bold block">
                  INNOCENT SUSPECTS EXPLAINED
                </span>
                <div className="space-y-2 text-xs font-sans text-[#cdc5bb]">
                  {Object.entries(currentCase.solution.innocentSuspectExplanations).map(
                    ([susId, expl]) => {
                      const sus = currentCase.suspects.find((s) => s.id === susId);
                      return (
                        <div key={susId} className="border-b border-[#38342D]/50 pb-1.5 last:border-0">
                          <span className="font-mono text-[#dfc38c] font-bold mr-1">
                            {sus ? sus.name : susId}:
                          </span>
                          <span>{expl}</span>
                        </div>
                      );
                    }
                  )}
                </div>
              </div>

              <div className="bg-[#10100F] border border-[#38342D] p-4 space-y-2">
                <span className="font-mono text-[11px] text-[#ffb3ad] uppercase font-bold block">
                  RED HERRINGS RESOLVED
                </span>
                <div className="space-y-2 text-xs font-sans text-[#cdc5bb]">
                  {Object.entries(currentCase.solution.redHerringExplanations).map(
                    ([evId, expl]) => {
                      const ev = currentCase.evidence.find((e) => e.id === evId);
                      return (
                        <div key={evId} className="border-b border-[#38342D]/50 pb-1.5 last:border-0">
                          <span className="font-mono text-[#dfc38c] font-bold mr-1">
                            {ev ? ev.title : evId}:
                          </span>
                          <span>{expl}</span>
                        </div>
                      );
                    }
                  )}
                </div>
              </div>
            </div>

            {/* Full Author Resolution Narrative */}
            <div className="p-4 bg-[#201E1A] border-l-2 border-[#dfc38c] text-xs font-sans italic text-[#EAE3D5] leading-relaxed">
              &ldquo;{currentCase.solution.fullResolutionNarrative}&rdquo;
            </div>
          </div>
        ) : (
          /* Incorrect Accusation: Option to Try Again or Reveal Solution */
          <div className="space-y-4 border-t border-[#38342D] pt-4">
            <div className="bg-[#10100F] border border-[#38342D] p-4 text-xs font-sans text-[#cdc5bb] space-y-2">
              <p>
                The magistrate has reviewed your warrant and found critical logical inconsistencies.
                Review your gathered clues, re-interrogate suspects regarding their alibi timing, and
                confirm that your execution method matches physical evidence.
              </p>
              <p className="font-mono text-[#dfc38c]">
                Tip: You may re-examine any exhibit, check the Contradiction Scanner, or use an
                Investigative Hint before submitting another accusation.
              </p>
            </div>

            {!showConfirmReveal ? (
              <div className="flex justify-end">
                <button
                  onClick={() => setShowConfirmReveal(true)}
                  className="font-mono text-xs text-[#9B958B] hover:text-[#ffb3ad] underline"
                >
                  Surrender Investigation &amp; Reveal Full Solution
                </button>
              </div>
            ) : (
              <div className="p-3 bg-[#a52a2a]/20 border border-[#a52a2a] text-center space-y-2">
                <p className="font-mono text-xs text-[#ffb3ad] font-bold">
                  CONFIRM SOLUTION DISCLOSURE?
                </p>
                <p className="text-xs text-[#cdc5bb]">
                  This will reveal the entire authored mystery, culprit confession, and mechanical
                  breakdown.
                </p>
                <div className="flex justify-center gap-2 pt-1">
                  <button
                    onClick={() => {
                      setShowFullSolution(true);
                      setShowConfirmReveal(false);
                    }}
                    className="px-3 py-1 bg-[#a52a2a] text-white font-mono text-xs uppercase font-bold"
                  >
                    Yes, Reveal Solution
                  </button>
                  <button
                    onClick={() => setShowConfirmReveal(false)}
                    className="px-3 py-1 bg-[#201E1A] border border-[#38342D] text-[#9B958B] font-mono text-xs"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Modal Action Buttons */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[#38342D] pt-4">
          <Link
            href="/"
            className="flex items-center gap-1.5 px-4 py-2 bg-[#201E1A] border border-[#38342D] hover:border-[#dfc38c] text-[#dfc38c] font-mono text-xs uppercase tracking-wider transition-colors"
          >
            <Archive className="w-4 h-4" />
            <span>CASE ARCHIVE</span>
          </Link>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                onReplayCase();
                onClose();
              }}
              className="flex items-center gap-1.5 px-4 py-2 bg-[#201E1A] border border-[#38342D] hover:border-[#dfc38c] text-[#cdc5bb] font-mono text-xs uppercase tracking-wider transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              <span>REPLAY CASE</span>
            </button>

            {!result.isCorrect && !showFullSolution && (
              <button
                onClick={onClose}
                className="px-5 py-2 bg-[#a52a2a] hover:bg-[#8C2323] text-white font-mono text-xs uppercase tracking-widest font-bold transition-colors shadow-lg"
              >
                RETURN TO INVESTIGATION
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
