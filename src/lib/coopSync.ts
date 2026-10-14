"use client";

import { BoardConnection, PlayerCaseProgress } from "@/types/game";

export interface CoopMember {
  id: string;
  name: string;
  isHost?: boolean;
}

export interface CoopActivity {
  id: string;
  agentName: string;
  text: string;
  timestamp: string;
}

export interface CoopSyncState {
  discoveredEvidenceIds: string[];
  inspectedEvidenceIds: string[];
  starredEvidenceIds: string[];
  playerNotes: Record<string, string>;
  connections: BoardConnection[];
  askedQuestionIds: string[];
}

export type CoopAction =
  | { type: "DISCOVER_EVIDENCE"; evidenceId: string; agentName: string }
  | { type: "INSPECT_EVIDENCE"; evidenceId: string; agentName: string }
  | { type: "TOGGLE_STAR"; evidenceId: string; agentName: string }
  | { type: "SAVE_NOTE"; id: string; note: string; agentName: string }
  | { type: "UPDATE_CONNECTIONS"; connections: BoardConnection[]; agentName: string }
  | { type: "ASK_QUESTION"; questionId: string; agentName: string }
  | { type: "STATE_SYNC"; state: Partial<CoopSyncState>; agentName: string };

type StateListener = (state: Partial<CoopSyncState>, author: string) => void;
type ActivityListener = (activity: CoopActivity) => void;
type MembersListener = (members: CoopMember[]) => void;

class CoopSyncManager {
  public roomCode: string | null = null;
  public memberId: string = "";
  public memberName: string = "Detective";
  public isHost: boolean = false;
  public isConnected: boolean = false;
  public members: CoopMember[] = [];
  public activityFeed: CoopActivity[] = [];

  private broadcastChannel: BroadcastChannel | null = null;
  private pollInterval: NodeJS.Timeout | null = null;
  private stateListeners: Set<StateListener> = new Set();
  private activityListeners: Set<ActivityListener> = new Set();
  private membersListeners: Set<MembersListener> = new Set();

  constructor() {
    if (typeof window !== "undefined") {
      let savedId = localStorage.getItem("last_alibi_agent_id");
      if (!savedId) {
        savedId = `agent-${Math.random().toString(36).substring(2, 9)}`;
        localStorage.setItem("last_alibi_agent_id", savedId);
      }
      this.memberId = savedId;

      const savedName = localStorage.getItem("last_alibi_agent_name");
      if (savedName) {
        this.memberName = savedName;
      }
    }
  }

  public setAgentName(name: string) {
    this.memberName = name.trim() || "Detective";
    if (typeof window !== "undefined") {
      localStorage.setItem("last_alibi_agent_name", this.memberName);
    }
    if (this.roomCode && this.isConnected) {
      this.sendHeartbeat();
    }
  }

  public onStateSync(listener: StateListener): () => void {
    this.stateListeners.add(listener);
    return () => {
      this.stateListeners.delete(listener);
    };
  }

  public onActivity(listener: ActivityListener): () => void {
    this.activityListeners.add(listener);
    return () => {
      this.activityListeners.delete(listener);
    };
  }

  public onMembersChange(listener: MembersListener): () => void {
    this.membersListeners.add(listener);
    return () => {
      this.membersListeners.delete(listener);
    };
  }

  /**
   * Create a new Co-Op Room as Host
   */
  public async createRoom(caseSlug: string, initialState: CoopSyncState): Promise<string> {
    const code = `ALIBI-${Math.floor(1000 + Math.random() * 9000)}`;
    this.roomCode = code;
    this.isHost = true;
    this.isConnected = true;

    try {
      await fetch(`/api/coop/${code}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "create",
          caseSlug,
          member: { id: this.memberId, name: this.memberName },
          state: initialState,
        }),
      });
    } catch (e) {
      console.warn("API room creation fallback:", e);
    }

    this.initNetworking(code);
    return code;
  }

  /**
   * Join an existing Co-Op Room
   */
  public async joinRoom(code: string): Promise<boolean> {
    const upperCode = code.trim().toUpperCase();
    this.roomCode = upperCode;
    this.isHost = false;

    try {
      const res = await fetch(`/api/coop/${upperCode}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          member: { id: this.memberId, name: this.memberName },
        }),
      });

      if (!res.ok) {
        throw new Error("Room not found or full");
      }

      const data = await res.json();
      if (data.room) {
        this.isConnected = true;
        this.members = data.room.members;
        this.notifyMembers();

        if (data.room.state) {
          this.notifyState(data.room.state, data.room.hostName || "Host");
        }
      }
    } catch (e) {
      console.warn("Could not connect to room via API, using P2P channel:", e);
      // Still allow peer channel if on same browser/network
      this.isConnected = true;
    }

    this.initNetworking(upperCode);
    return true;
  }

  private initNetworking(code: string) {
    // 1. BroadcastChannel for instant local cross-tab sync
    if (typeof window !== "undefined" && "BroadcastChannel" in window) {
      if (this.broadcastChannel) this.broadcastChannel.close();
      this.broadcastChannel = new BroadcastChannel(`last_alibi_room_${code}`);

      this.broadcastChannel.onmessage = (event) => {
        const data = event.data;
        if (!data || data.senderId === this.memberId) return;

        if (data.type === "ACTION") {
          this.handleIncomingAction(data.action);
        } else if (data.type === "MEMBER_PING") {
          this.handleMemberPing(data.member);
        }
      };

      // Announce presence
      this.broadcastChannel.postMessage({
        type: "MEMBER_PING",
        senderId: this.memberId,
        member: { id: this.memberId, name: this.memberName, isHost: this.isHost },
      });
    }

    // 2. Periodic poll / heartbeat to keep room in sync
    if (this.pollInterval) clearInterval(this.pollInterval);
    this.pollInterval = setInterval(() => this.sendHeartbeat(), 3000);
  }

  private async sendHeartbeat() {
    if (!this.roomCode || !this.isConnected) return;

    try {
      const res = await fetch(`/api/coop/${this.roomCode}`);
      if (res.ok) {
        const data = await res.json();
        if (data.room) {
          this.members = data.room.members;
          this.notifyMembers();

          // Sync incoming state updates from other players
          if (data.room.state) {
            this.notifyState(data.room.state, "Squad Sync");
          }

          if (data.room.activityFeed && data.room.activityFeed.length > 0) {
            this.activityFeed = data.room.activityFeed;
          }
        }
      }
    } catch (e) {
      // Offline fallback
    }
  }

  private handleMemberPing(member: CoopMember) {
    if (!this.members.some((m) => m.id === member.id)) {
      this.members = [...this.members, member];
      this.notifyMembers();
    }
  }

  private handleIncomingAction(action: CoopAction) {
    switch (action.type) {
      case "DISCOVER_EVIDENCE":
        this.notifyState({ discoveredEvidenceIds: [action.evidenceId] }, action.agentName);
        this.addActivity(`${action.agentName} uncovered Exhibit ${action.evidenceId.toUpperCase()}`);
        break;
      case "INSPECT_EVIDENCE":
        this.notifyState({ inspectedEvidenceIds: [action.evidenceId] }, action.agentName);
        break;
      case "TOGGLE_STAR":
        this.notifyState({ starredEvidenceIds: [action.evidenceId] }, action.agentName);
        break;
      case "SAVE_NOTE":
        this.notifyState({ playerNotes: { [action.id]: action.note } }, action.agentName);
        this.addActivity(`${action.agentName} recorded detective note on [${action.id}]`);
        break;
      case "UPDATE_CONNECTIONS":
        this.notifyState({ connections: action.connections }, action.agentName);
        this.addActivity(`${action.agentName} updated connections on the Corkboard`);
        break;
      case "ASK_QUESTION":
        this.notifyState({ askedQuestionIds: [action.questionId] }, action.agentName);
        this.addActivity(`${action.agentName} questioned suspect [${action.questionId}]`);
        break;
      case "STATE_SYNC":
        this.notifyState(action.state, action.agentName);
        break;
    }
  }

  /**
   * Broadcast an action to all co-op squad members
   */
  public broadcastAction(action: CoopAction) {
    if (!this.roomCode || !this.isConnected) return;

    // 1. Post to local BroadcastChannel
    if (this.broadcastChannel) {
      this.broadcastChannel.postMessage({
        type: "ACTION",
        senderId: this.memberId,
        action,
      });
    }

    // 2. Post to API relay
    fetch(`/api/coop/${this.roomCode}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        member: { id: this.memberId, name: this.memberName },
        state: this.actionToPartialState(action),
        activity: {
          agentName: this.memberName,
          text: this.actionToSummary(action),
        },
      }),
    }).catch(() => {});
  }

  private actionToPartialState(action: CoopAction): Partial<CoopSyncState> {
    switch (action.type) {
      case "DISCOVER_EVIDENCE":
        return { discoveredEvidenceIds: [action.evidenceId] };
      case "INSPECT_EVIDENCE":
        return { inspectedEvidenceIds: [action.evidenceId] };
      case "SAVE_NOTE":
        return { playerNotes: { [action.id]: action.note } };
      case "UPDATE_CONNECTIONS":
        return { connections: action.connections };
      case "ASK_QUESTION":
        return { askedQuestionIds: [action.questionId] };
      case "STATE_SYNC":
        return action.state;
      default:
        return {};
    }
  }

  private actionToSummary(action: CoopAction): string {
    switch (action.type) {
      case "DISCOVER_EVIDENCE":
        return `Discovered Exhibit ${action.evidenceId.toUpperCase()}`;
      case "SAVE_NOTE":
        return `Updated case notes`;
      case "UPDATE_CONNECTIONS":
        return `Pinned connection on Corkboard`;
      case "ASK_QUESTION":
        return `Interviewed suspect`;
      default:
        return `Investigated case file`;
    }
  }

  private addActivity(text: string) {
    const act: CoopActivity = {
      id: `act-${Date.now()}-${Math.random()}`,
      agentName: this.memberName,
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
    this.activityFeed.unshift(act);
    this.activityListeners.forEach((l) => l(act));
  }

  private notifyState(state: Partial<CoopSyncState>, author: string) {
    this.stateListeners.forEach((l) => l(state, author));
  }

  private notifyMembers() {
    this.membersListeners.forEach((l) => l(this.members));
  }

  public leaveRoom() {
    if (this.broadcastChannel) {
      this.broadcastChannel.close();
      this.broadcastChannel = null;
    }
    if (this.pollInterval) {
      clearInterval(this.pollInterval);
      this.pollInterval = null;
    }
    this.roomCode = null;
    this.isConnected = false;
    this.isHost = false;
    this.members = [];
    this.notifyMembers();
  }
}

export const coopManager = new CoopSyncManager();
