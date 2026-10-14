import React from "react";

export function Footer() {
  return (
    <footer className="w-full bg-[#0e0e0d]/95 backdrop-blur-md border-t border-[#38342D] py-4 px-4 lg:px-8 mt-auto z-30 shadow-[0_-1px_8px_rgba(0,0,0,0.5)]">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2 text-[#9B958B] font-mono text-xs">
        <span className="tracking-wider uppercase font-bold text-[#EAE3D5] hover:text-[#ffb3ad] transition-colors">
          MADE BY @TUSHAR
        </span>
        <span className="tracking-widest uppercase text-center text-[#dfc38c]">
          THE LAST ALIBI — AN INTERACTIVE DETECTIVE EXPERIENCE
        </span>
        <span className="text-[#cdc5bb] uppercase tracking-wider text-[11px] bg-[#201E1A] px-2.5 py-1 rounded border border-[#38342D]">
          CLEARANCE: LEVEL 5 CONFIDENTIAL
        </span>
      </div>
    </footer>
  );
}
