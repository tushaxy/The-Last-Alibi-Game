"use client";

import React, { useState, useRef, useEffect } from "react";
import { Case, BoardConnection } from "@/types/game";
import { soundEngine } from "@/lib/audio";
import { Share2, Plus, Trash2, RotateCcw, Link2, AlertTriangle, Check, User, Search } from "lucide-react";

interface ConnectionBoardProps {
  currentCase: Case;
  discoveredEvidenceIds: string[];
  connections: BoardConnection[];
  onAddConnection: (conn: BoardConnection) => void;
  onRemoveConnection: (id: string) => void;
  onResetBoard: () => void;
  onOpenEvidenceDetail: (evidenceId: string) => void;
}

interface BoardNode {
  id: string;
  type: "suspect" | "evidence";
  title: string;
  image?: string;
  tag: string;
  x: number;
  y: number;
}

export function ConnectionBoard({
  currentCase,
  discoveredEvidenceIds,
  connections,
  onAddConnection,
  onRemoveConnection,
  onResetBoard,
  onOpenEvidenceDetail,
}: ConnectionBoardProps) {
  // Local state for dragging nodes
  const [nodes, setNodes] = useState<BoardNode[]>([]);
  const [selectedSourceId, setSelectedSourceId] = useState<string | null>(null);
  const [connectLabel, setConnectLabel] = useState("");
  const [isContradictionLink, setIsContradictionLink] = useState(false);
  const [draggingNodeId, setDraggingNodeId] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const boardRef = useRef<HTMLDivElement>(null);

  // Initialize nodes layout
  useEffect(() => {
    const initialNodes: BoardNode[] = [];

    // Add Suspects (top row)
    currentCase.suspects.forEach((sus, idx) => {
      initialNodes.push({
        id: sus.id,
        type: "suspect",
        title: sus.name,
        image: sus.portrait,
        tag: sus.occupation,
        x: 60 + idx * 210,
        y: 50,
      });
    });

    // Add Discovered Evidence (bottom rows)
    const discoveredList = currentCase.evidence.filter((e) =>
      discoveredEvidenceIds.includes(e.id)
    );
    discoveredList.forEach((ev, idx) => {
      const col = idx % 4;
      const row = Math.floor(idx / 4);
      initialNodes.push({
        id: ev.id,
        type: "evidence",
        title: ev.title,
        image: ev.image,
        tag: `EXHIBIT ${ev.id.toUpperCase()}`,
        x: 60 + col * 210,
        y: 280 + row * 180,
      });
    });

    setNodes(initialNodes);
  }, [currentCase, discoveredEvidenceIds]);

  // Handle Dragging
  const handleMouseDown = (nodeId: string, e: React.MouseEvent) => {
    if (boardRef.current) {
      const rect = boardRef.current.getBoundingClientRect();
      const node = nodes.find((n) => n.id === nodeId);
      if (node) {
        setDraggingNodeId(nodeId);
        setDragOffset({
          x: e.clientX - rect.left - node.x,
          y: e.clientY - rect.top - node.y,
        });
      }
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (draggingNodeId && boardRef.current) {
      const rect = boardRef.current.getBoundingClientRect();
      const newX = Math.max(10, Math.min(rect.width - 180, e.clientX - rect.left - dragOffset.x));
      const newY = Math.max(10, Math.min(rect.height - 130, e.clientY - rect.top - dragOffset.y));

      setNodes((prev) =>
        prev.map((n) => (n.id === draggingNodeId ? { ...n, x: newX, y: newY } : n))
      );
    }
  };

  const handleMouseUp = () => {
    setDraggingNodeId(null);
  };

  // Node Click: Link creation
  const handleNodeClick = (nodeId: string) => {
    if (!selectedSourceId) {
      setSelectedSourceId(nodeId);
      soundEngine.playClick();
    } else if (selectedSourceId === nodeId) {
      setSelectedSourceId(null);
    } else {
      // Connect selectedSourceId to nodeId
      const newConn: BoardConnection = {
        id: `conn-${Date.now()}`,
        fromId: selectedSourceId,
        toId: nodeId,
        label: connectLabel || (isContradictionLink ? "Contradiction" : "Corroborates"),
        isContradiction: isContradictionLink,
      };
      soundEngine.playEvidenceDiscovered();
      onAddConnection(newConn);
      setSelectedSourceId(null);
      setConnectLabel("");
    }
  };

  return (
    <div className="space-y-4">
      {/* Header & Controls Bar */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#38342D] pb-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="font-mono text-xs uppercase tracking-widest text-[#a52a2a] font-bold">
              TACTICAL MURDER BOARD
            </span>
            <span className="h-1.5 w-1.5 rounded-full bg-[#a52a2a]" />
            <span className="font-mono text-xs text-[#9B958B]">
              FORENSIC RED STRING HYPOTHESIS ENGINE
            </span>
          </div>
          <h2 className="font-serif text-2xl lg:text-3xl text-[#EAE3D5]">
            Investigation Corkboard
          </h2>
          <p className="font-sans text-xs text-[#9B958B] mt-1">
            Drag tokens across the canvas. Click one item then another to pin red strings linking suspects to incriminating exhibits.
          </p>
        </div>

        {/* Link creation helpers */}
        <div className="flex flex-wrap items-center gap-2">
          <input
            type="text"
            placeholder="Connection note (e.g. Alibi Flaw)..."
            value={connectLabel}
            onChange={(e) => setConnectLabel(e.target.value)}
            className="px-2.5 py-1.5 bg-[#201E1A] border border-[#38342D] text-xs font-mono text-[#EAE3D5] placeholder-[#9B958B] focus:border-[#dfc38c] focus:outline-none w-48"
          />

          <button
            onClick={() => setIsContradictionLink(!isContradictionLink)}
            className={`px-2.5 py-1.5 font-mono text-xs border uppercase tracking-wider transition-colors flex items-center gap-1 ${
              isContradictionLink
                ? "bg-[#a52a2a] border-[#ffb3ad] text-white font-bold"
                : "bg-[#201E1A] border-[#38342D] text-[#9B958B] hover:text-[#EAE3D5]"
            }`}
          >
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>{isContradictionLink ? "FATAL FLAW" : "NORMAL LINK"}</span>
          </button>

          <button
            onClick={onResetBoard}
            className="p-1.5 bg-[#201E1A] border border-[#38342D] text-[#9B958B] hover:text-[#EAE3D5] hover:border-[#dfc38c] transition-colors"
            title="Reset Board Layout"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {selectedSourceId && (
        <div className="bg-[#a52a2a]/20 border border-[#a52a2a] p-2 text-xs font-mono text-[#ffb3ad] flex items-center justify-between">
          <span>
            ✦ PINNING ACTIVE: Click a second card to tie the red string to &ldquo;
            {nodes.find((n) => n.id === selectedSourceId)?.title}&rdquo;.
          </span>
          <button
            onClick={() => setSelectedSourceId(null)}
            className="text-xs uppercase underline hover:text-white"
          >
            Cancel
          </button>
        </div>
      )}

      {/* Main Canvas Area */}
      <div
        ref={boardRef}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        className="relative w-full h-[620px] bg-[#141311] border-2 border-[#38342D] overflow-hidden select-none bg-grain shadow-inner"
      >
        {/* SVG Vector Paths for Red Strings */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
          {connections.map((conn) => {
            const fromNode = nodes.find((n) => n.id === conn.fromId);
            const toNode = nodes.find((n) => n.id === conn.toId);
            if (!fromNode || !toNode) return null;

            const x1 = fromNode.x + 85;
            const y1 = fromNode.y + 40;
            const x2 = toNode.x + 85;
            const y2 = toNode.y + 40;

            const midX = (x1 + x2) / 2;
            const midY = (y1 + y2) / 2;

            return (
              <g key={conn.id}>
                {/* Red String Shadow */}
                <line
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke="rgba(0,0,0,0.7)"
                  strokeWidth="3"
                />
                {/* Red String Vector */}
                <line
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke={conn.isContradiction ? "#ff5252" : "#a52a2a"}
                  strokeWidth="2.5"
                  strokeDasharray={conn.isContradiction ? "6 3" : undefined}
                />
                {/* Brass Anchors */}
                <circle cx={x1} cy={y1} r="4" fill="#dfc38c" stroke="#10100F" strokeWidth="1.5" />
                <circle cx={x2} cy={y2} r="4" fill="#dfc38c" stroke="#10100F" strokeWidth="1.5" />

                {/* Connection Label Note */}
                <rect
                  x={midX - 35}
                  y={midY - 10}
                  width="70"
                  height="18"
                  fill="#191816"
                  stroke={conn.isContradiction ? "#a52a2a" : "#38342D"}
                  strokeWidth="1"
                />
                <text
                  x={midX}
                  y={midY + 3}
                  textAnchor="middle"
                  fill={conn.isContradiction ? "#ffb3ad" : "#dfc38c"}
                  fontSize="9"
                  fontFamily="monospace"
                >
                  {conn.label.slice(0, 12)}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Board Token Cards */}
        {nodes.map((node) => {
          const isSelected = selectedSourceId === node.id;
          return (
            <div
              key={node.id}
              style={{ left: `${node.x}px`, top: `${node.y}px` }}
              onMouseDown={(e) => handleMouseDown(node.id, e)}
              onClick={() => handleNodeClick(node.id)}
              className={`absolute w-44 p-2.5 bg-[#201E1A] border shadow-2xl cursor-grab active:cursor-grabbing z-20 transition-shadow ${
                isSelected
                  ? "border-[#ffb3ad] ring-2 ring-[#a52a2a] shadow-[#a52a2a]/30"
                  : node.type === "suspect"
                  ? "border-[#dfc38c] hover:border-[#ffb3ad]"
                  : "border-[#38342D] hover:border-[#dfc38c]"
              }`}
            >
              {/* Brass Pushpin */}
              <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-[#dfc38c] border border-black shadow" />

              <div className="flex items-center gap-2 mb-1.5 mt-1">
                {node.image && (
                  <img
                    src={node.image}
                    alt={node.title}
                    className="w-8 h-8 object-cover border border-[#38342D] shrink-0"
                  />
                )}
                <div className="min-w-0">
                  <span className="font-mono text-[9px] text-[#9B958B] uppercase block truncate">
                    {node.tag}
                  </span>
                  <div className="font-serif text-xs font-bold text-[#EAE3D5] truncate leading-tight">
                    {node.title}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Connected Links Manager Table */}
      {connections.length > 0 && (
        <div className="bg-[#191816] border border-[#38342D] p-4 space-y-3">
          <div className="font-mono text-xs uppercase tracking-wider text-[#dfc38c] flex items-center justify-between">
            <span>ACTIVE INVESTIGATIVE CONNECTIONS ({connections.length})</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
            {connections.map((conn) => {
              const fromN = nodes.find((n) => n.id === conn.fromId);
              const toN = nodes.find((n) => n.id === conn.toId);

              return (
                <div
                  key={conn.id}
                  className="p-2 bg-[#201E1A] border border-[#38342D] flex items-center justify-between text-xs font-mono"
                >
                  <div className="truncate mr-2">
                    <span className="text-[#EAE3D5]">{fromN?.title || conn.fromId}</span>
                    <span className="text-[#a52a2a] mx-1">⟷</span>
                    <span className="text-[#EAE3D5]">{toN?.title || conn.toId}</span>
                    <div className="text-[10px] text-[#dfc38c]">{conn.label}</div>
                  </div>
                  <button
                    onClick={() => onRemoveConnection(conn.id)}
                    className="p-1 text-[#9B958B] hover:text-[#ffb3ad] transition-colors"
                    title="Remove connection"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
