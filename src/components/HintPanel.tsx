"use client";

import React, { useState } from "react";
import { Case, Difficulty } from "@/types/game";
import { soundEngine } from "@/lib/audio";
import { HelpCircle, ChevronDown, ChevronUp, AlertCircle, Sparkles } from "lucide-react";

interface HintPanelProps {
  currentCase: Case;
  difficulty: Difficulty;
  hintsUsed: number;
  onUseHint: () => void;
}

export function HintPanel({
  currentCase,
  difficulty,
  hintsUsed,
  onUseHint,
}: HintPanelProps) {
  const [isOpen, setIsOpen] = useState(false);
  const hintsForDifficulty = currentCase.difficultyHints[difficulty] || [];

  const handleRevealNextHint = () => {
    soundEngine.playClick();
    onUseHint();
  };

  return (
    <div className="bg-[#191816] border border-[#38342D] shadow-lg">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-4 flex items-center justify-between hover:bg-[#201E1A] transition-colors text-left"
      >
        <div className="flex items-center gap-2.5">
          <HelpCircle className="w-4 h-4 text-[#dfc38c]" />
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-[#dfc38c] font-bold">
              INVESTIGATIVE HINT SYSTEM
            </span>
            <span className="font-mono text-[10px] text-[#9B958B] ml-2">
              [{hintsUsed} OF {hintsForDifficulty.length} REVEALED // PROFILE: {difficulty.toUpperCase()}]
            </span>
          </div>
        </div>
        {isOpen ? (
          <ChevronUp className="w-4 h-4 text-[#9B958B]" />
        ) : (
          <ChevronDown className="w-4 h-4 text-[#9B958B]" />
        )}
      </button>

      {isOpen && (
        <div className="p-4 pt-0 border-t border-[#38342D] space-y-3 animate-in fade-in duration-150">
          <p className="font-sans text-xs text-[#9B958B] leading-relaxed">
            Three progressive forensic nudges adapted to your selected difficulty level ({difficulty}).
            Requesting hints will subtly adjust your final detective rating.
          </p>

          <div className="space-y-2">
            {hintsForDifficulty.map((hintText, index) => {
              const isRevealed = index < hintsUsed;
              return (
                <div
                  key={index}
                  className={`p-3 border text-xs font-sans transition-all leading-relaxed ${
                    isRevealed
                      ? "bg-[#201E1A] border-[#dfc38c] text-[#EAE3D5]"
                      : "bg-[#10100F] border-[#38342D]/50 text-[#9B958B] italic"
                  }`}
                >
                  <div className="flex items-center justify-between font-mono text-[10px] uppercase text-[#dfc38c] mb-1 font-bold">
                    <span>HINT STAGE {index + 1}</span>
                    <span>{isRevealed ? "UNSEALED" : "SEALED"}</span>
                  </div>
                  <div>
                    {isRevealed
                      ? hintText
                      : "Deduction prompt sealed. Click below to unseal this hint."}
                  </div>
                </div>
              );
            })}
          </div>

          {hintsUsed < hintsForDifficulty.length && (
            <button
              onClick={handleRevealNextHint}
              className="mt-2 w-full py-2 bg-[#201E1A] border border-[#a52a2a] text-[#ffb3ad] hover:bg-[#a52a2a] hover:text-white font-mono text-xs uppercase tracking-wider font-bold transition-colors flex items-center justify-center gap-2"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>UNSEAL HINT STAGE {hintsUsed + 1}</span>
            </button>
          )}
        </div>
      )}
    </div>
  );
}
