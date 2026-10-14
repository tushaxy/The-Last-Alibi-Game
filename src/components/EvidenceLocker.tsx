"use client";

import React, { useState } from "react";
import { Case, EvidenceItem, EvidenceCategory } from "@/types/game";
import { soundEngine } from "@/lib/audio";
import {
  Search,
  Star,
  FileText,
  Microscope,
  Cpu,
  Camera,
  Volume2,
  Folder,
  X,
  CheckCircle,
  ExternalLink,
  MessageSquare,
} from "lucide-react";

interface EvidenceLockerProps {
  currentCase: Case;
  discoveredEvidenceIds: string[];
  starredEvidenceIds: string[];
  inspectedEvidenceIds: string[];
  playerNotes: Record<string, string>;
  onToggleStar: (evidenceId: string) => void;
  onInspectEvidence: (evidenceId: string) => void;
  onSaveNote: (id: string, note: string) => void;
  activeEvidenceId?: string;
  onCloseDetailModal?: () => void;
}

export function EvidenceLocker({
  currentCase,
  discoveredEvidenceIds,
  starredEvidenceIds,
  inspectedEvidenceIds,
  playerNotes,
  onToggleStar,
  onInspectEvidence,
  onSaveNote,
  activeEvidenceId,
  onCloseDetailModal,
}: EvidenceLockerProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [modalEvidenceId, setModalEvidenceId] = useState<string | null>(activeEvidenceId || null);
  const [currentNote, setCurrentNote] = useState("");

  const categories: { id: string; label: string }[] = [
    { id: "all", label: "ALL EXHIBITS" },
    { id: "physical", label: "PHYSICAL" },
    { id: "document", label: "DOCUMENTS" },
    { id: "forensic", label: "FORENSIC" },
    { id: "digital", label: "DIGITAL" },
    { id: "photograph", label: "PHOTOGRAPHS" },
    { id: "audio", label: "AUDIO REELS" },
  ];

  const handleOpenDetail = (ev: EvidenceItem) => {
    soundEngine.playPaperTurn();
    setModalEvidenceId(ev.id);
    onInspectEvidence(ev.id);
    setCurrentNote(playerNotes[ev.id] || "");
  };

  const handleCloseDetail = () => {
    setModalEvidenceId(null);
    if (onCloseDetailModal) onCloseDetailModal();
  };

  const handleNoteChange = (text: string) => {
    setCurrentNote(text);
    if (modalEvidenceId) {
      onSaveNote(modalEvidenceId, text);
    }
  };

  // Filter evidence
  const filteredEvidence = currentCase.evidence.filter((ev) => {
    const isDiscovered = discoveredEvidenceIds.includes(ev.id);
    const matchesCategory = selectedCategory === "all" || ev.category === selectedCategory;
    const matchesQuery =
      ev.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ev.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ev.id.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesQuery;
  });

  const activeEvidence = currentCase.evidence.find((e) => e.id === modalEvidenceId);

  return (
    <div className="space-y-6">
      {/* Header and Filter Controls */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 border-b border-[#38342D] pb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="font-mono text-xs uppercase tracking-widest text-[#dfc38c] font-bold">
              CENTRAL FORENSIC ARCHIVE
            </span>
            <span className="h-1.5 w-1.5 rounded-full bg-[#dfc38c]" />
            <span className="font-mono text-xs text-[#9B958B]">
              CASE {currentCase.caseNumber} EVIDENCE LOCKER
            </span>
          </div>
          <h2 className="font-serif text-2xl lg:text-3xl text-[#EAE3D5]">
            Evidence Catalog
          </h2>
          <p className="font-sans text-sm text-[#9B958B] mt-1">
            Examine discovered exhibits, cross-reference laboratory findings, and flag decisive contradictions.
          </p>
        </div>

        {/* Search input */}
        <div className="relative w-full lg:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9B958B]" />
          <input
            type="text"
            placeholder="Filter exhibits by ID or term..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-[#201E1A] border border-[#38342D] text-xs font-mono text-[#EAE3D5] placeholder-[#9B958B] focus:border-[#dfc38c] focus:outline-none"
          />
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap gap-1.5">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-3 py-1.5 font-mono text-xs uppercase tracking-wider transition-all border ${
              selectedCategory === cat.id
                ? "bg-[#a52a2a] border-[#ffb3ad] text-white font-bold"
                : "bg-[#201E1A] border-[#38342D] text-[#9B958B] hover:text-[#EAE3D5] hover:border-[#b39a66]"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Evidence Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredEvidence.map((ev) => {
          const isDiscovered = discoveredEvidenceIds.includes(ev.id);
          const isStarred = starredEvidenceIds.includes(ev.id);
          const isInspected = inspectedEvidenceIds.includes(ev.id);

          return (
            <div
              key={ev.id}
              className={`relative flex flex-col justify-between border transition-all duration-200 group ${
                isDiscovered
                  ? "bg-[#201E1A] border-[#38342D] hover:border-[#dfc38c] hover:bg-[#2a2a29]"
                  : "bg-[#191816]/70 border-[#38342D]/50 opacity-60"
              }`}
            >
              <div>
                {/* Image / Thumbnail Container */}
                <div className="relative h-44 w-full overflow-hidden bg-[#0e0e0d] border-b border-[#38342D]">
                  {isDiscovered ? (
                    <img
                      src={ev.image}
                      alt={ev.title}
                      className="w-full h-full object-cover filter contrast-110 brightness-95 group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-[#9B958B] gap-2 p-4 text-center">
                      <Folder className="w-8 h-8 text-[#38342D]" />
                      <span className="font-mono text-[10px] uppercase tracking-widest text-[#9B958B]">
                        UNRECOVERED FORENSIC LEAD
                      </span>
                      <span className="font-sans text-xs text-[#cdc5bb]">
                        Explore crime scene or interrogations to unlock.
                      </span>
                    </div>
                  )}

                  {/* Exhibit Badges */}
                  <div className="absolute top-2 left-2 flex items-center gap-1.5">
                    <span className="font-mono text-[10px] bg-[#10100F]/90 text-[#dfc38c] px-2 py-0.5 border border-[#38342D] font-bold">
                      {ev.id.toUpperCase()}
                    </span>
                    <span className="font-mono text-[10px] bg-[#201E1A]/90 text-[#9B958B] px-2 py-0.5 border border-[#38342D] uppercase">
                      {ev.category}
                    </span>
                  </div>

                  {/* Star Pin Button */}
                  {isDiscovered && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleStar(ev.id);
                      }}
                      className="absolute top-2 right-2 p-1.5 bg-[#10100F]/80 border border-[#38342D] hover:border-[#dfc38c] transition-colors"
                      title={isStarred ? "Remove pin" : "Pin as key clue"}
                    >
                      <Star
                        className={`w-3.5 h-3.5 ${
                          isStarred ? "fill-[#dfc38c] text-[#dfc38c]" : "text-[#9B958B]"
                        }`}
                      />
                    </button>
                  )}
                </div>

                {/* Card Text Content */}
                <div className="p-4">
                  <h3 className="font-serif text-lg font-bold text-[#EAE3D5] group-hover:text-[#dfc38c] transition-colors">
                    {ev.title}
                  </h3>
                  <div className="font-mono text-[10px] text-[#dfc38c] mt-0.5 mb-2">
                    LOC: {ev.discoveryLocation}
                  </div>
                  <p className="font-sans text-xs text-[#cdc5bb] line-clamp-3 leading-relaxed">
                    {isDiscovered ? ev.description : "Classified contents sealed until discovered."}
                  </p>
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="p-4 pt-0 border-t-0 flex items-center justify-between">
                <span className="font-mono text-[10px] text-[#9B958B] uppercase">
                  {isDiscovered
                    ? isInspected
                      ? "✓ INSPECTED"
                      : "• NEW DISCOVERY"
                    : "UNRESOLVED"}
                </span>

                {isDiscovered ? (
                  <button
                    onClick={() => handleOpenDetail(ev)}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-[#191816] border border-[#38342D] hover:border-[#dfc38c] text-[#dfc38c] font-mono text-xs uppercase tracking-wider transition-colors"
                  >
                    <span>EXAMINE</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <span className="font-mono text-[10px] text-[#9B958B]">PENDING DISCOVERY</span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Evidence Detail Modal */}
      {activeEvidence && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 animate-in fade-in duration-200">
          <div className="relative w-full max-w-3xl max-h-[90vh] bg-[#191816] border border-[#38342D] shadow-2xl flex flex-col overflow-hidden text-[#EAE3D5]">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-[#38342D] p-4 bg-[#10100F]">
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs bg-[#a52a2a] text-white px-2 py-0.5 font-bold uppercase tracking-widest">
                  EXHIBIT {activeEvidence.id.toUpperCase()}
                </span>
                <span className="font-mono text-xs text-[#dfc38c] uppercase tracking-wider">
                  CLASSIFICATION: {activeEvidence.category.toUpperCase()}
                </span>
              </div>
              <button
                onClick={handleCloseDetail}
                className="p-1 text-[#9B958B] hover:text-[#EAE3D5] hover:bg-[#201E1A] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Scrollable Body */}
            <div className="p-6 overflow-y-auto space-y-6">
              {/* Image & Basic Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="relative aspect-square max-h-64 md:max-h-80 w-full overflow-hidden border border-[#38342D] bg-[#0e0e0d]">
                  <img
                    src={activeEvidence.image}
                    alt={activeEvidence.title}
                    className="w-full h-full object-cover filter contrast-110"
                  />
                  <div className="absolute bottom-2 left-2 font-mono text-[10px] bg-[#10100F]/90 text-[#dfc38c] px-2 py-1 border border-[#38342D]">
                    {activeEvidence.discoveryLocation}
                  </div>
                </div>

                <div className="flex flex-col justify-between">
                  <div>
                    <h3 className="font-serif text-2xl text-[#EAE3D5] font-bold">
                      {activeEvidence.title}
                    </h3>
                    <div className="font-mono text-xs text-[#dfc38c] mt-1 mb-3">
                      RECOVERED AT: {activeEvidence.discoveryLocation}
                    </div>
                    <p className="font-sans text-sm text-[#cdc5bb] leading-relaxed">
                      {activeEvidence.description}
                    </p>
                  </div>

                  {/* Related Suspects tags */}
                  {activeEvidence.relatedSuspects.length > 0 && (
                    <div className="mt-4 pt-3 border-t border-[#38342D]">
                      <span className="font-mono text-[10px] uppercase text-[#9B958B] block mb-1">
                        ASSOCIATED PERSONS OF INTEREST:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {activeEvidence.relatedSuspects.map((susId) => {
                          const sus = currentCase.suspects.find((s) => s.id === susId);
                          return (
                            <span
                              key={susId}
                              className="px-2 py-0.5 bg-[#201E1A] border border-[#38342D] text-xs font-mono text-[#dfc38c]"
                            >
                              {sus ? sus.name : susId}
                            </span>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Forensic & Microscopic Observations */}
              <div className="bg-[#201E1A] border border-[#38342D] p-4 space-y-3">
                <div className="flex items-center gap-2 text-[#dfc38c] font-mono text-xs uppercase tracking-widest font-bold">
                  <Microscope className="w-4 h-4" />
                  LABORATORY & MICROSCOPIC FINDINGS
                </div>
                <div className="space-y-2">
                  {activeEvidence.availableObservations.map((obs, index) => (
                    <div
                      key={index}
                      className="p-2.5 bg-[#191816] border border-[#38342D] text-xs font-sans text-[#EAE3D5] flex items-start gap-2.5 leading-relaxed"
                    >
                      <span className="font-mono text-[#a52a2a] font-bold shrink-0 mt-0.5">
                        [OBS {index + 1}]
                      </span>
                      <span>{obs}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Player Case Notes Field */}
              <div className="border border-[#38342D] bg-[#10100F] p-4 space-y-2">
                <div className="flex items-center justify-between font-mono text-xs text-[#9B958B]">
                  <span className="uppercase tracking-wider flex items-center gap-1.5 text-[#dfc38c]">
                    <MessageSquare className="w-3.5 h-3.5" />
                    DETECTIVE NOTEPAD (AUTO-SAVED)
                  </span>
                  <span className="text-[10px]">SAVED TO ARCHIVE</span>
                </div>
                <textarea
                  rows={3}
                  value={currentNote}
                  onChange={(e) => handleNoteChange(e.target.value)}
                  placeholder="Record your deductive notes, contradictions, or questions regarding this exhibit..."
                  className="w-full bg-[#191816] border border-[#38342D] p-2.5 text-xs font-mono text-[#EAE3D5] placeholder-[#9B958B] focus:border-[#dfc38c] focus:outline-none"
                />
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-[#38342D] bg-[#10100F] flex items-center justify-between">
              <button
                onClick={() => onToggleStar(activeEvidence.id)}
                className="flex items-center gap-2 px-3 py-1.5 bg-[#201E1A] border border-[#38342D] hover:border-[#dfc38c] text-xs font-mono text-[#dfc38c]"
              >
                <Star
                  className={`w-4 h-4 ${
                    starredEvidenceIds.includes(activeEvidence.id)
                      ? "fill-[#dfc38c] text-[#dfc38c]"
                      : "text-[#9B958B]"
                  }`}
                />
                <span>
                  {starredEvidenceIds.includes(activeEvidence.id)
                    ? "PINNED AS KEY EVIDENCE"
                    : "PIN TO INVESTIGATION BOARD"}
                </span>
              </button>

              <button
                onClick={handleCloseDetail}
                className="px-4 py-2 bg-[#a52a2a] text-white font-mono text-xs uppercase tracking-widest font-bold hover:bg-[#8C2323] transition-colors"
              >
                CLOSE DOSSIER
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
