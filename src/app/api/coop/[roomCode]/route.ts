import { NextRequest, NextResponse } from "next/server";

// Persistent global store across Turbopack / Next.js serverless route re-evaluations
interface RoomMember {
  id: string;
  name: string;
  role?: string;
  lastSeen: number;
}

interface RoomState {
  roomCode: string;
  caseSlug: string;
  hostName: string;
  lastUpdated: number;
  members: RoomMember[];
  state: {
    discoveredEvidenceIds: string[];
    inspectedEvidenceIds: string[];
    starredEvidenceIds: string[];
    playerNotes: Record<string, string>;
    connections: any[];
    askedQuestionIds: string[];
  };
  activityFeed: Array<{ id: string; agentName: string; text: string; timestamp: string }>;
}

const g = globalThis as unknown as {
  __LAST_ALIBI_COOP_ROOMS?: Map<string, RoomState>;
};

if (!g.__LAST_ALIBI_COOP_ROOMS) {
  g.__LAST_ALIBI_COOP_ROOMS = new Map<string, RoomState>();
}

const ROOMS = g.__LAST_ALIBI_COOP_ROOMS;

function normalizeCode(raw: string): string {
  const cleaned = raw.toUpperCase().replace(/[^A-Z0-9]/g, "");
  if (!cleaned.startsWith("ALIBI")) {
    return `ALIBI-${cleaned}`;
  }
  if (!cleaned.includes("-")) {
    return `ALIBI-${cleaned.replace("ALIBI", "")}`;
  }
  return cleaned;
}

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ roomCode: string }> }
) {
  const { roomCode } = await params;
  const upperCode = normalizeCode(roomCode);
  const room = ROOMS.get(upperCode);

  if (!room) {
    return NextResponse.json({ error: "Room not found" }, { status: 404 });
  }

  // Filter out members not seen in 60 seconds
  const now = Date.now();
  room.members = room.members.filter((m) => now - m.lastSeen < 60000);

  return NextResponse.json({ success: true, room });
}

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ roomCode: string }> }
) {
  const { roomCode } = await params;
  const upperCode = normalizeCode(roomCode);
  let body: any = {};
  try {
    body = await req.json();
  } catch (e) {
    // empty body
  }

  const { action, member, caseSlug, state, activity } = body;
  const now = Date.now();

  let room = ROOMS.get(upperCode);

  if (action === "create" || !room) {
    if (action === "create" || !room) {
      room = {
        roomCode: upperCode,
        caseSlug: caseSlug || "",
        hostName: member?.name || "Host Detective",
        lastUpdated: now,
        members: [{ id: member?.id || "host", name: member?.name || "Host Detective", role: "Lead Detective", lastSeen: now }],
        state: state || {
          discoveredEvidenceIds: [],
          inspectedEvidenceIds: [],
          starredEvidenceIds: [],
          playerNotes: {},
          connections: [],
          askedQuestionIds: [],
        },
        activityFeed: [
          {
            id: `act-${now}`,
            agentName: member?.name || "Host",
            text: `Formed Investigation Squad [${upperCode}]`,
            timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          },
        ],
      };
      ROOMS.set(upperCode, room);
      return NextResponse.json({ success: true, room });
    }
  }

  // Update or add member presence
  if (member) {
    const existing = room.members.find((m) => m.id === member.id);
    if (existing) {
      existing.lastSeen = now;
      if (member.name) existing.name = member.name;
    } else {
      if (room.members.length >= 4) {
        return NextResponse.json({ error: "Room is at capacity (max 4 detectives)" }, { status: 403 });
      }
      const roles = ["Forensic Specialist", "Profiler", "Evidence Tech"];
      const assignedRole = roles[room.members.length - 1] || "Detective";
      room.members.push({
        id: member.id,
        name: member.name || "Detective",
        role: assignedRole,
        lastSeen: now,
      });
      room.activityFeed.unshift({
        id: `act-${now}-${Math.random()}`,
        agentName: member.name || "Detective",
        text: `Joined the investigation squad`,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      });
    }
  }

  // Merge state updates
  if (state) {
    room.state = {
      ...room.state,
      ...state,
      discoveredEvidenceIds: Array.from(
        new Set([...(room.state.discoveredEvidenceIds || []), ...(state.discoveredEvidenceIds || [])])
      ),
      inspectedEvidenceIds: Array.from(
        new Set([...(room.state.inspectedEvidenceIds || []), ...(state.inspectedEvidenceIds || [])])
      ),
      starredEvidenceIds: state.starredEvidenceIds ?? room.state.starredEvidenceIds,
      playerNotes: { ...(room.state.playerNotes || {}), ...(state.playerNotes || {}) },
      connections: state.connections ?? room.state.connections,
      askedQuestionIds: Array.from(
        new Set([...(room.state.askedQuestionIds || []), ...(state.askedQuestionIds || [])])
      ),
    };
    room.lastUpdated = now;
  }

  // Add activity log
  if (activity) {
    room.activityFeed.unshift({
      id: `act-${now}-${Math.random().toString(36).substring(2, 7)}`,
      agentName: activity.agentName || "Detective",
      text: activity.text,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    });
    if (room.activityFeed.length > 40) room.activityFeed.pop();
  }

  return NextResponse.json({ success: true, room });
}
