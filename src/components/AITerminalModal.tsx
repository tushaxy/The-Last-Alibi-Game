"use client";

import React, { useState, useRef, useEffect } from "react";
import { Case, Suspect } from "@/types/game";
import { soundEngine } from "@/lib/audio";
import { generateAIResponse, ChatMessage } from "@/lib/aiTerminalEngine";
import {
  Terminal,
  Send,
  X,
  Sparkles,
  Bot,
  User,
  ShieldCheck,
  RotateCcw,
  ExternalLink,
  ChevronRight,
  Maximize2,
  Minimize2,
} from "lucide-react";

interface AITerminalModalProps {
  currentCase: Case;
  discoveredEvidenceIds: string[];
  onDiscoverEvidence?: (evidenceId: string) => void;
  onOpenEvidenceDetail?: (evidenceId: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

export function AITerminalModal({
  currentCase,
  discoveredEvidenceIds,
  onDiscoverEvidence,
  onOpenEvidenceDetail,
  isOpen,
  onClose,
}: AITerminalModalProps) {
  const [selectedPersonaId, setSelectedPersonaId] = useState<string>("archive");
  const [inputText, setInputText] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Initialize welcome message when modal opens or case changes
  useEffect(() => {
    if (messages.length === 0 && currentCase) {
      setMessages([
        {
          id: "msg-init",
          sender: "assistant",
          personaId: "archive",
          personaName: "VERITAS ARCHIVE CORE",
          text: `[DISTRICT 4 SYNTHETIC INQUISITOR ONLINE]\nAll classified records for "${currentCase.title}" (${currentCase.caseNumber}) have been compiled.\n\nSelect "VERITAS ARCHIVE CORE" to query forensic data, autopsy reports, or verified timelines. Select any person of interest to interrogate them in real time.`,
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ]);
    }
  }, [currentCase, messages.length]);

  // Scroll to bottom on new message
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isTyping, isOpen]);

  // Focus input on open
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const currentPersonaName =
    selectedPersonaId === "archive"
      ? "VERITAS ARCHIVE CORE"
      : currentCase.suspects.find((s) => s.id === selectedPersonaId)?.name || "PERSON OF INTEREST";

  const selectedSuspect = currentCase.suspects.find((s) => s.id === selectedPersonaId);

  // Suggested Prompts based on persona
  const suggestedPrompts =
    selectedPersonaId === "archive"
      ? [
          "Summarize victim autopsy & cause of death",
          "What is the verified incident timeline?",
          "How many forensic exhibits are unrecovered?",
          "Provide tactical investigation advice",
        ]
      : [
          `Where were you at the time of the murder?`,
          `What was your relationship with ${currentCase.victim.name}?`,
          `Did you have a motive to want them dead?`,
          `Are you hiding any evidence from the police?`,
        ];

  const handleSendMessage = (textToSend?: string) => {
    const text = (textToSend || inputText).trim();
    if (!text || isTyping) return;

    soundEngine.playClick();

    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: "player",
      personaId: selectedPersonaId,
      personaName: "DETECTIVE",
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText("");
    setIsTyping(true);

    // Realistic teletype delay
    setTimeout(() => {
      const response = generateAIResponse({
        currentCase,
        personaId: selectedPersonaId,
        query: text,
        history: [...messages, userMsg],
        discoveredEvidenceIds,
      });

      if (response.unlockedEvidenceId && onDiscoverEvidence) {
        if (!discoveredEvidenceIds.includes(response.unlockedEvidenceId)) {
          soundEngine.playEvidenceDiscovered();
          onDiscoverEvidence(response.unlockedEvidenceId);
        }
      } else {
        soundEngine.playClick();
      }

      const aiMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: "assistant",
        personaId: selectedPersonaId,
        personaName: currentPersonaName,
        text: response.text,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        unlockedEvidenceId: response.unlockedEvidenceId,
      };

      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
    }, 450);
  };

  const handleClearHistory = () => {
    soundEngine.playPaperTurn();
    setMessages([
      {
        id: `msg-${Date.now()}`,
        sender: "assistant",
        personaId: selectedPersonaId,
        personaName: currentPersonaName,
        text: `Terminal log cleared. Interrogation channel open for ${currentPersonaName.toUpperCase()}.`,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      },
    ]);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-2 sm:p-4 animate-in fade-in duration-200">
      <div
        className={`relative w-full ${
          isMaximized ? "max-w-6xl h-[94vh]" : "max-w-4xl h-[85vh]"
        } bg-[#10100F] border-2 border-[#dfc38c] shadow-2xl flex flex-col overflow-hidden text-[#EAE3D5] transition-all duration-300 font-sans`}
      >
        {/* CRT Scanline Overlay Effect */}
        <div className="pointer-events-none absolute inset-0 bg-scanlines opacity-5 z-20" />

        {/* Header Bar */}
        <div className="flex items-center justify-between border-b border-[#38342D] px-4 py-3 bg-[#191816] shrink-0 z-10">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-7 h-7 bg-[#201E1A] border border-[#dfc38c] text-[#dfc38c]">
              <Terminal className="w-4 h-4 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs uppercase tracking-widest text-[#dfc38c] font-bold">
                  VERITAS AI INQUISITOR & ARCHIVE TERMINAL
                </span>
                <span className="h-1.5 w-1.5 rounded-full bg-[#81c784] animate-ping" />
                <span className="font-mono text-[10px] text-[#81c784] uppercase">LOCAL CORE // 0-API</span>
              </div>
              <div className="font-mono text-[10px] text-[#9B958B]">
                CASE {currentCase.caseNumber}: {currentCase.title.toUpperCase()} // DISTRICT 4
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={handleClearHistory}
              className="p-1.5 text-[#9B958B] hover:text-[#dfc38c] hover:bg-[#201E1A] border border-transparent hover:border-[#38342D] transition-colors"
              title="Reset Terminal Transcript"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setIsMaximized(!isMaximized)}
              className="p-1.5 text-[#9B958B] hover:text-[#dfc38c] hover:bg-[#201E1A] border border-transparent hover:border-[#38342D] transition-colors"
              title={isMaximized ? "Restore size" : "Maximize terminal"}
            >
              {isMaximized ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-[#9B958B] hover:text-[#ffb3ad] hover:bg-[#201E1A] border border-transparent hover:border-[#a52a2a] transition-colors"
              title="Close Terminal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Persona Switcher Strip */}
        <div className="border-b border-[#38342D] bg-[#141412] px-4 py-2 flex items-center gap-2 overflow-x-auto shrink-0 z-10 scrollbar-none">
          <span className="font-mono text-[10px] text-[#9B958B] uppercase shrink-0 mr-1">
            TARGET INQUIRY:
          </span>

          {/* Archive Core Button */}
          <button
            onClick={() => {
              setSelectedPersonaId("archive");
              soundEngine.playPaperTurn();
            }}
            className={`flex items-center gap-1.5 px-3 py-1 text-xs font-mono uppercase tracking-wider shrink-0 border transition-all ${
              selectedPersonaId === "archive"
                ? "bg-[#201E1A] border-[#dfc38c] text-[#dfc38c] font-bold shadow-md"
                : "bg-transparent border-[#38342D] text-[#9B958B] hover:text-[#EAE3D5] hover:border-[#9B958B]"
            }`}
          >
            <Bot className="w-3.5 h-3.5 text-[#dfc38c]" />
            <span>ARCHIVE AI CORE</span>
          </button>

          {/* Suspect Personas */}
          {currentCase.suspects.map((s) => {
            const isSelected = selectedPersonaId === s.id;
            return (
              <button
                key={s.id}
                onClick={() => {
                  setSelectedPersonaId(s.id);
                  soundEngine.playPaperTurn();
                }}
                className={`flex items-center gap-2 px-3 py-1 text-xs font-mono uppercase tracking-wider shrink-0 border transition-all ${
                  isSelected
                    ? "bg-[#201E1A] border-[#a52a2a] text-[#ffdad7] font-bold shadow-md"
                    : "bg-transparent border-[#38342D] text-[#9B958B] hover:text-[#EAE3D5] hover:border-[#9B958B]"
                }`}
              >
                <img
                  src={s.portrait}
                  alt={s.name}
                  className="w-4 h-4 rounded-full object-cover filter grayscale contrast-125"
                />
                <span>{s.name}</span>
              </button>
            );
          })}
        </div>

        {/* Active Subject Bio Banner (if suspect) */}
        {selectedSuspect && (
          <div className="bg-[#191816]/90 border-b border-[#38342D] px-4 py-2 flex flex-wrap items-center justify-between gap-2 text-xs font-mono shrink-0">
            <div className="flex items-center gap-2">
              <span className="text-[#a52a2a] font-bold uppercase">INTERROGATING:</span>
              <span className="text-[#EAE3D5] font-bold">{selectedSuspect.name}</span>
              <span className="text-[#9B958B]">({selectedSuspect.occupation})</span>
            </div>
            <div className="text-[11px] text-[#dfc38c]">
              ALIBI CLAIM: &ldquo;{selectedSuspect.alibi.slice(0, 65)}...&rdquo;
            </div>
          </div>
        )}

        {/* Message Log Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 font-mono text-xs bg-[#0e0e0d]">
          {messages.map((m) => {
            const isUser = m.sender === "player";
            const isArchive = m.personaId === "archive";

            return (
              <div
                key={m.id}
                className={`flex flex-col ${isUser ? "items-end" : "items-start"} animate-in fade-in duration-150`}
              >
                {/* Sender Header */}
                <div className="flex items-center gap-2 mb-1 px-1">
                  <span
                    className={`text-[10px] uppercase font-bold tracking-wider ${
                      isUser
                        ? "text-[#81c784]"
                        : isArchive
                        ? "text-[#dfc38c]"
                        : "text-[#ffb3ad]"
                    }`}
                  >
                    {m.personaName}
                  </span>
                  <span className="text-[10px] text-[#5c574f]">{m.timestamp}</span>
                </div>

                {/* Message Bubble */}
                <div
                  className={`max-w-[85%] p-3.5 border whitespace-pre-wrap leading-relaxed shadow-lg ${
                    isUser
                      ? "bg-[#1f291f] border-[#2e7d32] text-[#e8f5e9]"
                      : isArchive
                      ? "bg-[#191816] border-[#dfc38c] text-[#EAE3D5]"
                      : "bg-[#201717] border-[#a52a2a] text-[#ffdad7]"
                  }`}
                >
                  {m.text}

                  {/* Unlocked Exhibit Badge */}
                  {m.unlockedEvidenceId && (
                    <div className="mt-3 pt-2.5 border-t border-[#dfc38c]/40 flex items-center justify-between gap-3 bg-[#141412] p-2">
                      <div className="flex items-center gap-2 text-[#dfc38c] font-bold">
                        <Sparkles className="w-3.5 h-3.5 animate-spin" />
                        <span>✦ NEW EXHIBIT RECOVERED: {m.unlockedEvidenceId.toUpperCase()}</span>
                      </div>
                      {onOpenEvidenceDetail && (
                        <button
                          onClick={() => onOpenEvidenceDetail(m.unlockedEvidenceId!)}
                          className="px-2 py-0.5 border border-[#dfc38c] text-[#dfc38c] hover:bg-[#dfc38c] hover:text-black transition-colors"
                        >
                          EXAMINE
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          })}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex items-center gap-2 text-[#dfc38c] animate-pulse py-2">
              <span className="w-2 h-2 rounded-full bg-[#dfc38c]" />
              <span className="font-mono text-[11px] uppercase tracking-wider">
                {currentPersonaName} IS TRANSMITTING RESPONSE...
              </span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Suggested Quick Inquiries */}
        <div className="border-t border-[#38342D] bg-[#141412] px-4 py-2 flex items-center gap-2 overflow-x-auto shrink-0 scrollbar-none">
          <span className="font-mono text-[10px] text-[#9B958B] uppercase shrink-0">
            QUICK PROMPTS:
          </span>
          {suggestedPrompts.map((p, i) => (
            <button
              key={i}
              onClick={() => handleSendMessage(p)}
              className="text-[11px] font-mono text-[#dfc38c] bg-[#1f1b14] border border-[#38342D] hover:border-[#dfc38c] px-2.5 py-1 whitespace-nowrap transition-colors shrink-0"
            >
              &ldquo;{p}&rdquo;
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div className="p-3 bg-[#191816] border-t border-[#38342D] shrink-0 z-10">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center gap-2"
          >
            <div className="relative flex-1">
              <input
                ref={inputRef}
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder={`Ask ${currentPersonaName} anything regarding the case (or demand an explanation)...`}
                className="w-full bg-[#0e0e0d] border border-[#38342D] focus:border-[#dfc38c] px-3.5 py-2.5 text-xs text-[#EAE3D5] placeholder:text-[#5c574f] font-mono focus:outline-none transition-colors"
              />
            </div>
            <button
              type="submit"
              disabled={!inputText.trim() || isTyping}
              className="px-4 py-2.5 bg-[#b39a66]/20 border border-[#dfc38c] text-[#dfc38c] hover:bg-[#dfc38c] hover:text-black font-mono text-xs uppercase tracking-wider font-bold transition-all disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1.5 shrink-0"
            >
              <span>TRANSMIT</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
