"use client";

import React, { useState, useEffect } from "react";
import { soundEngine } from "@/lib/audio";
import { Difficulty } from "@/types/game";
import { resetCaseProgress, resetAllProgress } from "@/lib/storage";
import { Volume2, VolumeX, Sliders, AlertTriangle, X, RefreshCw } from "lucide-react";

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeCaseId?: string;
  currentDifficulty?: Difficulty;
  onDifficultyChange?: (d: Difficulty) => void;
  onCaseReset?: () => void;
}

export function SettingsModal({
  isOpen,
  onClose,
  activeCaseId,
  currentDifficulty = "easy",
  onDifficultyChange,
  onCaseReset,
}: SettingsModalProps) {
  const [isMuted, setIsMuted] = useState(soundEngine.getIsMuted());
  const [ambientVol, setAmbientVol] = useState(soundEngine.getAmbientVolume());
  const [sfxVol, setSfxVol] = useState(soundEngine.getSfxVolume());
  const [ambientMode, setAmbientMode] = useState(soundEngine.getAmbientMode());
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  useEffect(() => {
    setIsMuted(soundEngine.getIsMuted());
    setAmbientVol(soundEngine.getAmbientVolume());
    setSfxVol(soundEngine.getSfxVolume());
    setAmbientMode(soundEngine.getAmbientMode());
  }, [isOpen]);

  if (!isOpen) return null;

  const handleToggleMute = () => {
    const muted = soundEngine.toggleMute();
    setIsMuted(muted);
  };

  const handleAmbientVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setAmbientVol(val);
    soundEngine.setAmbientVolume(val);
  };

  const handleSfxVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setSfxVol(val);
    soundEngine.setSfxVolume(val);
  };

  const handleSelectAmbient = (mode: "none" | "rain" | "vinyl" | "clock" | "tape" | "chapel") => {
    soundEngine.playAmbient(mode);
    setAmbientMode(soundEngine.getAmbientMode());
  };

  const handleResetCurrent = () => {
    if (activeCaseId) {
      resetCaseProgress(activeCaseId, currentDifficulty);
      if (onCaseReset) onCaseReset();
      setShowResetConfirm(false);
      onClose();
    }
  };

  const handleResetEverything = () => {
    resetAllProgress();
    if (onCaseReset) onCaseReset();
    setShowResetConfirm(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-[#191816] border border-[#38342D] rounded-none p-6 shadow-2xl text-[#EAE3D5]">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#38342D] pb-3 mb-5">
          <div className="flex items-center gap-2">
            <Sliders className="w-5 h-5 text-[#dfc38c]" />
            <span className="font-mono text-xs uppercase tracking-widest text-[#dfc38c]">
              ARCHIVE CONFIGURATION // PREFERENCES
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-[#9B958B] hover:text-[#EAE3D5] hover:bg-[#201E1A] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Ambient Soundscapes */}
        <div className="space-y-4 mb-6">
          <div className="flex items-center justify-between">
            <label className="font-mono text-xs uppercase tracking-wider text-[#9B958B]">
              ATMOSPHERIC REEL SOUNDSCAPE
            </label>
            <button
              onClick={handleToggleMute}
              className={`flex items-center gap-1.5 px-2.5 py-1 text-xs font-mono uppercase tracking-wider border transition-colors ${
                isMuted
                  ? "bg-[#a52a2a]/20 border-[#a52a2a] text-[#ffb3ad]"
                  : "bg-[#201E1A] border-[#38342D] text-[#dfc38c] hover:border-[#dfc38c]"
              }`}
            >
              {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
              {isMuted ? "MUTED" : "ACTIVE"}
            </button>
          </div>

          <div className="grid grid-cols-3 gap-2">
            {[
              { id: "rain", label: "Rain (Glass)" },
              { id: "vinyl", label: "Vinyl Static" },
              { id: "clock", label: "Pocket Watch" },
              { id: "tape", label: "Tape Hiss" },
              { id: "chapel", label: "Crypt Drone" },
              { id: "none", label: "Silence" },
            ].map((snd) => (
              <button
                key={snd.id}
                onClick={() => handleSelectAmbient(snd.id as any)}
                className={`py-2 px-2 text-xs font-mono text-center border transition-all ${
                  ambientMode === snd.id
                    ? "bg-[#a52a2a] border-[#ffb3ad] text-white font-bold"
                    : "bg-[#201E1A] border-[#38342D] text-[#cdc5bb] hover:border-[#b39a66]"
                }`}
              >
                {snd.label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-4 pt-2">
            <div>
              <div className="flex justify-between font-mono text-[11px] text-[#9B958B] mb-1">
                <span>AMBIENT GAIN</span>
                <span>{Math.round(ambientVol * 100)}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={ambientVol}
                onChange={handleAmbientVolumeChange}
                className="w-full accent-[#dfc38c] bg-[#201E1A]"
              />
            </div>
            <div>
              <div className="flex justify-between font-mono text-[11px] text-[#9B958B] mb-1">
                <span>EFFECTS (SFX)</span>
                <span>{Math.round(sfxVol * 100)}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={sfxVol}
                onChange={handleSfxVolumeChange}
                className="w-full accent-[#a52a2a] bg-[#201E1A]"
              />
            </div>
          </div>
        </div>

        {/* Difficulty Selection */}
        {onDifficultyChange && (
          <div className="border-t border-[#38342D] pt-4 mb-6">
            <label className="block font-mono text-xs uppercase tracking-wider text-[#9B958B] mb-2">
              INVESTIGATION DIFFICULTY PROFILE
            </label>
            <div className="grid grid-cols-4 gap-2">
              {(["easy", "medium", "hard", "very-hard"] as Difficulty[]).map((d) => (
                <button
                  key={d}
                  onClick={() => onDifficultyChange(d)}
                  className={`py-2 text-xs font-mono uppercase tracking-wider border transition-all ${
                    currentDifficulty === d
                      ? "bg-[#b39a66]/20 border-[#dfc38c] text-[#dfc38c] font-bold"
                      : "bg-[#201E1A] border-[#38342D] text-[#9B958B] hover:text-[#EAE3D5]"
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>
            <p className="font-mono text-[11px] text-[#9B958B] mt-2">
              Note: Difficulty alters deductive hints and interview guidance. The canonical truth
              remains identical across all levels.
            </p>
          </div>
        )}

        {/* Reset Progress Section */}
        <div className="border-t border-[#38342D] pt-4">
          {!showResetConfirm ? (
            <button
              onClick={() => setShowResetConfirm(true)}
              className="w-full flex items-center justify-center gap-2 py-2 px-4 border border-[#a52a2a]/50 text-[#ffb3ad] text-xs font-mono uppercase tracking-widest hover:bg-[#a52a2a]/20 transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              RESET INVESTIGATION PROGRESS
            </button>
          ) : (
            <div className="bg-[#a52a2a]/10 border border-[#a52a2a] p-3 text-center space-y-2">
              <div className="flex items-center justify-center gap-2 text-[#ffb3ad] font-mono text-xs font-bold">
                <AlertTriangle className="w-4 h-4" />
                CONFIRM DOSSIER PURGE
              </div>
              <p className="text-xs text-[#cdc5bb]">
                This will erase discovered clues, notes, and accusations for this case.
              </p>
              <div className="flex gap-2 justify-center pt-1">
                {activeCaseId && (
                  <button
                    onClick={handleResetCurrent}
                    className="px-3 py-1.5 bg-[#a52a2a] text-white font-mono text-xs uppercase tracking-wider font-bold hover:bg-[#8C2323]"
                  >
                    Reset Active Case
                  </button>
                )}
                <button
                  onClick={handleResetEverything}
                  className="px-3 py-1.5 bg-[#201E1A] border border-[#a52a2a] text-[#ffb3ad] font-mono text-xs uppercase tracking-wider hover:bg-[#353533]"
                >
                  Purge All 4 Cases
                </button>
                <button
                  onClick={() => setShowResetConfirm(false)}
                  className="px-3 py-1.5 bg-[#201E1A] border border-[#38342D] text-[#9B958B] font-mono text-xs uppercase"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
