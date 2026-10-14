"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { soundEngine } from "@/lib/audio";
import { ALL_CASES } from "@/data/cases";
import { SettingsModal } from "./SettingsModal";
import { Volume2, VolumeX, Settings, ChevronDown, Lock, ShieldAlert } from "lucide-react";

interface HeaderProps {
  activeCaseId?: string;
  onCaseReset?: () => void;
}

export function Header({ activeCaseId, onCaseReset }: HeaderProps) {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isCaseDropdownOpen, setIsCaseDropdownOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    setIsMuted(soundEngine.getIsMuted());
  }, []);

  const activeCase = ALL_CASES.find((c) => c.id === activeCaseId);

  const toggleSound = () => {
    // If no ambient is playing and user unmutes, start subtle rain
    if (soundEngine.getAmbientMode() === "none") {
      soundEngine.playAmbient("rain");
    } else {
      const muted = soundEngine.toggleMute();
      setIsMuted(muted);
    }
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40 bg-[#0e0e0d]/95 backdrop-blur-md border-b border-[#38342D] shadow-[0_1px_8px_rgba(0,0,0,0.5)]">
        <div className="h-16 w-full px-4 lg:px-8 flex items-center justify-between">
          {/* Left: Branding & Case Reference */}
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-8 h-8 rounded-none bg-[#a52a2a] flex items-center justify-center text-[#ffdad7] font-mono font-bold text-sm border border-[#ffb3ad]/40 shadow-inner group-hover:bg-[#8C2323] transition-colors">
                LA
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-xl tracking-tight leading-none text-[#EAE3D5] font-semibold group-hover:text-[#dfc38c] transition-colors">
                  THE LAST ALIBI
                </span>
                <span className="font-mono text-[10px] text-[#9B958B] uppercase tracking-widest mt-0.5">
                  CLASSIFIED INVESTIGATION ARCHIVE // VERITAS 1948
                </span>
              </div>
            </Link>

            {/* Case Jump Dropdown */}
            <div className="relative hidden md:block">
              <button
                onClick={() => setIsCaseDropdownOpen(!isCaseDropdownOpen)}
                className="flex items-center gap-2 px-3 py-1 bg-[#201E1A] border border-[#38342D] hover:border-[#dfc38c] transition-colors text-xs font-mono"
              >
                <span className="text-[#9B958B]">CASE REF:</span>
                <span className="text-[#dfc38c] font-bold">
                  {activeCase ? activeCase.caseNumber : "ALL DOSSIERS"}
                </span>
                <ChevronDown className="w-3.5 h-3.5 text-[#9B958B]" />
              </button>

              {isCaseDropdownOpen && (
                <div className="absolute left-0 mt-1 w-64 bg-[#191816] border border-[#38342D] shadow-2xl py-1 z-50 animate-in fade-in-50">
                  <Link
                    href="/"
                    onClick={() => setIsCaseDropdownOpen(false)}
                    className="block px-3 py-2 text-xs font-mono text-[#EAE3D5] hover:bg-[#201E1A] hover:text-[#dfc38c]"
                  >
                    ✦ ARCHIVE HOME
                  </Link>
                  <div className="h-px bg-[#38342D] my-1" />
                  {ALL_CASES.map((c) => (
                    <Link
                      key={c.id}
                      href={`/cases/${c.slug}`}
                      onClick={() => setIsCaseDropdownOpen(false)}
                      className={`block px-3 py-2 text-xs font-mono hover:bg-[#201E1A] transition-colors ${
                        c.id === activeCaseId ? "text-[#dfc38c] font-bold bg-[#201E1A]" : "text-[#cdc5bb]"
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <span>{c.caseNumber}</span>
                        <span className="text-[10px] text-[#9B958B] uppercase">{c.defaultDifficulty}</span>
                      </div>
                      <div className="text-[11px] text-[#EAE3D5] truncate">{c.title}</div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right: Status & Interactive Controls */}
          <div className="flex items-center gap-3">
            {/* Status Stamp Badge */}
            <div className="hidden lg:flex items-center gap-2 px-3 py-1 bg-[#201E1A] border border-[#38342D]">
              <span className="w-2 h-2 rounded-full bg-[#a52a2a] animate-pulse" />
              <span className="font-mono text-[10px] text-[#9B958B] tracking-widest uppercase">
                {activeCase ? `${activeCase.title.toUpperCase()} // ACTIVE` : "DOSSIER UNSEALED • EVIDENCE LOCKED"}
              </span>
            </div>

            {/* Audio Toggle */}
            <button
              onClick={toggleSound}
              title="Toggle Atmospheric Soundscape"
              className="flex items-center gap-1.5 px-2.5 py-1.5 bg-[#201E1A] border border-[#38342D] hover:border-[#dfc38c] text-[#9B958B] hover:text-[#EAE3D5] transition-colors"
            >
              {isMuted ? <VolumeX className="w-4 h-4 text-[#a52a2a]" /> : <Volume2 className="w-4 h-4 text-[#dfc38c]" />}
              <span className="font-mono text-[11px] hidden sm:inline uppercase tracking-wider">
                {isMuted ? "MUTE" : "TAPE REEL"}
              </span>
            </button>

            {/* Settings */}
            <button
              onClick={() => setIsSettingsOpen(true)}
              title="Investigation Preferences"
              className="p-1.5 bg-[#201E1A] border border-[#38342D] hover:border-[#dfc38c] text-[#9B958B] hover:text-[#EAE3D5] transition-colors"
            >
              <Settings className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        activeCaseId={activeCaseId}
        onCaseReset={onCaseReset}
      />
    </>
  );
}
