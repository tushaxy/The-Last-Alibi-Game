"use client";

import React, { useState } from "react";
import { Case, Suspect, EvidenceItem } from "@/types/game";
import { soundEngine } from "@/lib/audio";
import { AlertOctagon, CheckCircle2, HelpCircle, ShieldAlert, Sparkles } from "lucide-react";

interface ContradictionScannerProps {
  currentCase: Case;
  discoveredEvidenceIds: string[];
}

export function ContradictionScanner({
  currentCase,
  discoveredEvidenceIds,
}: ContradictionScannerProps) {
  const [selectedSuspectId, setSelectedSuspectId] = useState<string>(
    currentCase.suspects[0]?.id || ""
  );
  const [selectedEvidenceId, setSelectedEvidenceId] = useState<string | null>(null);
  const [scanResult, setScanResult] = useState<{
    verdict: string;
    isFatal: boolean;
    headline: string;
    explanation: string;
    badge: string;
  } | null>(null);

  const selectedSuspect =
    currentCase.suspects.find((s) => s.id === selectedSuspectId) || currentCase.suspects[0];

  const handleTestEvidence = (ev: EvidenceItem) => {
    setSelectedEvidenceId(ev.id);
    soundEngine.playClick();

    // Check if this evidence exposes a contradiction for this suspect
    const isCulprit = selectedSuspect.id === currentCase.solution.culpritId;
    const isDecisiveEvidence = currentCase.solution.decisiveEvidenceIds.includes(ev.id);

    if (isCulprit && isDecisiveEvidence) {
      soundEngine.playContradictionExposed();
      setScanResult({
        verdict: "FATAL CONTRADICTION DETECTED!",
        isFatal: true,
        headline: "ALIBI COLLAPSED UNDER SCRUTINY",
        explanation: `${selectedSuspect.name}'s testimony directly conflicts with Exhibit ${ev.id.toUpperCase()} (${ev.title}). ${currentCase.solution.alibiContradiction}`,
        badge: "CONTRADICTION CONFIRMED: PERJURY",
      });
    } else if (ev.relatedSuspects.includes(selectedSuspect.id)) {
      setScanResult({
        verdict: "CIRCUMSTANTIAL CORRELATION",
        isFatal: false,
        headline: "Indirect Association Only",
        explanation: `Exhibit ${ev.id.toUpperCase()} relates to ${selectedSuspect.name}'s presence or actions, but does not definitively prove a criminal falsehood in their statement.`,
        badge: "INCONCLUSIVE ANOMALY",
      });
    } else {
      setScanResult({
        verdict: "INSUFFICIENT CONFLICT",
        isFatal: false,
        headline: "No Direct Contradiction",
        explanation: `Exhibit ${ev.id.toUpperCase()} does not expose an irreconcilable conflict with ${selectedSuspect.name}'s recorded statement.`,
        badge: "STATEMENT CONSISTENT",
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#38342D] pb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="font-mono text-xs uppercase tracking-widest text-[#a52a2a] font-bold">
              CONTRADICTION MATRIX SCANNER
            </span>
            <span className="h-1.5 w-1.5 rounded-full bg-[#a52a2a]" />
            <span className="font-mono text-xs text-[#9B958B]">ANOMALY EVALUATOR</span>
          </div>
          <h2 className="font-serif text-2xl lg:text-3xl text-[#EAE3D5]">
            Cross-Reference Matrix
          </h2>
          <p className="font-sans text-sm text-[#9B958B] mt-1">
            Compare suspect testimony against physical exhibits. Select a clue to test whether it shatters the suspect&apos;s story.
          </p>
        </div>

        <div className="flex items-center gap-2 rounded bg-[#201E1A] p-2 border border-[#38342D] font-mono text-xs">
          <span className="text-[#dfc38c]">STATUS:</span>
          <span
            className={`font-bold ${
              scanResult?.isFatal ? "text-[#ffb3ad] animate-pulse" : "text-[#dfc38c]"
            }`}
          >
            {scanResult ? scanResult.verdict : "READY FOR COMPARISON"}
          </span>
        </div>
      </div>

      {/* 3-Column Scanner Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Column 1: Suspect Selection & Testimony */}
        <div className="bg-[#191816] border border-[#38342D] p-5 flex flex-col justify-between shadow-lg">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="font-mono text-xs uppercase text-[#dfc38c] font-bold">
                SUBJECT ALIBI
              </span>
              <select
                value={selectedSuspectId}
                onChange={(e) => {
                  setSelectedSuspectId(e.target.value);
                  setScanResult(null);
                  setSelectedEvidenceId(null);
                }}
                className="bg-[#201E1A] border border-[#38342D] text-xs font-mono text-[#EAE3D5] px-2.5 py-1 focus:border-[#dfc38c] focus:outline-none"
              >
                {currentCase.suspects.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-3 mb-3">
              <img
                src={selectedSuspect.portrait}
                alt={selectedSuspect.name}
                className="w-12 h-12 object-cover border border-[#38342D]"
              />
              <div>
                <h4 className="font-serif text-base font-bold text-[#EAE3D5]">
                  {selectedSuspect.name}
                </h4>
                <span className="font-mono text-[10px] text-[#9B958B] uppercase">
                  {selectedSuspect.occupation}
                </span>
              </div>
            </div>

            <blockquote className="font-sans text-xs italic text-[#cdc5bb] bg-[#10100F] p-3 border-l-2 border-[#a52a2a] leading-relaxed">
              &ldquo;{selectedSuspect.alibi}&rdquo;
            </blockquote>
          </div>

          <div className="mt-4 pt-3 border-t border-[#38342D] flex items-center justify-between font-mono text-[10px] text-[#9B958B]">
            <span>RELATION: {selectedSuspect.relationshipToVictim}</span>
            <span className="text-[#a52a2a] font-bold">CROSS-EXAMINATION</span>
          </div>
        </div>

        {/* Column 2: Evidence Items to Cross-Reference */}
        <div className="bg-[#191816] border border-[#38342D] p-5 space-y-3 shadow-lg">
          <span className="font-mono text-xs uppercase tracking-wider text-[#dfc38c] font-bold block">
            TAP EXHIBIT TO CROSS-REFERENCE
          </span>

          <div className="space-y-2 max-h-[380px] overflow-y-auto pr-1">
            {currentCase.evidence.map((ev) => {
              const isDiscovered = discoveredEvidenceIds.includes(ev.id);
              const isSelected = selectedEvidenceId === ev.id;

              return (
                <button
                  key={ev.id}
                  disabled={!isDiscovered}
                  onClick={() => handleTestEvidence(ev)}
                  className={`w-full p-2.5 border text-left flex items-center justify-between transition-all ${
                    !isDiscovered
                      ? "bg-[#10100F] border-[#38342D]/40 text-[#9B958B] opacity-50 cursor-not-allowed"
                      : isSelected
                      ? "bg-[#2a2a29] border-[#dfc38c] shadow"
                      : "bg-[#201E1A] border-[#38342D] hover:border-[#b39a66] hover:bg-[#252320]"
                  }`}
                >
                  <div className="flex items-center gap-2.5 truncate">
                    <span className="font-mono text-[10px] text-[#dfc38c] bg-[#10100F] px-1.5 py-0.5 border border-[#38342D] shrink-0 font-bold">
                      {ev.id.toUpperCase()}
                    </span>
                    <div className="truncate">
                      <span className="font-serif text-xs font-semibold text-[#EAE3D5] block truncate">
                        {ev.title}
                      </span>
                      <span className="font-mono text-[9px] text-[#9B958B] block truncate">
                        {isDiscovered ? ev.discoveryLocation : "UNRECOVERED EXHIBIT"}
                      </span>
                    </div>
                  </div>

                  <AlertOctagon
                    className={`w-4 h-4 shrink-0 transition-opacity ${
                      isSelected ? "text-[#a52a2a] opacity-100" : "text-[#9B958B] opacity-40"
                    }`}
                  />
                </button>
              );
            })}
          </div>
        </div>

        {/* Column 3: Forensic Evaluation Panel */}
        <div
          className={`border p-5 flex flex-col justify-between shadow-lg transition-colors ${
            scanResult?.isFatal
              ? "bg-[#a52a2a]/15 border-[#a52a2a]"
              : "bg-[#191816] border-[#38342D]"
          }`}
        >
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-4 h-4 text-[#dfc38c]" />
              <span className="font-mono text-xs uppercase tracking-widest text-[#dfc38c] font-bold">
                FORENSIC ANOMALY REPORT
              </span>
            </div>

            <h4
              className={`font-serif text-lg font-bold ${
                scanResult?.isFatal ? "text-[#ffb3ad]" : "text-[#EAE3D5]"
              }`}
            >
              {scanResult ? scanResult.headline : "Awaiting Forensic Input"}
            </h4>

            <p className="font-sans text-xs text-[#cdc5bb] mt-2 leading-relaxed">
              {scanResult
                ? scanResult.explanation
                : "Select a suspect on the left, then click an evidence token from the center column to test if physical proof shatters their claimed alibi."}
            </p>
          </div>

          <div
            className={`mt-4 p-2.5 text-center font-mono text-xs uppercase font-bold tracking-wider border ${
              scanResult?.isFatal
                ? "bg-[#a52a2a] border-[#ffb3ad] text-white"
                : "bg-[#201E1A] border-[#38342D] text-[#9B958B]"
            }`}
          >
            {scanResult ? scanResult.badge : "SCANNER STANDBY"}
          </div>
        </div>
      </div>
    </div>
  );
}
