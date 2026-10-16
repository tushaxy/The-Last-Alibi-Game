"use client";

import React, { useState } from "react";
import { Case, Hotspot, EvidenceItem } from "@/types/game";
import { soundEngine } from "@/lib/audio";
import { Search, Eye, AlertCircle, CheckCircle, Sparkles, Folder } from "lucide-react";

interface CrimeSceneViewerProps {
  currentCase: Case;
  discoveredEvidenceIds: string[];
  onDiscoverEvidence: (evidenceId: string) => void;
  onOpenEvidenceDetail: (evidenceId: string) => void;
}

export function CrimeSceneViewer({
  currentCase,
  discoveredEvidenceIds,
  onDiscoverEvidence,
  onOpenEvidenceDetail,
}: CrimeSceneViewerProps) {
  const [activeHotspotId, setActiveHotspotId] = useState<string | null>(null);

  const handleHotspotClick = (hs: Hotspot) => {
    soundEngine.playEvidenceDiscovered();
    onDiscoverEvidence(hs.evidenceId);
    onOpenEvidenceDetail(hs.evidenceId);
  };

  const activeHotspot = currentCase.crimeScene.hotspots.find((h) => h.id === activeHotspotId);

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Crime Scene Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#38342D] pb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="font-mono text-xs uppercase tracking-widest text-[#a52a2a] font-bold">
              CRIME SCENE RECONSTRUCTION
            </span>
            <span className="h-1.5 w-1.5 rounded-full bg-[#a52a2a]" />
            <span className="font-mono text-xs text-[#9B958B]">INCIDENT LOCATION // SECURED</span>
          </div>
          <h2 className="font-serif text-2xl lg:text-3xl text-[#EAE3D5]">
            {currentCase.crimeScene.title}
          </h2>
          <p className="font-sans text-sm text-[#9B958B] mt-1 max-w-3xl">
            {currentCase.crimeScene.description}
          </p>
        </div>

        <div className="flex items-center gap-2 font-mono text-xs bg-[#201E1A] px-3 py-1.5 border border-[#38342D] shrink-0">
          <span className="text-[#dfc38c]">EVIDENCE EXHIBITS:</span>
          <span className="text-[#EAE3D5] font-bold">
            {
              currentCase.crimeScene.hotspots.filter((h) =>
                discoveredEvidenceIds.includes(h.evidenceId)
              ).length
            }{" "}
            / {currentCase.crimeScene.hotspots.length} SECURED
          </span>
        </div>
      </div>

      {/* Tactical Workspace: Scene Canvas (Left) + Evidence Options Column (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Main Photographic Canvas with Hotspots (8 cols) */}
        <div className="lg:col-span-8 flex flex-col">
          <div className="relative w-full aspect-video min-h-[380px] lg:h-full overflow-hidden border border-[#38342D] bg-[#0e0e0d] shadow-2xl group flex-1">
            <img
              src={currentCase.crimeScene.image}
              alt={currentCase.crimeScene.title}
              className="w-full h-full object-cover filter brightness-95 contrast-110 select-none transition-transform duration-700 group-hover:scale-101"
            />

            {/* Noir Vignette and Lighting Gradients */}
            <div className="pointer-events-none absolute inset-0 bg-radial-gradient from-transparent via-black/25 to-black/75" />

            {/* Hotspot Markers */}
            {currentCase.crimeScene.hotspots.map((hs) => {
              const isDiscovered = discoveredEvidenceIds.includes(hs.evidenceId);
              const isActive = activeHotspotId === hs.id;

              return (
                <div
                  key={hs.id}
                  style={{ left: `${hs.xPercent}%`, top: `${hs.yPercent}%` }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 z-20"
                  onMouseEnter={() => setActiveHotspotId(hs.id)}
                  onMouseLeave={() => setActiveHotspotId(null)}
                >
                  {/* Radar pulse ring */}
                  <span
                    className={`absolute -inset-2.5 rounded-full animate-ping pointer-events-none ${
                      isActive
                        ? "bg-[#dfc38c]/70 ring-2 ring-[#dfc38c]"
                        : isDiscovered
                        ? "bg-[#dfc38c]/25"
                        : "bg-[#a52a2a]/60"
                    }`}
                  />

                  <button
                    onClick={() => handleHotspotClick(hs)}
                    className={`relative flex items-center justify-center w-8 h-8 rounded-none border transition-all duration-200 shadow-2xl ${
                      isActive
                        ? "scale-125 bg-[#dfc38c] border-white text-black ring-2 ring-[#dfc38c]"
                        : isDiscovered
                        ? "bg-[#201E1A] border-[#dfc38c] text-[#dfc38c] hover:bg-[#353533]"
                        : "bg-[#a52a2a] border-[#ffb3ad] text-white hover:bg-[#8C2323] hover:scale-110"
                    }`}
                    title={hs.label}
                  >
                    {isDiscovered ? (
                      <CheckCircle className="w-4 h-4" />
                    ) : (
                      <Search className="w-4 h-4" />
                    )}
                  </button>

                  {/* Tooltip on Hover */}
                  {isActive && (
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-64 p-3 bg-[#191816] border-2 border-[#dfc38c] shadow-2xl z-30 pointer-events-none animate-in fade-in zoom-in-95 duration-150">
                      <div className="flex items-center justify-between border-b border-[#38342D] pb-1 mb-1.5">
                        <span className="font-mono text-[9px] text-[#dfc38c] uppercase tracking-wider font-bold">
                          {isDiscovered ? "SECURED IN EVIDENCE LOCKER" : "CLICK TO EXAMINE EXHIBIT"}
                        </span>
                        <span className="font-mono text-[9px] text-[#9B958B]">
                          {hs.evidenceId.toUpperCase()}
                        </span>
                      </div>
                      <div className="font-serif text-sm text-[#EAE3D5] font-bold leading-tight">
                        {hs.label}
                      </div>
                      <div className="font-sans text-xs text-[#cdc5bb] mt-1 leading-snug">
                        {hs.previewText}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}

            {/* Tactical Overlay Stamp */}
            <div className="pointer-events-none absolute top-4 left-4 font-mono text-[11px] text-[#dfc38c] bg-[#10100F]/90 backdrop-blur-sm border border-[#38342D] px-2.5 py-1">
              LOCATION REF: {currentCase.incidentLocation.toUpperCase()}
            </div>

            {/* Bottom Status bar on Image */}
            <div className="pointer-events-none absolute bottom-3 left-4 right-4 flex items-center justify-between font-mono text-[10px] text-[#9B958B] bg-[#10100F]/80 backdrop-blur-sm border border-[#38342D] px-3 py-1.5">
              <span>RADAR HOTSPOT SCANNER // ACTIVE</span>
              <span className="text-[#dfc38c]">
                {activeHotspot ? `FOCUSED: ${activeHotspot.label.toUpperCase()}` : "HOVER TO TARGET CLUE"}
              </span>
            </div>
          </div>
        </div>

        {/* Coordinated Evidence Column (4 cols) - Perfectly Aligned */}
        <div className="lg:col-span-4 flex flex-col justify-between space-y-3">
          <div className="flex items-center justify-between font-mono text-xs uppercase tracking-wider text-[#dfc38c] font-bold border-b border-[#38342D] pb-2">
            <span>SCENE EXHIBITS &amp; LEADS</span>
            <span className="text-[10px] text-[#9B958B]">SELECT TO INVESTIGATE</span>
          </div>

          {/* Evidence Options Stack - Perfectly Aligned and Distributed */}
          <div className="flex-1 flex flex-col justify-between gap-3 min-h-[380px]">
            {currentCase.crimeScene.hotspots.map((hs, index) => {
              const isDiscovered = discoveredEvidenceIds.includes(hs.evidenceId);
              const isActive = activeHotspotId === hs.id;
              const evidenceItem = currentCase.evidence.find((e) => e.id === hs.evidenceId);

              return (
                <div
                  key={hs.id}
                  onClick={() => handleHotspotClick(hs)}
                  onMouseEnter={() => setActiveHotspotId(hs.id)}
                  onMouseLeave={() => setActiveHotspotId(null)}
                  className={`flex-1 p-3.5 border cursor-pointer transition-all duration-200 flex flex-col justify-between ${
                    isActive
                      ? "bg-[#252320] border-[#dfc38c] shadow-xl ring-1 ring-[#dfc38c]"
                      : isDiscovered
                      ? "bg-[#1c1b18] border-[#38342D] hover:border-[#dfc38c] hover:bg-[#201e1b]"
                      : "bg-[#151412] border-[#a52a2a]/60 hover:border-[#ffb3ad] hover:bg-[#1a1816]"
                  }`}
                >
                  {/* Top Bar: Lead Badge, ID, and Hotspot Index */}
                  <div className="flex items-center justify-between gap-2 mb-2 pb-1.5 border-b border-[#38342D]/50">
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-[9px] font-mono uppercase px-2 py-0.5 border font-bold ${
                          isDiscovered
                            ? "border-[#dfc38c] bg-[#dfc38c]/10 text-[#dfc38c]"
                            : "border-[#a52a2a] bg-[#a52a2a]/20 text-[#ffb3ad]"
                        }`}
                      >
                        {isDiscovered ? "✓ SECURED EXHIBIT" : "● UNEXAMINED LEAD"}
                      </span>
                      <span className="font-mono text-[10px] text-[#9B958B] font-bold">
                        {hs.evidenceId.toUpperCase()}
                      </span>
                    </div>

                    <span className="font-mono text-[10px] text-[#9B958B]">
                      POINT {index + 1}
                    </span>
                  </div>

                  {/* Middle Content: Thumbnail (if present) + Label + Preview */}
                  <div className="flex items-start gap-3 my-1">
                    {evidenceItem?.image && isDiscovered ? (
                      <img
                        src={evidenceItem.image}
                        alt={hs.label}
                        className="w-14 h-14 object-cover border border-[#38342D] shrink-0 filter contrast-105 brightness-95"
                      />
                    ) : (
                      <div className="w-14 h-14 bg-[#10100F] border border-[#38342D] flex flex-col items-center justify-center shrink-0 text-[#9B958B]">
                        <Search className="w-5 h-5 text-[#dfc38c]" />
                        <span className="text-[8px] font-mono mt-0.5 uppercase text-[#9B958B]">
                          HOTSPOT
                        </span>
                      </div>
                    )}

                    <div className="flex-1 min-w-0">
                      <h4 className="font-serif text-sm font-bold text-[#EAE3D5] leading-snug group-hover:text-[#dfc38c] line-clamp-1">
                        {hs.label}
                      </h4>
                      <p className="font-sans text-xs text-[#9B958B] mt-1 line-clamp-2 leading-relaxed">
                        {hs.previewText}
                      </p>
                    </div>
                  </div>

                  {/* Bottom Action Footer - Perfectly Aligned across all cards */}
                  <div className="pt-2 mt-2 border-t border-[#38342D]/40 flex items-center justify-between text-xs font-mono">
                    <span className="text-[10px] text-[#9B958B] uppercase">
                      COORDINATES: {hs.xPercent}%, {hs.yPercent}%
                    </span>

                    <button
                      className={`px-3 py-1 text-[11px] font-mono font-bold flex items-center gap-1.5 border transition-all ${
                        isDiscovered
                          ? "bg-[#201E1A] border-[#38342D] text-[#dfc38c] hover:bg-[#dfc38c] hover:text-black"
                          : "bg-[#a52a2a] border-[#ffb3ad] text-white hover:bg-[#8C2323]"
                      }`}
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>{isDiscovered ? "INSPECT CLUE" : "EXAMINE HOTSPOT"}</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

