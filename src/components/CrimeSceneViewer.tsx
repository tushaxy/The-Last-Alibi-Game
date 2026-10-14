"use client";

import React, { useState } from "react";
import { Case, Hotspot, EvidenceItem } from "@/types/game";
import { soundEngine } from "@/lib/audio";
import { Search, Eye, AlertCircle, CheckCircle } from "lucide-react";

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
  const [activeHotspot, setActiveHotspot] = useState<Hotspot | null>(null);

  const handleHotspotClick = (hs: Hotspot) => {
    soundEngine.playEvidenceDiscovered();
    onDiscoverEvidence(hs.evidenceId);
    onOpenEvidenceDetail(hs.evidenceId);
  };

  return (
    <div className="space-y-6">
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

        <div className="flex items-center gap-2 font-mono text-xs bg-[#201E1A] px-3 py-1.5 border border-[#38342D]">
          <span className="text-[#dfc38c]">EVIDENCE HOTSPOTS:</span>
          <span className="text-[#EAE3D5] font-bold">
            {
              currentCase.crimeScene.hotspots.filter((h) =>
                discoveredEvidenceIds.includes(h.evidenceId)
              ).length
            }{" "}
            / {currentCase.crimeScene.hotspots.length} DISCOVERED
          </span>
        </div>
      </div>

      {/* Main Photographic Canvas with Hotspots */}
      <div className="relative w-full aspect-video max-h-[640px] overflow-hidden border border-[#38342D] bg-[#0e0e0d] shadow-2xl group">
        <img
          src={currentCase.crimeScene.image}
          alt={currentCase.crimeScene.title}
          className="w-full h-full object-cover filter brightness-90 contrast-110 select-none"
        />

        {/* Noir Vignette and Lighting Gradients */}
        <div className="pointer-events-none absolute inset-0 bg-radial-gradient from-transparent via-black/20 to-black/70" />

        {/* Hotspot Markers */}
        {currentCase.crimeScene.hotspots.map((hs) => {
          const isDiscovered = discoveredEvidenceIds.includes(hs.evidenceId);
          return (
            <div
              key={hs.id}
              style={{ left: `${hs.xPercent}%`, top: `${hs.yPercent}%` }}
              className="absolute -translate-x-1/2 -translate-y-1/2 z-20"
              onMouseEnter={() => setActiveHotspot(hs)}
              onMouseLeave={() => setActiveHotspot(null)}
            >
              {/* Radar pulse ring */}
              <span className="absolute -inset-2 rounded-full bg-[#a52a2a]/40 animate-ping" />

              <button
                onClick={() => handleHotspotClick(hs)}
                className={`relative flex items-center justify-center w-8 h-8 rounded-none border transition-all duration-200 shadow-xl ${
                  isDiscovered
                    ? "bg-[#201E1A] border-[#dfc38c] text-[#dfc38c] hover:bg-[#353533]"
                    : "bg-[#a52a2a] border-[#ffb3ad] text-white hover:bg-[#8C2323] hover:scale-110"
                }`}
                title={hs.label}
              >
                {isDiscovered ? (
                  <CheckCircle className="w-4 h-4 text-[#dfc38c]" />
                ) : (
                  <Search className="w-4 h-4 text-white" />
                )}
              </button>

              {/* Tooltip on Hover */}
              {activeHotspot?.id === hs.id && (
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-56 p-2.5 bg-[#191816] border border-[#dfc38c] shadow-2xl z-30 pointer-events-none animate-in fade-in duration-150">
                  <div className="font-mono text-[10px] text-[#dfc38c] uppercase tracking-wider mb-0.5">
                    {isDiscovered ? "EVIDENCE RECOVERED" : "CLICK TO EXAMINE"}
                  </div>
                  <div className="font-serif text-sm text-[#EAE3D5] font-bold">{hs.label}</div>
                  <div className="font-sans text-xs text-[#9B958B] mt-1 leading-snug">
                    {hs.previewText}
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {/* Tactical Overlay Stamp */}
        <div className="pointer-events-none absolute top-4 left-4 font-mono text-[11px] text-[#dfc38c] bg-[#10100F]/80 backdrop-blur-sm border border-[#38342D] px-2.5 py-1">
          LOCATION REF: {currentCase.incidentLocation.toUpperCase()}
        </div>
      </div>

      {/* Accessible / Mobile List Fallback */}
      <div className="space-y-3">
        <div className="font-mono text-xs uppercase tracking-wider text-[#9B958B]">
          INTERACTIVE EVIDENCE HOTSPOTS (DIRECT ACCESS LIST)
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {currentCase.crimeScene.hotspots.map((hs) => {
            const isDiscovered = discoveredEvidenceIds.includes(hs.evidenceId);
            return (
              <div
                key={hs.id}
                onClick={() => handleHotspotClick(hs)}
                className={`p-3 border cursor-pointer transition-all flex items-start justify-between gap-3 ${
                  isDiscovered
                    ? "bg-[#201E1A] border-[#38342D] hover:border-[#dfc38c]"
                    : "bg-[#191816] border-[#a52a2a]/60 hover:border-[#ffb3ad]"
                }`}
              >
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span
                      className={`text-[10px] font-mono uppercase px-1.5 py-0.2 border ${
                        isDiscovered
                          ? "border-[#dfc38c] text-[#dfc38c]"
                          : "border-[#a52a2a] text-[#ffb3ad]"
                      }`}
                    >
                      {isDiscovered ? "SECURED" : "UNEXAMINED"}
                    </span>
                    <span className="font-mono text-[10px] text-[#9B958B]">{hs.evidenceId}</span>
                  </div>
                  <h4 className="font-serif text-sm font-semibold text-[#EAE3D5]">{hs.label}</h4>
                  <p className="font-sans text-xs text-[#9B958B] mt-0.5 line-clamp-2">
                    {hs.previewText}
                  </p>
                </div>
                <button
                  className={`p-2 shrink-0 border ${
                    isDiscovered
                      ? "bg-[#201E1A] border-[#38342D] text-[#dfc38c]"
                      : "bg-[#a52a2a] border-[#ffb3ad] text-white"
                  }`}
                >
                  <Eye className="w-4 h-4" />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
