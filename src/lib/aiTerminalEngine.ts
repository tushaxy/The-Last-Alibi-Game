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
 * Intelligent Zero-API Case Inquisitor & Agentic Dialogue Engine.
 * Dynamically parses the player's syntax, intent, emotion, entities, and question type,
 * producing tailored in-character replies with personality, cross-suspect gossip,
 * timeline precision, and strict anti-spoiler guards.
 */
export function generateAIResponse(ctx: AIQueryContext): {
  text: string;
  unlockedEvidenceId?: string;
} {
  const { currentCase, personaId, query, history, discoveredEvidenceIds } = ctx;
  const rawQ = query.trim();
  const q = rawQ.toLowerCase();

  // 1. Archive AI Intelligence Core Mode
  if (personaId === "archive") {
    return handleArchiveAgent(rawQ, q, currentCase, history, discoveredEvidenceIds);
  }

  // 2. Character Interrogation Mode (Specific Suspect)
  const suspect = currentCase.suspects.find((s) => s.id === personaId);
  if (!suspect) {
    return {
      text: "ERR: Subject profile not found in current investigation roster.",
    };
  }

  return handleSuspectAgent(rawQ, q, suspect, currentCase, history, discoveredEvidenceIds);
}

/**
 * Extract conversational intent and grammatical structure
 */
interface QueryIntent {
  isWhy: boolean;
  isWhere: boolean;
  isWhen: boolean;
  isWho: boolean;
  isWhat: boolean;
  isHow: boolean;
  isDidYou: boolean;
  isAccusation: boolean;
  isSuspicion: boolean;
  isMotive: boolean;
  isAlibi: boolean;
  isEvidence: boolean;
  isFollowUp: boolean;
  mentionedTime: string | null;
  mentionedSuspectName: string | null;
  mentionedSuspect: Suspect | null;
  mentionedEvidence: EvidenceItem | null;
}

function analyzeQuery(rawQ: string, q: string, c: Case, history: ChatMessage[]): QueryIntent {
  const isWhy = /\b(why|reason|what made you|how come)\b/i.test(q);
  const isWhere = /\b(where|location|place|which carriage|which compartment|room|hallway|corridor|pantry|dining car)\b/i.test(q);
  const isWhen = /\b(when|what time|at what hour|chronolog|schedule|timestamp)\b/i.test(q);
  const isWho = /\b(who|whom|anyone|someone|everybody|who was)\b/i.test(q);
  const isWhat = /\b(what|tell me about|explain|describe)\b/i.test(q);
  const isHow = /\b(how did|how could|how were|method|mechanism|manner)\b/i.test(q);
  const isDidYou = /\b(did you|were you|have you|can you|could you|would you)\b/i.test(q);
  
  const isAccusation =
    /\b(did you kill|did you murder|killed him|killed her|murdered him|murdered her|murderer|killer|culprit|guilty|confess|admit it|you did it|you did this|you're lying|you are lying|liar)\b/i.test(q);

  const isSuspicion =
    /\b(who do you think|who is the killer|who do you suspect|who looks suspicious|who would do this|who do you blame)\b/i.test(q);

  const isMotive =
    /\b(motive|money|will|inheritance|estate|owe|debt|embezzle|forg|steal|stole|fight|argue|arguing|quarrel|dispute|yell|threat|blackmail|scandal|expose|ruin)\b/i.test(q);

  const isAlibi =
    /\b(alibi|where were you|between|where did you go|what were you doing|who were you with|witness|corroborat)\b/i.test(q);

  const isEvidence =
    /\b(evidence|clue|watch|ticket|receipt|thread|bag|notebook|letter|coffee|poison|morphine|digitalis|key|lock|door|louvre|fire|ledger|log|knife|vial|record)\b/i.test(q);

  const isFollowUp =
    rawQ.length < 25 &&
    /\b(and then|after that|what else|why not|are you sure|really|who else|what about it|and)\b/i.test(q);

  // Detect specific time mention
  let mentionedTime: string | null = null;
  const timeMatch = q.match(/\b(10[:.]?\d{2}|11[:.]?\d{2}|12[:.]?\d{2}|midnight|ten|eleven|quarter|half past)\b/i);
  if (timeMatch) mentionedTime = timeMatch[0];

  // Detect mentioned other suspect
  let mentionedSuspect: Suspect | null = null;
  let mentionedSuspectName: string | null = null;
  for (const s of c.suspects) {
    const parts = s.name.toLowerCase().split(" ");
    for (const part of parts) {
      if (part.length > 2 && q.includes(part)) {
        mentionedSuspect = s;
        mentionedSuspectName = s.name;
        break;
      }
    }
    if (mentionedSuspect) break;
  }

  // Detect mentioned evidence
  let mentionedEvidence: EvidenceItem | null = null;
  for (const ev of c.evidence) {
    const evWords = ev.title.toLowerCase().split(/[\s,]+/);
    const hasWord = evWords.some((w) => w.length > 4 && q.includes(w));
    if (hasWord || q.includes(ev.id.toLowerCase())) {
      mentionedEvidence = ev;
      break;
    }
  }

  return {
    isWhy,
    isWhere,
    isWhen,
    isWho,
    isWhat,
    isHow,
    isDidYou,
    isAccusation,
    isSuspicion,
    isMotive,
    isAlibi,
    isEvidence,
    isFollowUp,
    mentionedTime,
    mentionedSuspectName,
    mentionedSuspect,
    mentionedEvidence,
  };
}

/**
 * Intelligent Agentic Interrogation for a Specific Suspect
 */
function handleSuspectAgent(
  rawQ: string,
  q: string,
  s: Suspect,
  c: Case,
  history: ChatMessage[],
  discoveredEvidenceIds: string[]
): { text: string; unlockedEvidenceId?: string } {
  const intent = analyzeQuery(rawQ, q, c, history);
  const isCulprit = c.solution.culpritId === s.id;
  const victimName = c.victim.name.split(" ")[0];

  // 1. DIRECT ACCUSATIONS & GUILT CONFRONTATION
  if (intent.isAccusation) {
    if (isCulprit) {
      // The culprit NEVER breaks down in casual text interrogation without formal warrant!
      // They defend themselves aggressively with their crafted cover story.
      const culpritDefenses = [
        `You have outrageous nerve making an accusation like that without judicial paperwork! I have stated my alibi under oath: ${s.alibi}. If you want to slander me, you had better find undeniable physical proof first!`,
        `Me?! Look at my standing and record! Why would I throw away everything to murder ${victimName}? I was nowhere near that compartment at the time of death. If you're going to accuse someone, go question the others who had direct access!`,
        `I am not answering another word of these insulting charges. My movements are accounted for. You are a detective, not an inquisitor—either produce irrefutable evidence of my presence or direct your suspicions to people who actually had a motive!`,
      ];
      return { text: culpritDefenses[Math.floor(Math.random() * culpritDefenses.length)] };
    } else {
      // Innocent suspect reaction
      const innocentReactions = [
        `Are you out of your mind?! I didn't murder ${victimName}! I have nothing to hide from the authorities. Check my cabin, check the station logs, question everyone who saw me!`,
        `How dare you point your finger at me! Yes, ${victimName} and I had our disputes—everyone did! But I am not a savage. Look at the timeline: ${s.alibi}. I couldn't have done it even if I wanted to!`,
        `You're barking up the wrong tree, detective. If you waste your time interrogating an innocent person, the real killer is going to slip away at the next terminal!`,
      ];
      return { text: innocentReactions[Math.floor(Math.random() * innocentReactions.length)] };
    }
  }

  // 2. CHECK FOR EVIDENCE-STAGE UNLOCKS
  // If the user's question directly challenges the suspect with required evidence
  for (const stage of s.interviewStages) {
    if (stage.requiredEvidenceId) {
      const reqEv = c.evidence.find((e) => e.id === stage.requiredEvidenceId);
      if (reqEv) {
        const matchesClue =
          q.includes(reqEv.id.toLowerCase()) ||
          reqEv.title.toLowerCase().split(" ").some((w) => w.length > 4 && q.includes(w));
        
        if (matchesClue) {
          return {
            text: `[Confronted with ${reqEv.title}]\n\n"${stage.response}"`,
            unlockedEvidenceId: stage.unlocksEvidenceId,
          };
        }
      }
    }
  }

  // 3. SUSPICIONS & POINTING FINGERS ("Who do you think did it?", "Who is suspicious?")
  if (intent.isSuspicion) {
    return generateSuspectSuspicion(s, c);
  }

  // 4. QUESTIONS ABOUT OTHER SUSPECTS ("What about Marcus?", "Did you see Clara?", etc.)
  if (intent.mentionedSuspect && intent.mentionedSuspect.id !== s.id) {
    return generateCrossSuspectGossip(s, intent.mentionedSuspect, c);
  }

  // 5. QUESTIONS ABOUT SPECIFIC EVIDENCE OR ITEMS ("What about the receipt / watch / thread / bag?")
  if (intent.mentionedEvidence || intent.isEvidence) {
    const ev = intent.mentionedEvidence || findBestEvidenceMatch(q, c);
    if (ev) {
      return generateEvidenceReaction(s, ev, c);
    }
  }

  // 6. MOTIVE, MONEY, ARGUMENTS & DISPUTES ("Why were you arguing?", "Did you owe money?", "Why did you hate him?")
  if (intent.isMotive || (intent.isWhy && (q.includes("money") || q.includes("hate") || q.includes("kill") || q.includes("quarrel")))) {
    return generateMotiveExplanation(s, c, intent, q);
  }

  // 7. SPECIFIC TIMELINE / HOUR INQUIRIES ("What were you doing at 10:42 PM?", "Where were you at 11:20?")
  if (intent.mentionedTime || intent.isWhen) {
    return generateTimelineAlibi(s, c, intent.mentionedTime, q);
  }

  // 8. WHEREABOUTS & ALIBI ("Where were you?", "Who were you with?")
  if (intent.isWhere || intent.isAlibi) {
    return generateLocationAlibi(s, c, q);
  }

  // 9. WITNESS / OBSERVATION ("What did you see?", "Did you hear anything?", "Did you see anyone in the hallway?")
  if (/\b(see|saw|hear|heard|sound|look|witness|corridor|door|window|shout|scream|footstep)\b/i.test(q)) {
    return generateWitnessObservations(s, c, q);
  }

  // 10. HOW WAS IT DONE / METHOD / CRIME SCENE DETAILS ("How was the door locked?", "How did he die?")
  if (intent.isHow || /\b(locked|lock|key|bolt|poison|weapon|enter|escape)\b/i.test(q)) {
    return generateMethodObservations(s, c, q);
  }

  // 11. GENERAL / WHAT / CONVERSATIONAL ADVICE
  return generateContextualDialogue(s, c, rawQ, q, history);
}

/**
 * Generate suspect's suspicion about who the murderer is
 */
function generateSuspectSuspicion(s: Suspect, c: Case): { text: string } {
  // Bespoke suspicion lore for Case 1
  if (s.id === "sus-eleanor") {
    return {
      text: `If you want my honest opinion, detective? Follow the money. Marcus Reed has been sweating bullets ever since we boarded in Zurich. Adrian confided in me that Marcus had been forging Byzantine certificates and stealing thousands from the gallery. Adrian was going to report him the moment we reached Vienna!`,
    };
  }
  if (s.id === "sus-marcus") {
    return {
      text: `Who would do this? Eleanor Vale stood to inherit millions under Adrian's 1938 will, and they were in the middle of a brutal divorce. Or perhaps that snooping journalist Clara Finch—she has been hounding Adrian for months and lurking by his door with a notebook. Don't look at me; look at them!`,
    };
  }
  if (s.id === "sus-simon") {
    return {
      text: `As a medical man, I deal in physical trauma and toxicology, not speculation. But Adrian Vale made enemies in every port. I noticed Mr. Reed looking dreadfully agitated before the train even departed, and the attendant, Bell, seemed terrified whenever Adrian summoned him. Start with those who were moving about the carriage.`,
    };
  }
  if (s.id === "sus-clara") {
    return {
      text: `You want my notebook notes off the record? It was Marcus Reed. At 10:25 PM I saw him slip into Adrian's room. At 10:42 PM, he backed out into the corridor looking white as chalk, fidgeting with the door transom before scurrying toward Carriage A. Marcus is lying through his teeth about where he was!`,
    };
  }
  if (s.id === "sus-thomas") {
    return {
      text: `It's not my place to make accusations against first-class ticket holders, sir... but Mr. Reed was acting very strange after the galley fire. He claimed he was in the dining salon, but Head Steward Richter and I had already locked those carriage doors by 10:20 PM!`,
    };
  }

  // Dynamic fallback for other cases
  const otherSuspects = c.suspects.filter((other) => other.id !== s.id);
  const candidate = otherSuspects[0];
  return {
    text: `Who do I suspect? If you pay attention to the dynamics around ${c.victim.name}, ${candidate ? `${candidate.name} had plenty of friction with them` : "several people had secret grudges"}. Cross-check their reported timeline against physical logs—whoever's story contradicts the facts is the one you want.`,
  };
}

/**
 * Suspect's commentary regarding another suspect
 */
function generateCrossSuspectGossip(s: Suspect, other: Suspect, c: Case): { text: string } {
  // Case 1 specific cross-examinations
  if (s.id === "sus-marcus" && other.id === "sus-clara") {
    return {
      text: `Clara Finch? She is an unscrupulous yellow journalist who makes a living printing sensational slander! If she claims she saw me near Adrian's compartment, she is fabricating statements to sell newspapers at an innocent man's expense!`,
    };
  }
  if (s.id === "sus-eleanor" && other.id === "sus-clara") {
    return {
      text: `Miss Finch was in Compartment D with me between 10:30 and 11:20 PM. We were reviewing Adrian's offshore bank declarations for my legal divorce filings. She can vouch for my presence every single minute.`,
    };
  }
  if (s.id === "sus-simon" && other.id === "sus-marcus") {
    return {
      text: `Marcus Reed? He looked visibly unsettled when we boarded. I offered him a sedative for travel anxiety in Zurich, but he snapped at me and hurried away. He struck me as a man on the verge of financial ruin.`,
    };
  }
  if (s.id === "sus-thomas" && other.id === "sus-simon") {
    return {
      text: `Dr. Cross was resting quietly in Compartment E. When I discovered Mr. Vale and cried out for help at 11:40 PM, the doctor was the first to answer and came in his dressing gown to check the pulse.`,
    };
  }

  // Dynamic synthesis from suspect relationship data
  return {
    text: `You're asking about ${other.name}? ${other.name} is the ${other.occupation.toLowerCase()}. ${other.publicMotive ? `Rumor has it their dispute with ${c.victim.name.split(" ")[0]} was over ${other.publicMotive.toLowerCase()}.` : ""} I don't know the full extent of their private dealings, but I suggest you look closely at their movements around the time of the incident.`,
  };
}

/**
 * Suspect's reaction to a physical clue or exhibit
 */
function generateEvidenceReaction(s: Suspect, ev: EvidenceItem, c: Case): {
  text: string;
  unlockedEvidenceId?: string;
} {
  const isCulprit = c.solution.culpritId === s.id;

  // Marcus reacting to Receipt or Olive Thread
  if (s.id === "sus-marcus") {
    if (ev.id === "ev-007" || ev.title.toLowerCase().includes("receipt")) {
      return {
        text: `My dining receipt #442? I already produced it to prove I was having scotch in the Dining Car. If the timestamp looks smudged, it's merely a carbon paper imprint from the steward's pad. It is legitimate proof of my whereabouts!`,
      };
    }
    if (ev.id === "ev-003" || ev.title.toLowerCase().includes("thread")) {
      return {
        text: `Waxed olive twine in the louvre? That is standard archival thread used by dozens of antiquarian dealers and bookbinders across Europe! Thousands of people carry it. You cannot tie me to a crime simply because of a stray fiber!`,
      };
    }
  }

  // Dr. Simon Cross reacting to Satchel / Morphine
  if (s.id === "sus-simon" && (ev.id === "ev-008" || ev.title.toLowerCase().includes("bag") || ev.title.toLowerCase().includes("morphine"))) {
    return {
      text: `Examine my surgical satchel all you want, detective. Every ampoule of digitalis, chloral hydrate, and morphine bears an unbroken hospital lead seal. Furthermore, look at my swollen knuckles from severe arthritis—I can barely grip a pen, let alone rig an intricate mechanical parlor trick!`,
      unlockedEvidenceId: "ev-008",
    };
  }

  // Clara Finch reacting to her notebook
  if (s.id === "sus-clara" && (ev.id === "ev-009" || ev.title.toLowerCase().includes("notebook"))) {
    return {
      text: `My shorthand notepad? Every timestamp in there was written in real time. I saw Marcus Reed enter Compartment B at 10:25 PM, and I saw him sneak back out at 10:42 PM looking panicked. You can test the ink if you don't believe my testimony!`,
      unlockedEvidenceId: "ev-009",
    };
  }

  // Generic in-character evidence reaction
  return {
    text: `Regarding Exhibit [${ev.title.toUpperCase()}]: ${ev.description} As far as I'm concerned, ${isCulprit ? "that item proves nothing directly against me. You're grasping at circumstantial straws, detective." : "that exhibit belongs to the physical scene. I have nothing to do with it."}`,
  };
}

/**
 * Suspect explains their motive or financial disputes
 */
function generateMotiveExplanation(s: Suspect, c: Case, intent: QueryIntent, q: string): { text: string } {
  const isCulprit = c.solution.culpritId === s.id;

  if (s.id === "sus-eleanor") {
    return {
      text: `You want to talk about motive? Yes, I despise Adrian. He treated me like a decorative ornament and hid our marital assets in secret Zurich accounts. But I was fighting him through legal forensic accountants with Miss Finch! Murdering him would freeze the estate in probate for years. I wanted him ruined in open court, not dead in a sleeper car!`,
    };
  }

  if (s.id === "sus-marcus") {
    return {
      text: `Adrian and I had disagreements over antiquities valuation, yes—that is standard business between partners! But claims that he was going to 'expose' me are complete fabrications. We were traveling to Vienna to open our grand autumn exhibition together. Why would I destroy my own livelihood?!`,
    };
  }

  if (s.id === "sus-simon") {
    return {
      text: `Adrian outbid me on a rare 16th-century anatomical codex three months ago. Was I irritated at his vulgar display of wealth? Certainly. But to suggest a retired physician of forty years would commit cold-blooded murder over old parchment is preposterous!`,
    };
  }

  return {
    text: `You're asking why I had conflict with ${c.victim.name}? People are whispering about ${s.publicMotive.toLowerCase()}. But having a professional or personal dispute does not make someone a murderer! ${s.privateHistory}`,
  };
}

/**
 * Timeline-specific alibi answers
 */
function generateTimelineAlibi(s: Suspect, c: Case, timeMention: string | null, q: string): { text: string } {
  if (s.id === "sus-marcus") {
    if (q.includes("10:25") || q.includes("10:42") || q.includes("10:")) {
      return {
        text: `At that hour? I was heading to Carriage C to order dinner before the fire disruption occurred. Any claim that I was inside Adrian's compartment at 10:25 or 10:42 PM is a blatant mistake by whoever claims to have seen me!`,
      };
    }
    return {
      text: `From 10:20 PM until 11:35 PM, I was in the First Class Dining salon nursing a drink. I have provided Receipt #442. Check the logs if you must, but that is my statement.`,
    };
  }

  if (s.id === "sus-eleanor") {
    return {
      text: `Between 10:30 PM and 11:20 PM, I was continuously in Compartment D with Clara Finch. We were analyzing Adrian's private Swiss account disclosures. Neither of us left that compartment until the attendant raised the alarm.`,
    };
  }

  if (s.id === "sus-simon") {
    return {
      text: `I retired to Compartment E at 10:00 PM and took my nightly sedative for my arthritic pain. I was sound asleep until Attendant Bell started shouting outside my door around 11:40 PM.`,
    };
  }

  return {
    text: `Regarding the timeline: ${s.alibi}. ${timeMention ? `At ${timeMention}, my movements were completely consistent with what I have reported to the authorities.` : ""}`,
  };
}

/**
 * Location / Whereabouts
 */
function generateLocationAlibi(s: Suspect, c: Case, q: string): { text: string } {
  return {
    text: `You're asking where I was? As I have entered into the official record: ${s.alibi}. ${s.interviewStages[0]?.response || "I was nowhere near the scene of the tragedy at the critical hour."}`,
  };
}

/**
 * Witness / Sensory observations
 */
function generateWitnessObservations(s: Suspect, c: Case, q: string): { text: string } {
  if (s.id === "sus-clara") {
    return {
      text: `What did I see? I kept my door open a crack. At 10:25 PM Marcus entered Compartment B carrying a portfolio. At 10:42 PM, Marcus slipped back out, stood looking agitated by the door louvre, and hurried toward Carriage A. Later around 10:45 PM, Eleanor joined me to go over bank papers.`,
    };
  }
  if (s.id === "sus-thomas") {
    return {
      text: `During my rounds, I noticed heavy smoke from the dining galley around 10:15 PM. Head Steward Richter and I spent forty minutes ensuring all passengers were safely moved to Carriage B and C. At 11:40 PM, I knocked on Mr. Vale's door to collect the breakfast cards—and found him dead!`,
    };
  }
  return {
    text: `I was focused on my own affairs. I didn't see anyone enter or exit the compartment, nor did I hear any struggle through the mahogany partitions. The train wheels on the tracks drown out most sounds.`,
  };
}

/**
 * Method & Crime scene mechanics
 */
function generateMethodObservations(s: Suspect, c: Case, q: string): { text: string } {
  return {
    text: `How the crime was committed is a question for your forensics division, detective. The door was locked from the inside, with no obvious firearm or blade wound. Whoever did it must have had access to covert poisons and a clever mechanical method to throw the brass bolt from the corridor!`,
  };
}

/**
 * Dynamic contextual dialogue fallback that directly addresses the player's question wording
 */
function generateContextualDialogue(
  s: Suspect,
  c: Case,
  rawQ: string,
  q: string,
  history: ChatMessage[]
): { text: string } {
  // Echo the key subject if possible
  const words = rawQ.replace(/[?!.]/g, "").split(/\s+/).filter((w) => w.length > 3);
  const keySubject = words.length > 0 ? words[words.length - 1] : "that matter";

  const leadIns = [
    `Regarding ${keySubject}? Let me be perfectly clear:`,
    `If you're asking me about ${keySubject}, detective:`,
    `You're probing into ${keySubject}. Here is the truth:`,
    `You want my perspective on ${keySubject}?`,
  ];
  const leadIn = leadIns[Math.floor(Math.random() * leadIns.length)];

  // Synthesize answer using lore
  const loreBits = [
    `${s.relationshipToVictim}. I have cooperated with every reasonable question from the railway authorities.`,
    `My conscience regarding ${c.victim.name.split(" ")[0]} is clear. ${s.privateHistory}`,
    `You should spend your time looking into the physical exhibits and the dining car logs instead of pressing me on these details.`,
  ];
  const selectedBit = loreBits[Math.floor(Math.random() * loreBits.length)];

  return {
    text: `${leadIn} ${selectedBit} My sworn alibi remains: "${s.alibi}".`,
  };
}

/**
 * Helper to match evidence in query
 */
function findBestEvidenceMatch(q: string, c: Case): EvidenceItem | null {
  for (const ev of c.evidence) {
    const words = ev.title.toLowerCase().split(/\s+/);
    if (words.some((w) => w.length > 3 && q.includes(w))) {
      return ev;
    }
  }
  return null;
}

/**
 * Archive Core AI Intelligence Mode (District 4 Central Forensic System)
 */
function handleArchiveAgent(
  rawQ: string,
  q: string,
  c: Case,
  history: ChatMessage[],
  discoveredEvidenceIds: string[]
): { text: string; unlockedEvidenceId?: string } {
  // 1. Direct Culprit Leak Block (Anti-Spoiler Guard)
  if (
    /\b(who is the killer|who did it|who murdered|tell me the answer|who is guilty|who is the culprit|solution|give me the answer)\b/i.test(q)
  ) {
    return {
      text: `[RESTRICTED JUDICIAL ARCHIVE PROTOCOL]\nDistrict 4 Special Investigations Unit regulations forbid automated determination of criminal culpability.\n\nAs Chief Detective, you must assemble the warrant yourself by linking:\n1. The Culprit's fabricated alibi against physical timestamps\n2. The specific Decisive Evidence contradicting their claims\n3. The exact delivery method of the fatal poison/trauma.\n\nSwitch tabs to interrogate individual suspects or examine unlocked exhibits in the Evidence Locker.`,
    };
  }

  // 2. Victim & Autopsy / Cause of Death
  if (/\b(victim|autopsy|coroner|cause of death|how did he die|how did she die|body|corpse|toxicology)\b/i.test(q)) {
    return {
      text: `[DECEASED FILE: ${c.victim.name.toUpperCase()}]\n• Age: ${c.victim.age} // Occupation: ${c.victim.occupation}\n• Incident Location: ${c.incidentLocation} (${c.incidentDate})\n• Cause of Death: ${c.victim.causeOfDeath}\n• Official Autopsy Summary: ${c.victim.summary}\n\nForensic Observation: Check the victim's immediate surroundings and beverage containers for chemical residues or signs of tampering.`,
    };
  }

  // 3. Evidence Status & Inventory
  if (/\b(evidence|clues|exhibits|locker|how many|recovered|missing)\b/i.test(q)) {
    const recovered = discoveredEvidenceIds.length;
    const total = c.evidence.length;
    const missing = total - recovered;
    return {
      text: `[EVIDENCE REPOSITORY STATUS: CASE ${c.caseNumber}]\n• Total Case Exhibits: ${total}\n• Recovered by Detective: ${recovered}\n• Unresolved Exhibits: ${missing}\n\nTip: You can discover remaining exhibits by exploring interactive radar hotspots on the Crime Scene map or by confronting suspects with contradictory statements during interrogation.`,
    };
  }

  // 4. Timeline & Chronology
  if (/\b(timeline|chronology|events|schedule|sequence|what happened)\b/i.test(q)) {
    const verified = c.timeline
      .filter((t) => t.reliability === "verified")
      .map((t) => `• [${t.time}] ${t.title} (Source: ${t.source})`)
      .slice(0, 5)
      .join("\n");
    return {
      text: `[VERIFIED CHRONOLOGY LOGS]\n${verified}\n\nTactical Guidance: Any suspect claiming to be in a location during a time when that location was verifiably closed or evacuated has submitted a fabricated alibi.`,
    };
  }

  // 5. Suspects Overview
  if (/\b(suspects|roster|persons of interest|who are they|list suspects)\b/i.test(q)) {
    const list = c.suspects
      .map((s) => `• ${s.name} (${s.occupation})\n  - Relationship: ${s.relationshipToVictim}\n  - Claimed Alibi: "${s.alibi}"`)
      .join("\n\n");
    return {
      text: `[RECORDED PERSONS OF INTEREST (${c.suspects.length})]\n\n${list}\n\nSelect any individual suspect portrait in the header strip above to conduct a direct interrogation.`,
    };
  }

  // 6. Specific Evidence Query
  for (const ev of c.evidence) {
    const words = ev.title.toLowerCase().split(/\s+/);
    if (words.some((w) => w.length > 4 && q.includes(w)) || q.includes(ev.id.toLowerCase())) {
      return {
        text: `[EXHIBIT FILE: ${ev.id.toUpperCase()} — ${ev.title.toUpperCase()}]\n• Category: ${ev.category.toUpperCase()}\n• Location: ${ev.discoveryLocation}\n• Forensic Profile: ${ev.description}\n• Available Lab Notes:\n${ev.availableObservations.map((o) => `  - ${o}`).join("\n")}`,
      };
    }
  }

  // 7. Hints & Detective Guidance
  if (/\b(hint|stuck|help|advice|what should i do|direction)\b/i.test(q)) {
    const hint = c.difficultyHints.easy[0] || "Cross-examine suspect claims against third-party logs.";
    return {
      text: `[TACTICAL INVESTIGATION GUIDANCE]\n${hint}\n\nRecommended Action: Open the Contradiction Scanner tab to pair suspect interview statements directly with physical exhibit records.`,
    };
  }

  // Fallback Archive Core
  return {
    text: `[VERITAS ARCHIVE CORE // CASE ${c.caseNumber}]\nI am the District 4 Central Intelligence Archive for "${c.title}".\n\nYou can query me regarding:\n• Autopsy findings, cause of death, and toxicological data\n• Official timeline records and incident chronologies\n• Exhibit inspection data and forensic observations\n• Suspect background records and claimed alibis\n\nOr click any suspect above to interrogate them directly.`,
  };
}
