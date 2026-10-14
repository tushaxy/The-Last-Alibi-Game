"use client";

import React, { useState } from "react";
import { Case, Suspect, InterviewStage } from "@/types/game";
import { soundEngine } from "@/lib/audio";
import {
  MessageSquare,
  Lock,
  CheckCircle,
  AlertTriangle,
  User,
  ShieldAlert,
  HelpCircle,
  ChevronRight,
  Flame,
} from "lucide-react";

interface InterrogationRoomProps {
  currentCase: Case;
  discoveredEvidenceIds: string[];
  askedQuestionIds: string[];
  onAskQuestion: (questionId: string) => void;
  onOpenEvidenceDetail: (evidenceId: string) => void;
}

export function InterrogationRoom({
  currentCase,
  discoveredEvidenceIds,
  askedQuestionIds,
  onAskQuestion,
  onOpenEvidenceDetail,
}: InterrogationRoomProps) {
  const [selectedSuspectId, setSelectedSuspectId] = useState<string>(
    currentCase.suspects[0]?.id || ""
  );
  const [activeStage, setActiveStage] = useState<InterviewStage | null>(null);

  const selectedSuspect =
    currentCase.suspects.find((s) => s.id === selectedSuspectId) || currentCase.suspects[0];

  const handleSelectQuestion = (stage: InterviewStage) => {
    // If requires evidence and player has not found it, return
    if (stage.requiredEvidenceId && !discoveredEvidenceIds.includes(stage.requiredEvidenceId)) {
      return;
    }

    soundEngine.playClick();
    if (stage.exposesContradiction) {
      soundEngine.playContradictionExposed();
    }
    setActiveStage(stage);
    onAskQuestion(stage.id);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#38342D] pb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="font-mono text-xs uppercase tracking-widest text-[#a52a2a] font-bold">
              FORMAL INTERROGATION ROOM
            </span>
            <span className="h-1.5 w-1.5 rounded-full bg-[#a52a2a]" />
            <span className="font-mono text-xs text-[#9B958B]">CROSS-EXAMINATION CHAMBER</span>
          </div>
          <h2 className="font-serif text-2xl lg:text-3xl text-[#EAE3D5]">
            Suspect Inquisitions
          </h2>
          <p className="font-sans text-sm text-[#9B958B] mt-1">
            Question persons of interest. Present recovered exhibits to break fabricated alibis and extract confessions.
          </p>
        </div>

        <div className="font-mono text-xs text-[#dfc38c] bg-[#201E1A] px-3 py-1.5 border border-[#38342D]">
          RECORDED SUBJECTS: {currentCase.suspects.length} PERSONS
        </div>
      </div>

      {/* Main Layout: Suspect Roster (Left) & Interrogation Desk (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Suspect Cards (4 cols) */}
        <div className="lg:col-span-4 space-y-3">
          <div className="font-mono text-xs uppercase tracking-wider text-[#9B958B] mb-2">
            SELECT PERSON OF INTEREST
          </div>
          <div className="space-y-2">
            {currentCase.suspects.map((sus) => {
              const isSelected = sus.id === selectedSuspectId;
              const answeredCount = sus.interviewStages.filter((st) =>
                askedQuestionIds.includes(st.id)
              ).length;

              return (
                <div
                  key={sus.id}
                  onClick={() => {
                    setSelectedSuspectId(sus.id);
                    setActiveStage(null);
                    soundEngine.playPaperTurn();
                  }}
                  className={`p-3 border cursor-pointer transition-all flex items-center gap-3 ${
                    isSelected
                      ? "bg-[#2a2a29] border-[#dfc38c] shadow-lg"
                      : "bg-[#201E1A] border-[#38342D] hover:border-[#b39a66] hover:bg-[#252320]"
                  }`}
                >
                  <img
                    src={sus.portrait}
                    alt={sus.name}
                    className="w-12 h-12 object-cover border border-[#38342D] shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4
                        className={`font-serif text-sm font-bold truncate ${
                          isSelected ? "text-[#dfc38c]" : "text-[#EAE3D5]"
                        }`}
                      >
                        {sus.name}
                      </h4>
                      <span className="font-mono text-[10px] text-[#9B958B]">
                        {answeredCount}/{sus.interviewStages.length}
                      </span>
                    </div>
                    <div className="font-mono text-[11px] text-[#9B958B] truncate">
                      {sus.occupation}
                    </div>
                  </div>
                  <ChevronRight
                    className={`w-4 h-4 shrink-0 transition-transform ${
                      isSelected ? "text-[#dfc38c] translate-x-1" : "text-[#38342D]"
                    }`}
                  />
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Active Suspect Dossier & Question Tree (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          {selectedSuspect && (
            <div className="bg-[#191816] border border-[#38342D] p-5 shadow-xl space-y-5">
              {/* Profile Header */}
              <div className="flex flex-col sm:flex-row gap-4 items-start pb-4 border-b border-[#38342D]">
                <img
                  src={selectedSuspect.portrait}
                  alt={selectedSuspect.name}
                  className="w-20 h-20 object-cover border border-[#38342D] shadow"
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-serif text-2xl font-bold text-[#EAE3D5]">
                      {selectedSuspect.name}
                    </h3>
                    <span className="font-mono text-[10px] bg-[#201E1A] text-[#dfc38c] px-2.5 py-1 border border-[#38342D] uppercase">
                      {selectedSuspect.occupation}
                    </span>
                  </div>
                  <div className="font-mono text-xs text-[#9B958B] mt-0.5">
                    RELATION: {selectedSuspect.relationshipToVictim}
                  </div>
                  <div className="font-sans text-xs text-[#cdc5bb] mt-2 bg-[#201E1A] p-2.5 border border-[#38342D]">
                    <span className="font-mono text-[#dfc38c] font-bold uppercase mr-1">
                      INITIAL STATEMENT:
                    </span>
                    &ldquo;{selectedSuspect.alibi}&rdquo;
                  </div>
                </div>
              </div>

              {/* Question Selection Tree */}
              <div className="space-y-3">
                <div className="font-mono text-xs uppercase tracking-wider text-[#9B958B] flex items-center justify-between">
                  <span>SELECT INTERROGATION PROMPT</span>
                  <span className="text-[10px]">TAP TO QUESTION SUSPECT</span>
                </div>

                <div className="space-y-2">
                  {selectedSuspect.interviewStages.map((stage) => {
                    const isAsked = askedQuestionIds.includes(stage.id);
                    const requiresClue = Boolean(stage.requiredEvidenceId);
                    const hasRequiredClue =
                      !requiresClue ||
                      (stage.requiredEvidenceId &&
                        discoveredEvidenceIds.includes(stage.requiredEvidenceId));
                    const isLocked = !hasRequiredClue;
                    const isSelected = activeStage?.id === stage.id;

                    const requiredClueObj = stage.requiredEvidenceId
                      ? currentCase.evidence.find((e) => e.id === stage.requiredEvidenceId)
                      : null;

                    return (
                      <div
                        key={stage.id}
                        onClick={() => !isLocked && handleSelectQuestion(stage)}
                        className={`p-3.5 border transition-all text-left ${
                          isLocked
                            ? "bg-[#10100F] border-[#38342D]/60 opacity-60 cursor-not-allowed"
                            : isSelected
                            ? "bg-[#2a2a29] border-[#dfc38c] shadow-md cursor-pointer"
                            : isAsked
                            ? "bg-[#201E1A] border-[#38342D] hover:border-[#dfc38c] cursor-pointer"
                            : "bg-[#1f1d19] border-[#a52a2a]/60 hover:border-[#ffb3ad] cursor-pointer"
                        }`}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex items-start gap-2.5 flex-1">
                            {isLocked ? (
                              <Lock className="w-4 h-4 text-[#9B958B] shrink-0 mt-0.5" />
                            ) : stage.exposesContradiction ? (
                              <Flame className="w-4 h-4 text-[#ffb3ad] shrink-0 mt-0.5" />
                            ) : (
                              <MessageSquare className="w-4 h-4 text-[#dfc38c] shrink-0 mt-0.5" />
                            )}
                            <div>
                              <div className="font-serif text-sm font-semibold text-[#EAE3D5] leading-snug">
                                {stage.question}
                              </div>

                              {isLocked && requiredClueObj && (
                                <div className="font-mono text-[11px] text-[#ffb3ad] mt-1.5 flex items-center gap-1.5">
                                  <AlertTriangle className="w-3.5 h-3.5" />
                                  <span>
                                    LOCKED: Requires Recovering Exhibit &ldquo;{requiredClueObj.title}
                                    &rdquo; ({requiredClueObj.id})
                                  </span>
                                </div>
                              )}
                            </div>
                          </div>

                          <span className="font-mono text-[10px] uppercase shrink-0">
                            {isLocked
                              ? "EVIDENCE LOCKED"
                              : isAsked
                              ? "RECORDED"
                              : "NEW PROMPT"}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Tape Reel Response Dialogue Display */}
              {activeStage && (
                <div className="mt-6 border border-[#dfc38c] bg-[#10100F] p-4 space-y-3 animate-in fade-in duration-200">
                  <div className="flex items-center justify-between border-b border-[#38342D] pb-2">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#dfc38c] animate-pulse" />
                      <span className="font-mono text-xs uppercase tracking-wider text-[#dfc38c] font-bold">
                        RECORDED TESTIMONY // {selectedSuspect.name.toUpperCase()}
                      </span>
                    </div>
                    {activeStage.exposesContradiction && (
                      <span className="bg-[#a52a2a] text-[#ffdad7] font-mono text-[10px] font-bold px-2 py-0.5 border border-[#ffb3ad] uppercase tracking-wider">
                        FATAL CONTRADICTION EXPOSED
                      </span>
                    )}
                  </div>

                  <blockquote className="font-sans text-sm text-[#EAE3D5] italic leading-relaxed border-l-2 border-[#a52a2a] pl-3 py-1">
                    &ldquo;{activeStage.response}&rdquo;
                  </blockquote>

                  {activeStage.revealsNote && (
                    <div className="bg-[#201E1A] border border-[#38342D] p-2.5 text-xs font-mono text-[#dfc38c]">
                      <span className="font-bold uppercase mr-1">DETECTIVE LOG UPDATED:</span>
                      {activeStage.revealsNote}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
