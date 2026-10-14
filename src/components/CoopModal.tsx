"use client";

import React, { useState, useEffect } from "react";
import { Case, PlayerCaseProgress } from "@/types/game";
import { soundEngine } from "@/lib/audio";
import { coopManager, CoopMember, CoopActivity, CoopSyncState } from "@/lib/coopSync";
import {
  Users,
  Radio,
  Copy,
  Check,
  LogOut,
  X,
  Shield,
  Headphones,
  Sparkles,
  Link as LinkIcon,
  Activity,
} from "lucide-react";

interface CoopModalProps {
  currentCase: Case;
  progress: PlayerCaseProgress;
  isOpen: boolean;
  onClose: () => void;
  onStateSynced?: (synced: Partial<CoopSyncState>) => void;
}

export function CoopModal({
  currentCase,
  progress,
  isOpen,
  onClose,
  onStateSynced,
}: CoopModalProps) {
  const [agentName, setAgentName] = useState(coopManager.memberName);
  const [joinCodeInput, setJoinCodeInput] = useState("");
  const [isCopied, setIsCopied] = useState(false);
  const [isLinkCopied, setIsLinkCopied] = useState(false);
  const [isConnected, setIsConnected] = useState(coopManager.isConnected);
  const [roomCode, setRoomCode] = useState(coopManager.roomCode);
  const [members, setMembers] = useState<CoopMember[]>(coopManager.members);
  const [activityFeed, setActivityFeed] = useState<CoopActivity[]>(coopManager.activityFeed);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const unsubMembers = coopManager.onMembersChange((m) => {
      setMembers(m);
      setIsConnected(coopManager.isConnected);
      setRoomCode(coopManager.roomCode);
    });

    const unsubActivity = coopManager.onActivity((act) => {
      setActivityFeed((prev) => [act, ...prev.slice(0, 20)]);
    });

    const unsubState = coopManager.onStateSync((state) => {
      if (onStateSynced) {
        onStateSynced(state);
      }
    });

    return () => {
      unsubMembers();
      unsubActivity();
      unsubState();
    };
  }, [onStateSynced]);

  if (!isOpen) return null;

  const handleCreateRoom = async () => {
    soundEngine.playClick();
    setIsLoading(true);
    setErrorMessage("");

    try {
      coopManager.setAgentName(agentName);
      const code = await coopManager.createRoom(currentCase.slug, {
        discoveredEvidenceIds: progress.discoveredEvidenceIds,
        inspectedEvidenceIds: progress.inspectedEvidenceIds,
        starredEvidenceIds: progress.starredEvidenceIds,
        playerNotes: progress.playerNotes,
        connections: progress.connections,
        askedQuestionIds: progress.askedQuestionIds,
      });

      setRoomCode(code);
      setIsConnected(true);
      soundEngine.playEvidenceDiscovered();
    } catch (err: any) {
      setErrorMessage(err.message || "Failed to create room");
    } finally {
      setIsLoading(false);
    }
  };

  const handleJoinRoom = async () => {
    if (!joinCodeInput.trim()) return;
    soundEngine.playClick();
    setIsLoading(true);
    setErrorMessage("");

    try {
      coopManager.setAgentName(agentName);
      await coopManager.joinRoom(joinCodeInput);
      setRoomCode(coopManager.roomCode);
      setIsConnected(true);
      soundEngine.playEvidenceDiscovered();
    } catch (err: any) {
      setErrorMessage(err.message || "Could not connect to room");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyCode = () => {
    if (!roomCode) return;
    soundEngine.playClick();
    navigator.clipboard.writeText(roomCode);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleCopyInviteLink = () => {
    if (!roomCode || typeof window === "undefined") return;
    soundEngine.playClick();
    const url = `${window.location.origin}/cases/${currentCase.slug}?room=${roomCode}`;
    navigator.clipboard.writeText(url);
    setIsLinkCopied(true);
    setTimeout(() => setIsLinkCopied(false), 2000);
  };

  const handleLeaveRoom = () => {
    soundEngine.playPaperTurn();
    coopManager.leaveRoom();
    setIsConnected(false);
    setRoomCode(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-[#141412] border-2 border-[#dfc38c] shadow-2xl flex flex-col overflow-hidden text-[#EAE3D5] font-sans">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#38342D] px-6 py-4 bg-[#191816]">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-8 h-8 bg-[#201E1A] border border-[#dfc38c] text-[#dfc38c]">
              <Radio className="w-4 h-4 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs uppercase tracking-widest text-[#dfc38c] font-bold">
                  CO-OP SQUAD HEADQUARTERS
                </span>
                <span className="bg-[#2e7d32]/30 text-[#81c784] font-mono text-[9px] px-2 py-0.5 border border-[#2e7d32] uppercase font-bold">
                  2–4 DETECTIVES
                </span>
              </div>
              <p className="font-mono text-[10px] text-[#9B958B]">
                REAL-TIME INVESTIGATION SYNCHRONIZATION // DISCORD COMPATIBLE
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-[#9B958B] hover:text-[#ffdad7] hover:bg-[#201E1A] border border-transparent hover:border-[#a52a2a] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Discord Collaboration Callout Banner */}
        <div className="bg-[#1f1b29] border-b border-[#5865F2]/40 px-6 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Headphones className="w-5 h-5 text-[#5865F2] shrink-0" />
            <div className="text-xs">
              <span className="text-white font-bold block">Discord Voice Play Recommended</span>
              <span className="text-[#cdc5bb] text-[11px]">
                Hop on a Discord voice channel with your detective squad. Work done on any screen reflects instantly for all members.
              </span>
            </div>
          </div>
          <span className="bg-[#5865F2]/20 border border-[#5865F2] text-[#9da6ff] font-mono text-[10px] px-2 py-1 font-bold shrink-0">
            DISCORD READY
          </span>
        </div>

        {/* Body Content */}
        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          {/* Agent Callsign Input */}
          <div>
            <label className="block font-mono text-xs uppercase tracking-wider text-[#9B958B] mb-1.5">
              YOUR DETECTIVE CALLSIGN:
            </label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={agentName}
                onChange={(e) => {
                  setAgentName(e.target.value);
                  coopManager.setAgentName(e.target.value);
                }}
                maxLength={20}
                placeholder="e.g. Detective Tushar"
                className="w-full max-w-sm bg-[#0e0e0d] border border-[#38342D] focus:border-[#dfc38c] px-3.5 py-2 text-xs font-mono text-[#EAE3D5] focus:outline-none"
              />
            </div>
          </div>

          {errorMessage && (
            <div className="bg-[#a52a2a]/20 border border-[#a52a2a] p-3 text-xs font-mono text-[#ffb3ad]">
              {errorMessage}
            </div>
          )}

          {!isConnected ? (
            /* Join / Create Interface */
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              {/* Option A: Create Room */}
              <div className="bg-[#191816] border border-[#38342D] p-5 flex flex-col justify-between space-y-4 hover:border-[#dfc38c] transition-colors">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Shield className="w-4 h-4 text-[#dfc38c]" />
                    <span className="font-mono text-xs text-[#dfc38c] font-bold uppercase tracking-wider">
                      HOST NEW SQUAD
                    </span>
                  </div>
                  <h4 className="font-serif text-base font-bold text-[#EAE3D5]">
                    Lead the Investigation
                  </h4>
                  <p className="font-sans text-xs text-[#9B958B] mt-1 leading-relaxed">
                    Generate an official squad room code for &ldquo;{currentCase.title}&rdquo;. Your current clues, notes, and corkboard will be shared with joining detectives.
                  </p>
                </div>

                <button
                  onClick={handleCreateRoom}
                  disabled={isLoading}
                  className="w-full py-2.5 bg-[#b39a66]/20 border border-[#dfc38c] text-[#dfc38c] hover:bg-[#dfc38c] hover:text-black font-mono text-xs uppercase tracking-wider font-bold transition-all disabled:opacity-50"
                >
                  {isLoading ? "INITIALIZING ROOM..." : "CREATE SQUAD ROOM (HOST)"}
                </button>
              </div>

              {/* Option B: Join Room */}
              <div className="bg-[#191816] border border-[#38342D] p-5 flex flex-col justify-between space-y-4 hover:border-[#dfc38c] transition-colors">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Users className="w-4 h-4 text-[#81c784]" />
                    <span className="font-mono text-xs text-[#81c784] font-bold uppercase tracking-wider">
                      JOIN EXISTING SQUAD
                    </span>
                  </div>
                  <h4 className="font-serif text-base font-bold text-[#EAE3D5]">
                    Enter Squad Dispatch Code
                  </h4>
                  <p className="font-sans text-xs text-[#9B958B] mt-1 leading-relaxed">
                    Enter the 6-character room code provided by your host detective to link your terminals.
                  </p>
                </div>

                <div className="space-y-2">
                  <input
                    type="text"
                    value={joinCodeInput}
                    onChange={(e) => setJoinCodeInput(e.target.value.toUpperCase())}
                    placeholder="e.g. ALIBI-4921"
                    className="w-full bg-[#0e0e0d] border border-[#38342D] focus:border-[#81c784] px-3.5 py-2 text-xs font-mono uppercase text-center tracking-widest text-[#EAE3D5] focus:outline-none"
                  />
                  <button
                    onClick={handleJoinRoom}
                    disabled={isLoading || !joinCodeInput.trim()}
                    className="w-full py-2.5 bg-[#2e7d32]/20 border border-[#2e7d32] text-[#81c784] hover:bg-[#2e7d32] hover:text-white font-mono text-xs uppercase tracking-wider font-bold transition-all disabled:opacity-50"
                  >
                    {isLoading ? "CONNECTING..." : "CONNECT TO SQUAD ROOM"}
                  </button>
                </div>
              </div>
            </div>
          ) : (
            /* Active Connected Room Dashboard */
            <div className="space-y-5">
              {/* Room Code & Share Strip */}
              <div className="bg-[#191816] border border-[#dfc38c] p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="font-mono text-[10px] text-[#9B958B] uppercase tracking-wider block">
                    ACTIVE SQUAD DISPATCH CODE
                  </span>
                  <div className="font-mono text-2xl font-bold tracking-widest text-[#dfc38c] mt-0.5">
                    {roomCode}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCopyCode}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-[#201E1A] border border-[#38342D] hover:border-[#dfc38c] font-mono text-xs text-[#dfc38c] uppercase transition-colors"
                  >
                    {isCopied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{isCopied ? "COPIED" : "COPY CODE"}</span>
                  </button>
                  <button
                    onClick={handleCopyInviteLink}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-[#b39a66]/20 border border-[#dfc38c] hover:bg-[#dfc38c] hover:text-black font-mono text-xs text-[#dfc38c] uppercase font-bold transition-colors"
                  >
                    {isLinkCopied ? <Check className="w-3.5 h-3.5" /> : <LinkIcon className="w-3.5 h-3.5" />}
                    <span>{isLinkCopied ? "LINK COPIED" : "COPY INVITE LINK"}</span>
                  </button>
                </div>
              </div>

              {/* Connected Detectives Roster */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-xs uppercase tracking-wider text-[#9B958B]">
                    DETECTIVE SQUAD ROSTER ({members.length || 1} / 4 DETECTIVES)
                  </span>
                  <span className="font-mono text-[10px] text-[#81c784] flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-[#81c784] animate-pulse" />
                    LIVE SYNC ACTIVE
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {[0, 1, 2, 3].map((slotIdx) => {
                    const member = members[slotIdx];
                    const isSelf = member?.id === coopManager.memberId;

                    return (
                      <div
                        key={slotIdx}
                        className={`p-3 border flex items-center justify-between ${
                          member
                            ? "bg-[#201E1A] border-[#38342D]"
                            : "bg-[#141412]/50 border-dashed border-[#38342D]/50 opacity-50"
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <div
                            className={`w-6 h-6 flex items-center justify-center font-mono text-[11px] font-bold ${
                              member ? "bg-[#dfc38c] text-black" : "bg-[#201E1A] text-[#9B958B]"
                            }`}
                          >
                            {slotIdx + 1}
                          </div>
                          <div>
                            <div className="font-mono text-xs font-bold text-[#EAE3D5]">
                              {member ? member.name : "Waiting for detective..."}
                            </div>
                            <div className="font-mono text-[10px] text-[#9B958B]">
                              {member
                                ? member.isHost
                                  ? "Squad Host"
                                  : isSelf
                                  ? "You"
                                  : "Investigator"
                                : "Empty Slot"}
                            </div>
                          </div>
                        </div>

                        {member && isSelf && (
                          <span className="font-mono text-[9px] bg-[#81c784]/20 border border-[#81c784] text-[#81c784] px-1.5 py-0.5 uppercase">
                            YOU
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Live Squad Activity Feed */}
              <div>
                <div className="flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider text-[#9B958B] mb-2">
                  <Activity className="w-3.5 h-3.5 text-[#dfc38c]" />
                  <span>SQUAD ACTIVITY FEED</span>
                </div>

                <div className="bg-[#0e0e0d] border border-[#38342D] p-3 max-h-36 overflow-y-auto space-y-1.5 font-mono text-[11px]">
                  {activityFeed.length === 0 ? (
                    <div className="text-[#5c574f] italic">
                      No actions recorded yet. When any teammate pins a clue or questions a suspect, it will log here.
                    </div>
                  ) : (
                    activityFeed.map((act) => (
                      <div key={act.id} className="flex items-center justify-between text-[#cdc5bb]">
                        <div>
                          <strong className="text-[#dfc38c]">{act.agentName}:</strong> {act.text}
                        </div>
                        <span className="text-[10px] text-[#5c574f] shrink-0 ml-2">
                          {act.timestamp}
                        </span>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Disconnect Button */}
              <div className="pt-2 border-t border-[#38342D] flex justify-end">
                <button
                  onClick={handleLeaveRoom}
                  className="flex items-center gap-1.5 px-4 py-2 bg-[#201717] border border-[#a52a2a] text-[#ffdad7] hover:bg-[#a52a2a] hover:text-white font-mono text-xs uppercase tracking-wider transition-colors"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>DISCONNECT FROM SQUAD</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
