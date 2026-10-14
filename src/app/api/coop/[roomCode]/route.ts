import { NextRequest, NextResponse } from "next/server";

// In-memory lightweight room store for Co-Op sessions
interface RoomState {
  roomCode: string;
  caseSlug: string;
  hostName: string;
  lastUpdated: number;
  members: Array<{ id: string; name: string; lastSeen: number }>;
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

const ROOMS = new Map<string, RoomState>();

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ roomCode: string }> }
) {
  const { roomCode } = await params;
  const upperCode = roomCode.toUpperCase();
  const room = ROOMS.get(upperCode);

  if (!room) {
    return NextResponse.json({ error: "Room not found" }, { status: 404 });
  }

  // Filter out members not seen in 45 seconds
  const now = Date.now();
  room.members = room.members.filter((m) => now - m.lastSeen < 45000);

  return NextResponse.json({ success: true, room });
}

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ roomCode: string }> }
) {
  const { roomCode } = await params;
  const upperCode = roomCode.toUpperCase();
  const body = await req.json();

  const { action, member, caseSlug, state, activity } = body;
  const now = Date.now();

  let room = ROOMS.get(upperCode);

  if (action === "create") {
    room = {
      roomCode: upperCode,
      caseSlug: caseSlug || "",
      hostName: member?.name || "Host Detective",
      lastUpdated: now,
      members: [{ id: member.id, name: member.name, lastSeen: now }],
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
          text: `Established Co-Op Investigation Room [${upperCode}]`,
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ],
    };
    ROOMS.set(upperCode, room);
    return NextResponse.json({ success: true, room });
  }

  if (!room) {
    return NextResponse.json({ error: "Room does not exist" }, { status: 404 });
  }

  // Update member presence
  if (member) {
    const existing = room.members.find((m) => m.id === member.id);
    if (existing) {
      existing.lastSeen = now;
      existing.name = member.name;
    } else {
      if (room.members.length >= 4) {
        return NextResponse.json({ error: "Room is at maximum capacity (4 detectives)" }, { status: 403 });
      }
      room.members.push({ id: member.id, name: member.name, lastSeen: now });
      room.activityFeed.push({
        id: `act-${now}`,
        agentName: member.name,
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
      id: `act-${now}-${Math.random()}`,
      agentName: activity.agentName,
      text: activity.text,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    });
    if (room.activityFeed.length > 30) room.activityFeed.pop();
  }

  return NextResponse.json({ success: true, room });
}
