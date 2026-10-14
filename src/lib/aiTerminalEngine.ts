import { Case, Suspect, EvidenceItem, TimelineEvent } from "@/types/game";

export interface ChatMessage {
  id: string;
  sender: "player" | "assistant";
  personaId: string; // "archive" or suspect ID
  personaName: string;
  text: string;
  timestamp: string;
  unlockedEvidenceId?: string;
}

interface AIQueryContext {
  currentCase: Case;
  personaId: string;
  query: string;
  history: ChatMessage[];
  discoveredEvidenceIds: string[];
}

/**
 * Intelligent Zero-API Case Inquisitor & Archive Engine
 * Understands natural language queries, roleplays each suspect with accurate lore,
 * and maintains strict spoiler protection so the culprit is never directly exposed.
 */
export function generateAIResponse(ctx: AIQueryContext): {
  text: string;
  unlockedEvidenceId?: string;
} {
  const { currentCase, personaId, query, discoveredEvidenceIds } = ctx;
  const q = query.trim().toLowerCase();

  // 1. Archive AI Mode (District 4 Criminal Intelligence Core)
  if (personaId === "archive") {
    return handleArchiveAI(q, currentCase, discoveredEvidenceIds);
  }

  // 2. Character Interrogation Mode (Specific Suspect)
  const suspect = currentCase.suspects.find((s) => s.id === personaId);
  if (!suspect) {
    return {
      text: "ERR: Subject profile not found in current investigation roster.",
    };
  }

  return handleSuspectInterrogation(q, suspect, currentCase, discoveredEvidenceIds);
}

/**
 * Archive AI (District 4 Forensic Database)
 */
function handleArchiveAI(
  q: string,
  c: Case,
  discoveredEvidenceIds: string[]
): { text: string; unlockedEvidenceId?: string } {
  // Direct Solution / Who is the killer?
  if (
    q.includes("who is the killer") ||
    q.includes("who did it") ||
    q.includes("who murdered") ||
    q.includes("tell me the answer") ||
    q.includes("who is guilty") ||
    q.includes("who is the culprit")
  ) {
    return {
      text: `[RESTRICTED JUDICIAL PROTOCOL] District 4 Special Investigations Unit regulations forbid automated determination of culpability. As Chief Detective, you must evaluate the suspects' alibis against physical evidence (look for timeline anomalies, forged papers, or mechanical tampering) and formulate your formal accusation warrant.`,
    };
  }

  // Victim & Cause of Death
  if (
    q.includes("victim") ||
    q.includes("who died") ||
    q.includes("cause of death") ||
    q.includes("autopsy") ||
    q.includes("coroner") ||
    q.includes("how did he die") ||
    q.includes("how did she die")
  ) {
    return {
      text: `[DECEASED FILE: ${c.victim.name.toUpperCase()}]\nAge: ${c.victim.age} // Occupation: ${c.victim.occupation}\nCause of Death: ${c.victim.causeOfDeath}\nAutopsy Findings: ${c.victim.summary}\nIncident Location: ${c.incidentLocation} (${c.incidentDate}).`,
    };
  }

  // Timeline & Schedule
  if (
    q.includes("timeline") ||
    q.includes("chronology") ||
    q.includes("time") ||
    q.includes("when") ||
    q.includes("events")
  ) {
    const verified = c.timeline
      .filter((t) => t.reliability === "verified")
      .map((t) => `• ${t.time}: ${t.title} (${t.source})`)
      .slice(0, 4)
      .join("\n");

    return {
      text: `[OFFICIAL CHRONOLOGY SUMMARY]\nKey Verified Incidents:\n${verified}\n\nDetective Advice: Cross-reference reported timestamps against verified physical logs to spot fabricated alibis.`,
    };
  }

  // Suspects Overview
  if (
    q.includes("suspect") ||
    q.includes("who is involved") ||
    q.includes("persons of interest") ||
    q.includes("roster")
  ) {
    const list = c.suspects
      .map(
        (s) =>
          `• ${s.name} (${s.occupation}): Relationship: ${s.relationshipToVictim}. Alibi: "${s.alibi}"`
      )
      .join("\n\n");
    return {
      text: `[RECORDED PERSONS OF INTEREST (${c.suspects.length})]\n\n${list}\n\nSwitch tabs to interrogate any subject directly.`,
    };
  }

  // Evidence / Clues inquiry
  if (
    q.includes("evidence") ||
    q.includes("exhibit") ||
    q.includes("clue") ||
    q.includes("locker") ||
    q.includes("how many")
  ) {
    const recovered = discoveredEvidenceIds.length;
    const total = c.evidence.length;
    return {
      text: `[FORENSIC EVIDENCE REPOSITORY STATUS]\nRecovered: ${recovered} of ${total} Exhibits.\n\nDetective Advice: Examine interactive radar hotspots on the Crime Scene map or question suspects directly to secure all exhibits for your case file.`,
    };
  }

  // Specific evidence check
  for (const ev of c.evidence) {
    const words = ev.title.toLowerCase().split(" ");
    if (words.some((w) => w.length > 4 && q.includes(w))) {
      return {
        text: `[ARCHIVE RECORD // EXHIBIT ${ev.id.toUpperCase()}: ${ev.title.toUpperCase()}]\nCategory: ${ev.category.toUpperCase()}\nLocation: ${ev.discoveryLocation}\nForensic Data: ${ev.description}\nAvailable Lab Notes:\n${ev.availableObservations.map((o) => `• ${o}`).join("\n")}`,
      };
    }
  }

  // Specific suspect check
  for (const s of c.suspects) {
    const sName = s.name.toLowerCase();
    if (q.includes(sName) || sName.split(" ").some((part) => q.includes(part))) {
      return {
        text: `[DOSSIER FILE // ${s.name.toUpperCase()}]\nOccupation: ${s.occupation}\nRelationship: ${s.relationshipToVictim}\nPublic Motive: ${s.publicMotive}\nClaimed Alibi: "${s.alibi}"\nBackground Intel: ${s.privateHistory}`,
      };
    }
  }

  // Detective Hint / Advice
  if (
    q.includes("hint") ||
    q.includes("help") ||
    q.includes("stuck") ||
    q.includes("what should i do") ||
    q.includes("advice")
  ) {
    const hint =
      c.difficultyHints.easy[0] ||
      "Compare suspect alibis against independent third-party records (logs, receipts, telemetry).";
    return {
      text: `[TACTICAL INVESTIGATION GUIDANCE]\n${hint}\n\nTip: You can use the Contradiction Scanner tab to pair suspect statements against physical exhibits.`,
    };
  }

  // Default Archive response
  return {
    text: `[VERITAS ARCHIVE INTELLIGENCE CORE]\nI hold all forensic records, autopsy reports, suspect backgrounds, and physical exhibit files for "${c.title}" (${c.caseNumber}).\n\nYou may ask me regarding:\n• Autopsy findings and cause of death\n• Specific suspect files and claimed alibis\n• Exhibit details and forensic observations\n• Timeline analysis and chronological sequences\n\nOr select any suspect from the roster above to conduct a direct interrogation.`,
  };
}

/**
 * Suspect Direct Interrogation (Character Roleplay Engine)
 */
function handleSuspectInterrogation(
  q: string,
  s: Suspect,
  c: Case,
  discoveredEvidenceIds: string[]
): { text: string; unlockedEvidenceId?: string } {
  const isCulprit = c.solution.culpritId === s.id;

  // 1. Direct Accusation ("Did you do it?", "You killed him!", "Murderer!")
  if (
    q.includes("did you kill") ||
    q.includes("did you murder") ||
    q.includes("are you the killer") ||
    q.includes("are you the murderer") ||
    q.includes("you killed") ||
    q.includes("you murdered") ||
    q.includes("murderer") ||
    q.includes("culprit") ||
    q.includes("confess") ||
    q.includes("guilty") ||
    q.includes("why did you do it") ||
    q.includes("admit it")
  ) {
    if (isCulprit) {
      // The culprit NEVER confesses in casual chat without a formal warrant!
      return {
        text: `Preposterous! How dare you accuse me of such an abhorrent crime?! I have given my full statement and verified my movements. My conscience is clear, detective. If you intend to make such slanderous allegations, you had better have unbreakable physical evidence!`,
      };
    } else {
      return {
        text: `Me?! Have you lost your senses, detective? I have nothing to hide! Check my alibi, check the logs, question the others! I may have had my differences with ${c.victim.name.split(" ")[0]}, but I am no murderer!`,
      };
    }
  }

  // 2. Alibi / Location / Movement Queries
  if (
    q.includes("where were you") ||
    q.includes("alibi") ||
    q.includes("what time") ||
    q.includes("between") ||
    q.includes("what were you doing") ||
    q.includes("where did you go") ||
    q.includes("who were you with")
  ) {
    return {
      text: `As I've already stated for the record: ${s.alibi}. ${s.interviewStages[0]?.response || "I was nowhere near the scene of the tragedy at that hour."}`,
    };
  }

  // 3. Motive / Money / Dispute Queries
  if (
    q.includes("motive") ||
    q.includes("money") ||
    q.includes("inheritance") ||
    q.includes("will") ||
    q.includes("embezzle") ||
    q.includes("steal") ||
    q.includes("owe") ||
    q.includes("threat") ||
    q.includes("argue") ||
    q.includes("fight") ||
    q.includes("quarrel") ||
    q.includes("blackmail")
  ) {
    return {
      text: `People can gossip all they want about ${s.publicMotive.toLowerCase()}. But having a disagreement or financial interests does not make someone a killer. ${s.privateHistory}`,
    };
  }

  // 4. Relationship to Victim
  if (
    q.includes("relationship") ||
    q.includes("how do you know") ||
    q.includes("know adrian") ||
    q.includes("know helena") ||
    q.includes("know rohan") ||
    q.includes("know julian") ||
    q.includes("victim") ||
    q.includes("friend") ||
    q.includes("partner") ||
    q.includes("husband") ||
    q.includes("wife") ||
    q.includes("sister") ||
    q.includes("brother")
  ) {
    return {
      text: `Regarding ${c.victim.name}: ${s.relationshipToVictim}. ${s.interviewStages[1]?.response || "Our dealings were well known to everyone involved."}`,
    };
  }

  // 5. Evidence-specific inquiries (Check if user mentions specific clues tied to this suspect)
  for (const stage of s.interviewStages) {
    if (stage.requiredEvidenceId) {
      const requiredEv = c.evidence.find((e) => e.id === stage.requiredEvidenceId);
      if (
        requiredEv &&
        (q.includes(requiredEv.id.toLowerCase()) ||
          requiredEv.title.toLowerCase().split(" ").some((w) => w.length > 4 && q.includes(w)))
      ) {
        return {
          text: stage.response,
          unlockedEvidenceId: stage.unlocksEvidenceId,
        };
      }
    }
  }

  // 6. Check for general matching interview responses
  for (const stage of s.interviewStages) {
    const qWords = stage.question.toLowerCase().split(" ");
    const matchCount = qWords.filter((w) => w.length > 3 && q.includes(w)).length;
    if (matchCount >= 2) {
      return {
        text: stage.response,
        unlockedEvidenceId: stage.unlocksEvidenceId,
      };
    }
  }

  // 7. Case-specific character color & responses
  if (s.id === "sus-marcus") {
    if (q.includes("receipt") || q.includes("dining")) {
      return {
        text: "I was having a scotch in the Dining Car. I produced my receipt #442 for 11:20 PM. Any claim that the car was evacuated must be an administrative mix-up by the attendants.",
        unlockedEvidenceId: "ev-007",
      };
    }
    if (q.includes("thread") || q.includes("lock") || q.includes("door")) {
      return {
        text: "Waxed green thread? I use archival twine for rare manuscripts all the time. Thousands of booksellers carry it! That is hardly proof of foul play.",
      };
    }
  }

  if (s.id === "sus-simon") {
    if (q.includes("poison") || q.includes("bag") || q.includes("medicine") || q.includes("morphine")) {
      return {
        text: "Inspect my physician's bag whenever you wish. Every single hospital ampoule has its lead tamper ribbon intact. And look at my arthritic hands—I could hardly perform intricate parlor tricks with locks.",
        unlockedEvidenceId: "ev-008",
      };
    }
  }

  if (s.id === "sus-clara") {
    if (q.includes("notes") || q.includes("saw") || q.includes("witness") || q.includes("corridor")) {
      return {
        text: "I kept my compartment door ajar with my notebook ready. At 10:25 PM, Marcus entered Adrian's room. At 10:42 PM, Marcus slipped back out looking terrified and fiddled with the door frame before hurrying away.",
        unlockedEvidenceId: "ev-009",
      };
    }
  }

  if (s.id === "sus-thomas") {
    if (q.includes("fire") || q.includes("service") || q.includes("log") || q.includes("rounds")) {
      return {
        text: "I was helping Head Steward Richter clear the heavy smoke from the galley short-circuit until 10:50 PM. The service log in Carriage C confirms everyone was escorted out.",
        unlockedEvidenceId: "ev-006",
      };
    }
  }

  // Fallback in-character dialogue
  return {
    text: `"${s.interviewStages[0]?.response || `I have told you everything I know regarding ${c.victim.name}. Focus your attention on the facts and the physical evidence, detective.`}"`,
  };
}
