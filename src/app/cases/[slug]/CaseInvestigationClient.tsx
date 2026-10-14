"use client";

import React, { useState, useEffect } from "react";
import { notFound } from "next/navigation";
import { getCaseBySlug } from "@/data/cases";
import { Difficulty, PlayerCaseProgress, AccusationResult, BoardConnection } from "@/types/game";
import {
  loadCaseProgress,
  saveCaseProgress,
  resetCaseProgress,
  getDefaultCaseProgress,
} from "@/lib/storage";
import { Header } from "@/components/Header";
import { Sidebar, TabType } from "@/components/Sidebar";
import { Footer } from "@/components/Footer";
import { CaseOverview } from "@/components/CaseOverview";
import { CrimeSceneViewer } from "@/components/CrimeSceneViewer";
import { EvidenceLocker } from "@/components/EvidenceLocker";
import { InterrogationRoom } from "@/components/InterrogationRoom";
import { TimelineView } from "@/components/TimelineView";
import { ConnectionBoard } from "@/components/ConnectionBoard";
import { ContradictionScanner } from "@/components/ContradictionScanner";
import { AccusationModal } from "@/components/AccusationModal";
import { HintPanel } from "@/components/HintPanel";
import { Menu, X } from "lucide-react";

interface CaseInvestigationClientProps {
  slug: string;
}

export function CaseInvestigationClient({ slug }: CaseInvestigationClientProps) {
  const currentCase = getCaseBySlug(slug);

  if (!currentCase) {
    notFound();
  }

  // Active Tab
  const [activeTab, setActiveTab] = useState<TabType>("overview");
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // Player Progress State (Hydration safe)
  const [progress, setProgress] = useState<PlayerCaseProgress>(() =>
    getDefaultCaseProgress(currentCase.id, currentCase.defaultDifficulty)
  );

  useEffect(() => {
    setProgress(loadCaseProgress(currentCase.id, currentCase.defaultDifficulty));
  }, [currentCase.id, currentCase.defaultDifficulty]);

  // Detail Modal target in evidence locker
  const [targetEvidenceDetailId, setTargetEvidenceDetailId] = useState<string | undefined>(
    undefined
  );

  // Elapsed Timer
  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = { ...prev, secondsElapsed: prev.secondsElapsed + 1 };
        saveCaseProgress(next);
        return next;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Update helper
  const updateProgress = (updates: Partial<PlayerCaseProgress>) => {
    setProgress((prev) => {
      const next = { ...prev, ...updates };
      saveCaseProgress(next);
      return next;
    });
  };

  // Handlers
  const handleDiscoverEvidence = (evidenceId: string) => {
    if (!progress.discoveredEvidenceIds.includes(evidenceId)) {
      updateProgress({
        discoveredEvidenceIds: [...progress.discoveredEvidenceIds, evidenceId],
      });
    }
  };

  const handleInspectEvidence = (evidenceId: string) => {
    if (!progress.inspectedEvidenceIds.includes(evidenceId)) {
      updateProgress({
        inspectedEvidenceIds: [...progress.inspectedEvidenceIds, evidenceId],
      });
    }
  };

  const handleToggleStarEvidence = (evidenceId: string) => {
    const isStarred = progress.starredEvidenceIds.includes(evidenceId);
    updateProgress({
      starredEvidenceIds: isStarred
        ? progress.starredEvidenceIds.filter((id) => id !== evidenceId)
        : [...progress.starredEvidenceIds, evidenceId],
    });
  };

  const handleSaveNote = (id: string, note: string) => {
    updateProgress({
      playerNotes: { ...progress.playerNotes, [id]: note },
    });
  };

  const handleAskQuestion = (questionId: string) => {
    if (!progress.askedQuestionIds.includes(questionId)) {
      updateProgress({
        askedQuestionIds: [...progress.askedQuestionIds, questionId],
      });
    }
  };

  const handleAddConnection = (conn: BoardConnection) => {
    updateProgress({
      connections: [...progress.connections, conn],
    });
  };

  const handleRemoveConnection = (connId: string) => {
    updateProgress({
      connections: progress.connections.filter((c) => c.id !== connId),
    });
  };

  const handleResetBoard = () => {
    updateProgress({ connections: [] });
  };

  const handleUseHint = () => {
    updateProgress({ hintsUsed: progress.hintsUsed + 1 });
  };

  const handleDifficultyChange = (d: Difficulty) => {
    updateProgress({ difficulty: d });
  };

  const handleAccusationSubmitted = (result: AccusationResult) => {
    updateProgress({
      accusationAttempts: progress.accusationAttempts + 1,
      isSolved: result.isCorrect,
      score: result.score,
      solvedAt: result.isCorrect ? new Date().toISOString() : undefined,
    });
  };

  const handleReplayCase = () => {
    const fresh = resetCaseProgress(currentCase.id, currentCase.defaultDifficulty);
    setProgress(fresh);
    setActiveTab("overview");
  };

  const handleOpenEvidenceDetail = (evidenceId: string) => {
    setTargetEvidenceDetailId(evidenceId);
    setActiveTab("evidence");
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#10100F] text-[#EAE3D5]">
      {/* Top Header */}
      <Header activeCaseId={currentCase.id} onCaseReset={handleReplayCase} />

      {/* Main Investigation Workspace */}
      <div className="flex-1 pt-16 flex relative">
        {/* Desktop Sidebar */}
        <div className="hidden lg:block shrink-0">
          <Sidebar
            activeTab={activeTab}
            onTabChange={setActiveTab}
            caseSlug={currentCase.slug}
            evidenceCount={{
              discovered: progress.discoveredEvidenceIds.length,
              total: currentCase.evidence.length,
            }}
            interrogationCount={{
              answered: progress.askedQuestionIds.length,
              total: currentCase.suspects.reduce(
                (acc, s) => acc + s.interviewStages.length,
                0
              ),
            }}
            isSolved={progress.isSolved}
          />
        </div>

        {/* Mobile Sub-Header & Drawer Trigger */}
        <div className="lg:hidden fixed top-16 left-0 right-0 z-30 bg-[#191816] border-b border-[#38342D] px-4 py-2 flex items-center justify-between">
          <button
            onClick={() => setIsMobileSidebarOpen(true)}
            className="flex items-center gap-2 text-xs font-mono text-[#dfc38c] bg-[#201E1A] px-3 py-1.5 border border-[#38342D]"
          >
            <Menu className="w-4 h-4" />
            <span>TACTICAL DESK ({activeTab.toUpperCase()})</span>
          </button>

          <span className="font-mono text-xs text-[#9B958B]">
            {progress.discoveredEvidenceIds.length}/{currentCase.evidence.length} CLUES
          </span>
        </div>

        {/* Mobile Sidebar Overlay Drawer */}
        {isMobileSidebarOpen && (
          <div className="lg:hidden fixed inset-0 z-50 flex">
            <div
              className="fixed inset-0 bg-black/80"
              onClick={() => setIsMobileSidebarOpen(false)}
            />
            <div className="relative w-72 bg-[#0e0e0d] h-full shadow-2xl z-10 flex flex-col">
              <div className="p-4 border-b border-[#38342D] flex items-center justify-between">
                <span className="font-mono text-xs uppercase text-[#dfc38c] font-bold">
                  TACTICAL DESK
                </span>
                <button
                  onClick={() => setIsMobileSidebarOpen(false)}
                  className="p-1 text-[#9B958B]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <Sidebar
                activeTab={activeTab}
                onTabChange={(tab) => {
                  setActiveTab(tab);
                  setIsMobileSidebarOpen(false);
                }}
                caseSlug={currentCase.slug}
                evidenceCount={{
                  discovered: progress.discoveredEvidenceIds.length,
                  total: currentCase.evidence.length,
                }}
                interrogationCount={{
                  answered: progress.askedQuestionIds.length,
                  total: currentCase.suspects.reduce(
                    (acc, s) => acc + s.interviewStages.length,
                    0
                  ),
                }}
                isSolved={progress.isSolved}
              />
            </div>
          </div>
        )}

        {/* Central Investigation Desk Area */}
        <main className="flex-1 px-4 lg:px-8 py-6 max-w-7xl mx-auto w-full space-y-6 pt-14 lg:pt-6">
          {/* Top In-Case Progress Bar Strip */}
          <div className="flex flex-wrap items-center justify-between gap-3 bg-[#191816] p-3 border border-[#38342D] font-mono text-xs">
            <div className="flex items-center gap-3">
              <span className="text-[#dfc38c] font-bold">{currentCase.caseNumber}:</span>
              <span className="text-[#EAE3D5] font-serif font-bold text-sm hidden sm:inline">
                {currentCase.title}
              </span>
              <span className="bg-[#201E1A] px-2 py-0.5 border border-[#38342D] text-[10px] text-[#9B958B] uppercase">
                DIFFICULTY: {progress.difficulty}
              </span>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-[#9B958B] text-[11px]">
                ELAPSED:{" "}
                <span suppressHydrationWarning className="text-[#EAE3D5] font-bold">
                  {Math.floor(progress.secondsElapsed / 60)}m{" "}
                  {progress.secondsElapsed % 60 < 10 ? "0" : ""}
                  {progress.secondsElapsed % 60}s
                </span>
              </div>
              {progress.isSolved && (
                <span className="bg-[#2e7d32]/20 border border-[#2e7d32] text-[#81c784] px-2 py-0.5 text-[10px] font-bold uppercase">
                  ✓ WARRANT ISSUED
                </span>
              )}
            </div>
          </div>

          {/* Contextual Hint Panel Accordion */}
          <HintPanel
            currentCase={currentCase}
            difficulty={progress.difficulty}
            hintsUsed={progress.hintsUsed}
            onUseHint={handleUseHint}
          />

          {/* Active Tab View */}
          {activeTab === "overview" && (
            <CaseOverview
              currentCase={currentCase}
              difficulty={progress.difficulty}
              onDifficultyChange={handleDifficultyChange}
              onNavigateTab={setActiveTab}
              evidenceDiscoveredCount={progress.discoveredEvidenceIds.length}
            />
          )}

          {activeTab === "scene" && (
            <CrimeSceneViewer
              currentCase={currentCase}
              discoveredEvidenceIds={progress.discoveredEvidenceIds}
              onDiscoverEvidence={handleDiscoverEvidence}
              onOpenEvidenceDetail={handleOpenEvidenceDetail}
            />
          )}

          {activeTab === "evidence" && (
            <EvidenceLocker
              currentCase={currentCase}
              discoveredEvidenceIds={progress.discoveredEvidenceIds}
              starredEvidenceIds={progress.starredEvidenceIds}
              inspectedEvidenceIds={progress.inspectedEvidenceIds}
              playerNotes={progress.playerNotes}
              onToggleStar={handleToggleStarEvidence}
              onInspectEvidence={handleInspectEvidence}
              onSaveNote={handleSaveNote}
              activeEvidenceId={targetEvidenceDetailId}
              onCloseDetailModal={() => setTargetEvidenceDetailId(undefined)}
            />
          )}

          {activeTab === "interrogation" && (
            <InterrogationRoom
              currentCase={currentCase}
              discoveredEvidenceIds={progress.discoveredEvidenceIds}
              askedQuestionIds={progress.askedQuestionIds}
              onAskQuestion={handleAskQuestion}
              onOpenEvidenceDetail={handleOpenEvidenceDetail}
            />
          )}

          {activeTab === "board" && (
            <ConnectionBoard
              currentCase={currentCase}
              discoveredEvidenceIds={progress.discoveredEvidenceIds}
              connections={progress.connections}
              onAddConnection={handleAddConnection}
              onRemoveConnection={handleRemoveConnection}
              onResetBoard={handleResetBoard}
              onOpenEvidenceDetail={handleOpenEvidenceDetail}
            />
          )}

          {activeTab === "timeline" && (
            <TimelineView
              currentCase={currentCase}
              discoveredEvidenceIds={progress.discoveredEvidenceIds}
              onOpenEvidenceDetail={handleOpenEvidenceDetail}
            />
          )}

          {activeTab === "scanner" && (
            <ContradictionScanner
              currentCase={currentCase}
              discoveredEvidenceIds={progress.discoveredEvidenceIds}
            />
          )}

          {activeTab === "accusation" && (
            <AccusationModal
              currentCase={currentCase}
              difficulty={progress.difficulty}
              discoveredEvidenceIds={progress.discoveredEvidenceIds}
              hintsUsed={progress.hintsUsed}
              secondsElapsed={progress.secondsElapsed}
              accusationAttempts={progress.accusationAttempts}
              onAccusationSubmitted={handleAccusationSubmitted}
              onReplayCase={handleReplayCase}
            />
          )}
        </main>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
