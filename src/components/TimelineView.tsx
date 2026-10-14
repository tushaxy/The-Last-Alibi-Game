"use client";

import React, { useState } from "react";
import { Case, TimelineEvent, Reliability } from "@/types/game";
import { Clock, ShieldCheck, HelpCircle, AlertOctagon, Filter, CheckCircle2 } from "lucide-react";

interface TimelineViewProps {
  currentCase: Case;
  discoveredEvidenceIds: string[];
  onOpenEvidenceDetail: (evidenceId: string) => void;
}

export function TimelineView({
  currentCase,
  discoveredEvidenceIds,
  onOpenEvidenceDetail,
}: TimelineViewProps) {
  const [selectedSuspectFilter, setSelectedSuspectFilter] = useState<string>("all");
  const [selectedReliability, setSelectedReliability] = useState<string>("all");

  const getReliabilityBadge = (rel: Reliability) => {
    switch (rel) {
      case "verified":
        return {
          label: "VERIFIED FACT",
          classes: "bg-[#2e7d32]/20 border-[#2e7d32] text-[#81c784]",
          icon: <ShieldCheck className="w-3.5 h-3.5" />,
        };
      case "reported":
        return {
          label: "REPORTED WITNESS",
          classes: "bg-[#dfc38c]/20 border-[#dfc38c] text-[#dfc38c]",
          icon: <Clock className="w-3.5 h-3.5" />,
        };
      case "disputed":
        return {
          label: "DISPUTED ALIBI",
          classes: "bg-[#a52a2a]/20 border-[#a52a2a] text-[#ffb3ad]",
          icon: <AlertOctagon className="w-3.5 h-3.5" />,
        };
      default:
        return {
          label: "UNKNOWN",
          classes: "bg-[#201E1A] border-[#38342D] text-[#9B958B]",
          icon: <HelpCircle className="w-3.5 h-3.5" />,
        };
    }
  };

  const filteredEvents = currentCase.timeline
    .filter((ev) => {
      const matchSuspect =
        selectedSuspectFilter === "all" || ev.relatedSuspects.includes(selectedSuspectFilter);
      const matchRel = selectedReliability === "all" || ev.reliability === selectedReliability;
      return matchSuspect && matchRel;
    })
    .sort((a, b) => a.sortOrder - b.sortOrder);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#38342D] pb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="font-mono text-xs uppercase tracking-widest text-[#dfc38c] font-bold">
              CHRONOLOGICAL RECONSTRUCTION
            </span>
            <span className="h-1.5 w-1.5 rounded-full bg-[#dfc38c]" />
            <span className="font-mono text-xs text-[#9B958B]">TIMELINE OF EVENTS</span>
          </div>
          <h2 className="font-serif text-2xl lg:text-3xl text-[#EAE3D5]">
            Incident Chronology
          </h2>
          <p className="font-sans text-sm text-[#9B958B] mt-1">
            Reconstruct suspect trajectories. Compare reported testimonies against verified forensic stamps to isolate the fatal time window.
          </p>
        </div>

        {/* Filter Controls */}
        <div className="flex flex-wrap gap-2">
          {/* Suspect Filter */}
          <select
            value={selectedSuspectFilter}
            onChange={(e) => setSelectedSuspectFilter(e.target.value)}
            className="bg-[#201E1A] border border-[#38342D] text-xs font-mono text-[#EAE3D5] px-3 py-1.5 focus:border-[#dfc38c] focus:outline-none"
          >
            <option value="all">ALL PERSONS</option>
            {currentCase.suspects.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>

          {/* Reliability Filter */}
          <select
            value={selectedReliability}
            onChange={(e) => setSelectedReliability(e.target.value)}
            className="bg-[#201E1A] border border-[#38342D] text-xs font-mono text-[#EAE3D5] px-3 py-1.5 focus:border-[#dfc38c] focus:outline-none"
          >
            <option value="all">ALL RELIABILITY STATUSES</option>
            <option value="verified">VERIFIED ONLY</option>
            <option value="reported">REPORTED ONLY</option>
            <option value="disputed">DISPUTED ONLY</option>
          </select>
        </div>
      </div>

      {/* Timeline List */}
      <div className="relative pl-6 sm:pl-8 border-l-2 border-[#38342D] space-y-6">
        {filteredEvents.map((event) => {
          const badge = getReliabilityBadge(event.reliability);

          return (
            <div key={event.id} className="relative group">
              {/* Timeline Node Icon */}
              <div
                className={`absolute -left-[31px] sm:-left-[39px] top-1.5 w-4 h-4 border-2 transition-transform group-hover:scale-125 ${
                  event.reliability === "verified"
                    ? "bg-[#2e7d32] border-[#81c784]"
                    : event.reliability === "disputed"
                    ? "bg-[#a52a2a] border-[#ffb3ad]"
                    : "bg-[#dfc38c] border-[#b39a66]"
                }`}
              />

              {/* Event Card */}
              <div className="bg-[#201E1A] border border-[#38342D] p-4 group-hover:border-[#dfc38c] transition-all shadow-md">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-sm font-bold text-[#dfc38c] bg-[#10100F] px-2.5 py-0.5 border border-[#38342D]">
                      {event.time}
                    </span>
                    <span className="font-serif text-base font-bold text-[#EAE3D5]">
                      {event.title}
                    </span>
                  </div>

                  <span
                    className={`flex items-center gap-1 font-mono text-[10px] px-2 py-0.5 border uppercase tracking-wider font-bold ${badge.classes}`}
                  >
                    {badge.icon}
                    <span>{badge.label}</span>
                  </span>
                </div>

                <p className="font-sans text-xs text-[#cdc5bb] leading-relaxed mb-3">
                  {event.description}
                </p>

                {/* Footer Metadata: Source, Suspects, Evidence Links */}
                <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-[#38342D]/60 text-[11px] font-mono">
                  <span className="text-[#9B958B]">
                    SOURCE: <span className="text-[#EAE3D5]">{event.source}</span>
                  </span>

                  <div className="flex flex-wrap items-center gap-1.5">
                    {event.relatedEvidence.map((evId) => {
                      const evObj = currentCase.evidence.find((e) => e.id === evId);
                      const isDiscovered = discoveredEvidenceIds.includes(evId);

                      return (
                        <button
                          key={evId}
                          onClick={() => onOpenEvidenceDetail(evId)}
                          className={`px-2 py-0.5 border transition-colors ${
                            isDiscovered
                              ? "bg-[#191816] border-[#dfc38c] text-[#dfc38c] hover:bg-[#353533]"
                              : "bg-[#10100F] border-[#38342D] text-[#9B958B]"
                          }`}
                        >
                          EXHIBIT {evId.toUpperCase()}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
