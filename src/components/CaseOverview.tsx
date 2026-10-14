"use client";

import React from "react";
import { Case, Difficulty } from "@/types/game";
import { TabType } from "./Sidebar";
import { Clock, ShieldAlert, Users, Search, Compass, AlertOctagon, HelpCircle } from "lucide-react";

interface CaseOverviewProps {
  currentCase: Case;
  difficulty?: Difficulty;
  onDifficultyChange?: (d: Difficulty) => void;
  onNavigateTab: (tab: TabType) => void;
  evidenceDiscoveredCount: number;
}

export function CaseOverview({
  currentCase,
  difficulty,
  onDifficultyChange,
  onNavigateTab,
  evidenceDiscoveredCount,
}: CaseOverviewProps) {
  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Dossier Banner / Hero Header */}
      <div className="relative border border-[#38342D] bg-[#191816] p-6 lg:p-8 shadow-2xl overflow-hidden">
        {/* Subtle background glow */}
        <div className="pointer-events-none absolute -right-20 -top-20 w-80 h-80 rounded-full bg-[#a52a2a]/10 blur-3xl" />

        <div className="relative z-10 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="bg-[#a52a2a] text-white font-mono text-xs font-bold px-2.5 py-1 tracking-widest uppercase">
                {currentCase.caseNumber}
              </span>
              <span className="font-mono text-xs text-[#dfc38c] uppercase tracking-wider">
                {currentCase.genre}
              </span>
            </div>

            {/* Estimated Playtime Badge */}
            <div className="flex items-center gap-2 bg-[#201E1A] px-3 py-1.5 border border-[#38342D] font-mono text-xs">
              <span className="h-1.5 w-1.5 rounded-full bg-[#dfc38c] animate-pulse" />
              <span className="text-[#dfc38c] uppercase tracking-wider font-bold">
                EST. DURATION: {currentCase.estimatedMinutes} MIN
              </span>
            </div>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#EAE3D5] tracking-tight">
            {currentCase.title}
          </h1>

          <p className="font-serif text-lg text-[#dfc38c] italic">
            &ldquo;{currentCase.tagline}&rdquo;
          </p>

          <p className="font-sans text-sm text-[#cdc5bb] max-w-3xl leading-relaxed">
            {currentCase.synopsis}
          </p>

          {/* Incident Meta Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-[#38342D] font-mono text-xs">
            <div>
              <span className="text-[#9B958B] block text-[10px] uppercase">INCIDENT DATE</span>
              <span className="text-[#EAE3D5] font-bold">{currentCase.incidentDate}</span>
            </div>
            <div>
              <span className="text-[#9B958B] block text-[10px] uppercase">ESTIMATED PLAYTIME</span>
              <span className="text-[#EAE3D5] font-bold">{currentCase.estimatedMinutes} MINUTES</span>
            </div>
            <div>
              <span className="text-[#9B958B] block text-[10px] uppercase">RECORDED SUSPECTS</span>
              <span className="text-[#ffb3ad] font-bold">{currentCase.suspects.length} PERSONS</span>
            </div>
            <div>
              <span className="text-[#9B958B] block text-[10px] uppercase">TOTAL EXHIBITS</span>
              <span className="text-[#dfc38c] font-bold">
                {evidenceDiscoveredCount} / {currentCase.evidence.length} DISCOVERED
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Victim Dossier Card */}
      <div className="bg-[#191816] border border-[#38342D] p-6 shadow-xl">
        <div className="flex items-center gap-2 mb-4">
          <span className="font-mono text-xs uppercase tracking-widest text-[#a52a2a] font-bold">
            DECEASED PROFILE
          </span>
          <span className="h-1.5 w-1.5 rounded-full bg-[#a52a2a]" />
          <span className="font-mono text-xs text-[#9B958B]">CORONER AUTOPSY REPORT</span>
        </div>

        <div className="flex flex-col sm:flex-row gap-6 items-start">
          <img
            src={currentCase.victim.portrait}
            alt={currentCase.victim.name}
            className="w-24 h-24 sm:w-32 sm:h-32 object-cover border-2 border-[#38342D] shrink-0"
          />
          <div className="space-y-2 flex-1">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h3 className="font-serif text-2xl font-bold text-[#EAE3D5]">
                {currentCase.victim.name} ({currentCase.victim.age})
              </h3>
              <span className="font-mono text-xs bg-[#201E1A] text-[#dfc38c] px-2.5 py-1 border border-[#38342D]">
                {currentCase.victim.occupation}
              </span>
            </div>

            <div className="p-3 bg-[#10100F] border border-[#38342D] text-xs font-mono text-[#ffb3ad]">
              <span className="font-bold text-[#a52a2a] mr-2">CAUSE OF DEATH:</span>
              {currentCase.victim.causeOfDeath}
            </div>

            <p className="font-sans text-xs text-[#cdc5bb] leading-relaxed pt-1">
              {currentCase.victim.summary}
            </p>
          </div>
        </div>
      </div>

      {/* Suspect Roster Strip */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="font-mono text-xs uppercase tracking-wider text-[#dfc38c] font-bold flex items-center gap-2">
            <Users className="w-4 h-4" />
            <span>PERSONS OF INTEREST ({currentCase.suspects.length})</span>
          </div>
          <button
            onClick={() => onNavigateTab("interrogation")}
            className="font-mono text-xs text-[#dfc38c] hover:underline"
          >
            Open Interrogation Room →
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {currentCase.suspects.map((sus) => (
            <div
              key={sus.id}
              onClick={() => onNavigateTab("interrogation")}
              className="bg-[#201E1A] border border-[#38342D] hover:border-[#dfc38c] p-4 cursor-pointer transition-all group"
            >
              <img
                src={sus.portrait}
                alt={sus.name}
                className="w-full h-40 object-cover border border-[#38342D] mb-3 group-hover:scale-102 transition-transform"
              />
              <h4 className="font-serif text-base font-bold text-[#EAE3D5] group-hover:text-[#dfc38c] transition-colors">
                {sus.name}
              </h4>
              <div className="font-mono text-[10px] text-[#dfc38c] uppercase mt-0.5 mb-1.5">
                {sus.occupation}
              </div>
              <p className="font-sans text-xs text-[#9B958B] line-clamp-2 leading-snug">
                {sus.relationshipToVictim}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Investigation Quick Action Dispatch */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-[#38342D]">
        <button
          onClick={() => onNavigateTab("scene")}
          className="p-4 bg-[#201E1A] border border-[#38342D] hover:border-[#dfc38c] text-left transition-all group"
        >
          <div className="flex items-center gap-2 text-[#dfc38c] font-mono text-xs font-bold uppercase mb-1">
            <Compass className="w-4 h-4" />
            <span>INSPECT CRIME SCENE</span>
          </div>
          <p className="font-sans text-xs text-[#9B958B]">
            Examine high-resolution scene photography for interactive evidence hotspots.
          </p>
        </button>

        <button
          onClick={() => onNavigateTab("interrogation")}
          className="p-4 bg-[#201E1A] border border-[#38342D] hover:border-[#dfc38c] text-left transition-all group"
        >
          <div className="flex items-center gap-2 text-[#dfc38c] font-mono text-xs font-bold uppercase mb-1">
            <Users className="w-4 h-4" />
            <span>QUESTION SUSPECTS</span>
          </div>
          <p className="font-sans text-xs text-[#9B958B]">
            Cross-examine suspects and present recovered clues to shatter false alibis.
          </p>
        </button>

        <button
          onClick={() => onNavigateTab("accusation")}
          className="p-4 bg-[#201E1A] border border-[#a52a2a] hover:bg-[#a52a2a]/20 text-left transition-all group"
        >
          <div className="flex items-center gap-2 text-[#ffb3ad] font-mono text-xs font-bold uppercase mb-1">
            <ShieldAlert className="w-4 h-4" />
            <span>SUBMIT ACCUSATION</span>
          </div>
          <p className="font-sans text-xs text-[#9B958B]">
            Formulate your criminal warrant with motive, method, and contradiction.
          </p>
        </button>
      </div>
    </div>
  );
}
