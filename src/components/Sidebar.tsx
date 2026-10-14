"use client";

import React from "react";
import Link from "next/link";
import {
  FolderOpen,
  Share2,
  Users,
  Search,
  MessageSquare,
  Compass,
  AlertOctagon,
  Clock,
  CheckCircle2,
  Archive,
  BookOpen,
} from "lucide-react";

export type TabType =
  | "overview"
  | "scene"
  | "evidence"
  | "interrogation"
  | "board"
  | "timeline"
  | "scanner"
  | "accusation";

interface SidebarProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
  caseSlug?: string;
  evidenceCount?: { discovered: number; total: number };
  interrogationCount?: { answered: number; total: number };
  isSolved?: boolean;
}

export function Sidebar({
  activeTab,
  onTabChange,
  caseSlug,
  evidenceCount,
  interrogationCount,
  isSolved,
}: SidebarProps) {
  const navItems: { id: TabType; label: string; icon: React.ReactNode; badge?: string }[] = [
    {
      id: "overview",
      label: "Case Dossier",
      icon: <FolderOpen className="w-4 h-4" />,
    },
    {
      id: "scene",
      label: "Crime Scene",
      icon: <Compass className="w-4 h-4" />,
    },
    {
      id: "evidence",
      label: "Evidence Locker",
      icon: <Search className="w-4 h-4" />,
      badge: evidenceCount ? `${evidenceCount.discovered}/${evidenceCount.total}` : undefined,
    },
    {
      id: "interrogation",
      label: "Interrogations",
      icon: <MessageSquare className="w-4 h-4" />,
      badge: interrogationCount ? `${interrogationCount.answered}/${interrogationCount.total}` : undefined,
    },
    {
      id: "board",
      label: "Connection Board",
      icon: <Share2 className="w-4 h-4" />,
    },
    {
      id: "timeline",
      label: "Chronology Timeline",
      icon: <Clock className="w-4 h-4" />,
    },
    {
      id: "scanner",
      label: "Contradiction Scanner",
      icon: <AlertOctagon className="w-4 h-4" />,
    },
    {
      id: "accusation",
      label: "Submit Accusation",
      icon: <CheckCircle2 className="w-4 h-4" />,
      badge: isSolved ? "SOLVED" : undefined,
    },
  ];

  return (
    <aside className="w-64 bg-[#0e0e0d] border-r border-[#38342D] flex flex-col justify-between py-4 shadow-[1px_0_12px_rgba(0,0,0,0.4)] shrink-0 select-none">
      <div className="flex flex-col gap-6">
        {/* Tactical Desk Navigation */}
        <div className="px-3">
          <div className="font-mono text-[10px] text-[#9B958B] uppercase tracking-widest px-3 mb-2 flex items-center justify-between">
            <span>TACTICAL DESK</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#dfc38c]" />
          </div>

          <nav className="flex flex-col gap-1">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onTabChange(item.id)}
                  className={`flex items-center justify-between px-3 py-2 text-xs font-mono transition-all text-left ${
                    isActive
                      ? "bg-[#2a2a29] text-[#EAE3D5] border-l-2 border-[#a52a2a] font-semibold"
                      : "text-[#9B958B] hover:bg-[#201E1A] hover:text-[#EAE3D5]"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className={isActive ? "text-[#ffb3ad]" : "text-[#dfc38c]"}>
                      {item.icon}
                    </span>
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span
                      className={`text-[10px] px-1.5 py-0.5 rounded-none font-bold ${
                        item.badge === "SOLVED"
                          ? "bg-[#2e7d32]/30 text-[#81c784] border border-[#2e7d32]"
                          : isActive
                          ? "bg-[#a52a2a]/30 text-[#ffb3ad]"
                          : "bg-[#201E1A] text-[#9B958B]"
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Case Repository Section */}
        <div className="px-3 border-t border-[#38342D] pt-4">
          <div className="font-mono text-[10px] text-[#9B958B] uppercase tracking-widest px-3 mb-2">
            ARCHIVE REPOSITORY
          </div>
          <nav className="flex flex-col gap-1">
            <Link
              href="/"
              className="flex items-center gap-2.5 px-3 py-2 text-xs font-mono text-[#9B958B] hover:bg-[#201E1A] hover:text-[#EAE3D5] transition-all"
            >
              <Archive className="w-4 h-4 text-[#dfc38c]" />
              <span>Case Archives</span>
            </Link>
            <Link
              href="/#how-to-investigate"
              className="flex items-center gap-2.5 px-3 py-2 text-xs font-mono text-[#9B958B] hover:bg-[#201E1A] hover:text-[#EAE3D5] transition-all"
            >
              <BookOpen className="w-4 h-4 text-[#dfc38c]" />
              <span>Detective Manual</span>
            </Link>
          </nav>
        </div>
      </div>

      {/* Jurisdiction Footer Badge */}
      <div className="px-4 pt-4 border-t border-[#38342D]">
        <div className="p-3 bg-[#201E1A] border border-[#38342D] flex flex-col gap-1">
          <span className="font-mono text-[10px] text-[#dfc38c] uppercase tracking-widest font-bold">
            JURISDICTION
          </span>
          <span className="font-mono text-[11px] text-[#EAE3D5] leading-tight">
            DISTRICT 4 SPECIAL INVESTIGATIONS UNIT
          </span>
        </div>
      </div>
    </aside>
  );
}
