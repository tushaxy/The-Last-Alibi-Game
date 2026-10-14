import { Case } from "@/types/game";

export const case3BlackoutRoom: Case = {
  id: "case-003",
  slug: "the-blackout-room",
  caseNumber: "CASE 003",
  title: "The Blackout Room",
  genre: "Psychological Detective Thriller",
  tagline: "Everyone remembers the blackout differently. The devices remember only the truth.",
  synopsis:
    "During a sudden 18-minute power blackout across the financial district, tech mogul Rohan Mehta is found dead inside his high-security 42nd-floor penthouse. Four people were in the building. One swears the elevator never moved; another insists they heard it rise; a third claims the victim was already dead before the darkness fell. Their statements cannot all be true.",
  incidentDate: "September 22, 1948",
  incidentLocation: "Penthouse 42 // The Meridian High-Rise, Financial District",
  defaultDifficulty: "hard",
  estimatedMinutes: 50,
  coverImage:
    "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?auto=format&fit=crop&w=1200&q=80",
  victim: {
    name: "Rohan Mehta",
    age: 38,
    occupation: "Cryptographic Systems Architect & Founder",
    causeOfDeath: "Asphyxiation via Heavy Shielded Fiber Cable (Struggled at 10:08 PM)",
    summary:
      "A brilliant, paranoid tech founder who built an encrypted treasury platform. He lived in a penthouse protected by biometric locks and constant digital logging.",
    portrait:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
  },
  crimeScene: {
    title: "Penthouse 42 Living Area & Server Alcove",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
    description:
      "A minimalist luxury penthouse overlooking the darkened metropolis. Floor-to-ceiling glass windows reflect emergency vehicle lights far below. Rohan Mehta lies beside the polished server credenza, an ethernet cable severed on the rug. The backup emergency track lighting casts harsh amber shadows across the scene.",
    hotspots: [
      {
        id: "bo-hs-1",
        evidenceId: "ev-301",
        label: "Smartwatch Biometric Monitor",
        xPercent: 44,
        yPercent: 72,
        previewText: "Rohan's titanium smartwatch frozen on the glass floor with shattered screen.",
      },
      {
        id: "bo-hs-2",
        evidenceId: "ev-302",
        label: "Server Alcove & Backup Log Console",
        xPercent: 78,
        yPercent: 50,
        previewText: "A wall-mounted touchscreen terminal displaying emergency battery telemetry.",
      },
      {
        id: "bo-hs-3",
        evidenceId: "ev-303",
        label: "Private Elevator Vestibule Keypad",
        xPercent: 14,
        yPercent: 46,
        previewText: "The brushed chrome door of Elevator B with its access badge sensor.",
      },
      {
        id: "bo-hs-4",
        evidenceId: "ev-304",
        label: "Glass Coffee Table & Broken Whiskey Glass",
        xPercent: 55,
        yPercent: 64,
        previewText: "A knocked-over glass table bearing twin coasters and a silver cufflink.",
      },
      {
        id: "bo-hs-5",
        evidenceId: "ev-305",
        label: "Encrypted Laptop & Calendar Cache",
        xPercent: 68,
        yPercent: 38,
        previewText: "An open laptop with local storage recovery tools running in the terminal.",
      },
      {
        id: "bo-hs-6",
        evidenceId: "ev-306",
        label: "Concierge Intercom Voicemail System",
        xPercent: 25,
        yPercent: 85,
        previewText: "Emergency phone recording capturing 10:09 PM struggle noises from the floor above.",
      },
      {
        id: "bo-hs-7",
        evidenceId: "ev-307",
        label: "Whistleblower Regulatory Drive",
        xPercent: 85,
        yPercent: 78,
        previewText: "An encrypted USB drive containing SEC whistleblower disclosures filed at 9:15 PM.",
      },
    ],
  },
  evidence: [
    {
      id: "ev-301",
      title: "Smartwatch Biometric Activity Log",
      category: "digital",
      description:
        "The continuous photoplethysmography heart-rate telemetry extracted from Rohan's titanium smartwatch.",
      image:
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80",
      discoveryLocation: "Victim's left wrist",
      availableObservations: [
        "10:00 PM: Resting heart rate 72 BPM.",
        "10:02 PM (Grid Blackout): Heart rate 78 BPM.",
        "10:07 PM: Sudden spike to 142 BPM (acute adrenaline surge).",
        "10:08 PM to 10:10 PM: Sustained exertion 174 BPM, accelerometer logs violent defensive thrashing.",
        "10:11 PM: Sudden cardiac cessation (flatline 0 BPM).",
        "Crucial Deduction: Rohan was unquestionably alive and fighting for his life during the blackout at 10:08 PM, directly disproving Dev's claim that Rohan was dead before 10:00 PM.",
      ],
      relatedSuspects: ["sus-dev"],
      relatedTimelineEvents: ["tl-31002", "tl-31008", "tl-31011"],
      isRedHerring: false,
      explanation:
        "The definitive biological proof establishing the true time of death at 10:11 PM during the blackout.",
    },
    {
      id: "ev-302",
      title: "Elevator B Auxiliary Power Telemetry Log",
      category: "digital",
      description:
        "System maintenance log from Meridian Tower's OTIS generator circuit. Records that Elevator B is tied to the emergency diesel loop and transferred power within 4 seconds of the blackout.",
      image:
        "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=600&q=80",
      discoveryLocation: "Basement engineering server rack",
      availableObservations: [
        "Elevator A (Public): Halted between Floor 38 and 39 at 10:02 PM with door interlocks frozen (Maya Kapoor trapped).",
        "Elevator B (Executive Express): Generator activated at 10:02:04 PM. Keycard #04 (Dev Arora) called the car at 10:04 PM, arrived at Floor 42 at 10:06 PM, and returned to the mezzanine at 10:14 PM.",
      ],
      relatedSuspects: ["sus-dev", "sus-maya"],
      relatedTimelineEvents: ["tl-31004", "tl-31014"],
      isRedHerring: false,
      explanation:
        "Exposes Dev Arora's secret transit to the 42nd floor during the blackout and verifies Maya's entrapment in Elevator A.",
    },
    {
      id: "ev-303",
      title: "Deleted Calendar Appointment: 'Dev Token Handover'",
      category: "digital",
      description:
        "A deleted calendar event recovered from the local browser SQLite cache on Rohan's laptop.",
      image:
        "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&w=600&q=80",
      discoveryLocation: "Victim's workstation in the server alcove",
      availableObservations: [
        "Time: 10:00 PM — 10:15 PM.",
        "Title: 'Dev: Escrow Recovery or FBI Referral'.",
        "Description: 'Dev must surrender the cold storage hardware key for the unauthorized 4.2M treasury drain before midnight or I notify special agents.'",
      ],
      relatedSuspects: ["sus-dev"],
      relatedTimelineEvents: ["tl-31000"],
      isRedHerring: false,
      explanation:
        "Establishes Dev's life-or-death motive: he was about to be turned over to the FBI for grand embezzlement.",
    },
    {
      id: "ev-304",
      title: "Rhea Sen's Lobby Access Snapshot & Inconsistent Clock",
      category: "photograph",
      description:
        "A CCTV freeze-frame showing Rhea Sen exiting the building turnstiles. The security camera timestamp reads '10:50 PM', which would place her in the lobby after the murder.",
      image:
        "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=600&q=80",
      discoveryLocation: "Ground floor concierge security DVR",
      availableObservations: [
        "Camera Clock Glitch: The building's older turnstile DVR clock was set to UTC+1 instead of local Eastern Time, running exactly one hour ahead.",
        "Real Time of Exit: Rhea actually exited at 9:50 PM, twelve minutes before the blackout began.",
        "Receipt Verification: Rhea's rideshare receipt confirms she was picked up outside the building at 9:53 PM.",
      ],
      relatedSuspects: ["sus-rhea"],
      relatedTimelineEvents: ["tl-30950"],
      isRedHerring: true,
      explanation:
        "Red herring. The 10:50 PM timestamp is an uncalibrated DVR clock artifact; Rhea had already left the building at 9:50 PM.",
    },
    {
      id: "ev-305",
      title: "Shielded Fiber-Optic Patch Cable with Silk Fibers",
      category: "physical",
      description:
        "The murder weapon: a 6-foot heavy armored network cable with steel-braided jacket used as a ligature. Microscopic examination reveals navy silk fibers trapped in the steel braid.",
      image:
        "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=600&q=80",
      discoveryLocation: "Tangled beside the credenza near the body",
      availableObservations: [
        "Ligature Mark Match: The dual steel braiding matches the patterned abrasion marks on Rohan's neck.",
        "Fiber Link: Navy silk fibers match the torn left sleeve lining of Dev Arora's bespoke wool blazer.",
      ],
      relatedSuspects: ["sus-dev"],
      relatedTimelineEvents: ["tl-31010"],
      isRedHerring: false,
      explanation:
        "Direct physical evidence linking Dev Arora's torn blazer sleeve to the murder weapon.",
    },
    {
      id: "ev-306",
      title: "Neighbor's Voicemail Interrupted by Noise",
      category: "audio",
      description:
        "A 32-second voicemail message left by neighbor Ishaan Khanna to his building concierge at 10:09 PM during the blackout.",
      image:
        "https://images.unsplash.com/photo-1589254065878-42c9da997008?auto=format&fit=crop&w=600&q=80",
      discoveryLocation: "Concierge telephone recording system",
      availableObservations: [
        "Audio Transcript: 'Concierge? The lights are off, but I'm hearing heavy crashing and furniture violently slamming right above me in 42... wait, someone is yelling...'",
        "Corroboration: Verifies that the struggle was actively occurring at 10:09 PM, perfectly coinciding with Rohan's 174 BPM heart spike.",
      ],
      relatedSuspects: ["sus-ishaan"],
      relatedTimelineEvents: ["tl-31008"],
      isRedHerring: false,
      explanation:
        "Corroborates the real-time violent struggle inside Penthouse 42 during the blackout.",
    },
    {
      id: "ev-307",
      title: "Maya Kapoor's Encrypted Whistleblower Dossier",
      category: "document",
      description:
        "A forensic audit file compiled by co-founder Maya Kapoor detailing $4.2M missing from the company staking smart contract.",
      image:
        "https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=600&q=80",
      discoveryLocation: "Maya Kapoor's briefcase",
      availableObservations: [
        "Whistleblower Submission: Maya had uploaded this document directly to the SEC tips portal at 9:15 PM that evening.",
        "Motive Analysis: Maya wanted Rohan arrested and publicly prosecuted to save the company's valuation, not murdered.",
      ],
      relatedSuspects: ["sus-maya"],
      relatedTimelineEvents: ["tl-30915"],
      isRedHerring: true,
      explanation:
        "Red herring. Maya suspected financial foul play, but she was whistleblowing through official regulatory channels.",
    },
  ],
  suspects: [
    {
      id: "sus-dev",
      name: "Dev Arora",
      occupation: "Personal Assistant & Operations Manager",
      portrait:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
      relationshipToVictim: "Trusted personal aide for 6 years with master keycard access.",
      publicMotive:
        "Siphoned $4.2M in company crypto into an offshore cold wallet; Rohan had scheduled an ultimatum.",
      privateHistory:
        "Dev was deep in luxury debt and believed he could pin the missing funds on an external hacker once Rohan was dead.",
      alibi:
        "Claims he arrived at 9:55 PM, found Rohan already dead on the floor, panicked in the dark, and never rode the elevator.",
      actualActions:
        "Arrived for the 10:00 PM appointment, rode Elevator B during the blackout using generator power at 10:04 PM, strangled Rohan with an armored cable at 10:08 PM, and deleted the calendar entry.",
      interviewStages: [
        {
          id: "int-dev-1",
          question: "When did you last see Rohan alive?",
          response:
            "I arrived at 9:55 PM to drop off dinner. The lights were already flickering. When I unlocked the door, Rohan was already lying face down in the dark! I was terrified, so I backed away and ran downstairs.",
        },
        {
          id: "int-dev-2",
          question: "Rohan's smartwatch recorded a heart rate of 174 BPM and a violent struggle at 10:08 PM. How was he dead at 9:55 PM?",
          requiredEvidenceId: "ev-301",
          response:
            "That... that watch must have glitched during the power outage! Smartwatches aren't medical equipment! You can't convict someone based on a bluetooth fitness tracker!",
          exposesContradiction: true,
          revealsNote: "Dev's claim that Rohan was dead before 10:00 PM is directly shattered by biometric heart telemetry.",
        },
        {
          id: "int-dev-3",
          question: "The backup power log proves you rode Elevator B up to Floor 42 at 10:06 PM during the blackout.",
          requiredEvidenceId: "ev-302",
          response:
            "I... someone must have stolen my badge! I was on the stairs! Wait, no... I took the elevator to check on him, that's what I meant!",
          revealsNote: "Dev is caught in a fatal contradiction regarding elevator transit during the blackout.",
        },
      ],
    },
    {
      id: "sus-maya",
      name: "Maya Kapoor",
      occupation: "Co-Founder & Chief Technology Officer",
      portrait:
        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80",
      relationshipToVictim: "Co-founder of 8 years; escalating corporate dispute.",
      publicMotive:
        "Discovered Rohan's platform had multi-million dollar accounting discrepancies.",
      privateHistory:
        "Maya had already sent a formal whistleblower dossier to the SEC and was trapped in Elevator A when power failed.",
      alibi:
        "Trapped in public Elevator A between Floors 38 and 39 during the entire 18-minute blackout.",
      actualActions:
        "Remained inside Elevator A until building maintenance manually cranked the car down at 10:28 PM.",
      interviewStages: [
        {
          id: "int-maya-1",
          question: "Where were you during the 18 minutes of darkness?",
          response:
            "I was trapped in the public elevator between floors 38 and 39! The emergency bell was screaming and the ventilation fan stopped. Maintenance didn't get us out until nearly 10:30 PM. Ask the building engineer!",
          unlocksEvidenceId: "ev-307",
        },
        {
          id: "int-maya-2",
          question: "Did you suspect Rohan was stealing company funds?",
          requiredEvidenceId: "ev-307",
          response:
            "I didn't suspect—I knew! But it was Dev who had key access to the hot wallets. I filed a whistleblower complaint at 9:15 PM. I wanted Rohan in federal court, not dead in his penthouse.",
          revealsNote: "Maya proves her entrapment in Elevator A and points the finger at Dev's wallet access.",
        },
      ],
    },
    {
      id: "sus-ishaan",
      name: "Ishaan Khanna",
      occupation: "Floor 41 Neighbor & Venture Investor",
      portrait:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80",
      relationshipToVictim: "Neighbor directly beneath the penthouse.",
      publicMotive:
        "Rohan had recently pulled out of a major funding round for Ishaan's fund.",
      privateHistory:
        "Ishaan is an anxious investor who was annoyed by recurring penthouse parties. He called the front desk when he heard the fight.",
      alibi:
        "Inside his 41st-floor apartment calling the concierge to complain about ceiling noise.",
      actualActions:
        "Recorded the voicemail at 10:09 PM while listening to the violent struggle on the floor above.",
      interviewStages: [
        {
          id: "int-ishaan-1",
          question: "What did you hear during the blackout, Mr. Khanna?",
          response:
            "At 10:08 PM, the floorboards above me started shuddering. It sounded like two men knocking over furniture and wrestling across the glass floor. I dialed the concierge immediately.",
          unlocksEvidenceId: "ev-306",
        },
        {
          id: "int-ishaan-2",
          question: "We listened to your 10:09 PM voicemail.",
          requiredEvidenceId: "ev-306",
          response:
            "Exactly! You can hear the thuds in the background of my voicemail. The fight was happening right then, while the lights were out.",
          revealsNote: "Ishaan's call confirms the exact minute of the violent struggle.",
        },
      ],
    },
    {
      id: "sus-rhea",
      name: "Rhea Sen",
      occupation: "Former Partner & Design Director",
      portrait:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80",
      relationshipToVictim: "Ex-fiancée and shareholder.",
      publicMotive:
        "Bitter romantic breakup involving disputed penthouse tenancy rights.",
      privateHistory:
        "Rhea came to pick up her remaining personal belongings, had a brief argument, and left before 10:00 PM.",
      alibi:
        "Left the building before 10:00 PM; her rideshare picked her up at 9:53 PM.",
      actualActions:
        "Departed at 9:50 PM. The 10:50 PM camera stamp was caused by a Daylight Saving DVR time-zone offset.",
      interviewStages: [
        {
          id: "int-rhea-1",
          question: "The security camera captured you exiting at 10:50 PM.",
          requiredEvidenceId: "ev-304",
          response:
            "That camera is wrong! Check my Uber receipt! I was in a car crossing the Queensboro Bridge by 10:05 PM! The lobby clock has been an hour fast since the autumn time change!",
          revealsNote: "Rhea explains the 1-hour camera DVR offset, verified by her rideshare receipt.",
        },
      ],
    },
  ],
  timeline: [
    {
      id: "tl-30915",
      time: "9:15 PM",
      sortOrder: 1,
      title: "Maya Submits Whistleblower Report",
      description: "Maya Kapoor uploads evidence of $4.2M missing crypto to SEC portal.",
      reliability: "verified",
      source: "Encrypted Regulatory Submission Log",
      relatedEvidence: ["ev-307"],
      relatedSuspects: ["sus-maya"],
    },
    {
      id: "tl-30950",
      time: "9:50 PM",
      sortOrder: 2,
      title: "Rhea Sen Exits Meridian Tower",
      description: "Rhea leaves following property pickup; rideshare arrives at 9:53 PM.",
      reliability: "verified",
      source: "Rideshare GPS Telemetry",
      relatedEvidence: ["ev-304"],
      relatedSuspects: ["sus-rhea"],
    },
    {
      id: "tl-31000",
      time: "10:00 PM",
      sortOrder: 3,
      title: "Deleted Meeting: Dev Token Handover",
      description: "Scheduled confrontation between Rohan and Dev regarding stolen treasury funds.",
      reliability: "verified",
      source: "Recovered SQLite Database",
      relatedEvidence: ["ev-303"],
      relatedSuspects: ["sus-dev"],
    },
    {
      id: "tl-31002",
      time: "10:02 PM",
      sortOrder: 4,
      title: "Citywide Grid Blackout Hits",
      description: "Main grid collapses for 18 minutes. Elevator A halts with Maya inside; Elevator B transfers to backup diesel loop.",
      reliability: "verified",
      source: "Municipal Power Grid Dispatch",
      relatedEvidence: ["ev-302"],
      relatedSuspects: ["sus-maya", "sus-dev"],
    },
    {
      id: "tl-31004",
      time: "10:04 PM",
      sortOrder: 5,
      title: "Dev Takes Elevator B to Floor 42",
      description: "Dev Arora badges into generator-backed Elevator B and ascends to the penthouse.",
      reliability: "verified",
      source: "Elevator B Generator Log",
      relatedEvidence: ["ev-302"],
      relatedSuspects: ["sus-dev"],
    },
    {
      id: "tl-31008",
      time: "10:08 PM",
      sortOrder: 6,
      title: "Violent Struggle in Dark Penthouse",
      description: "Rohan's heart rate surges to 174 BPM. Ishaan Khanna records neighbor voicemail capturing loud crashing.",
      reliability: "verified",
      source: "Smartwatch Biometrics & Audio Voicemail",
      relatedEvidence: ["ev-301", "ev-306"],
      relatedSuspects: ["sus-dev", "sus-ishaan"],
    },
    {
      id: "tl-31011",
      time: "10:11 PM",
      sortOrder: 7,
      title: "Cardiac Cessation (Murder Complete)",
      description: "Rohan is strangled with armored network cable; heart rate flatlines to 0 BPM.",
      reliability: "verified",
      source: "Smartwatch Biometrics",
      relatedEvidence: ["ev-301", "ev-305"],
      relatedSuspects: ["sus-dev"],
    },
    {
      id: "tl-31014",
      time: "10:14 PM",
      sortOrder: 8,
      title: "Dev Returns Down Elevator B",
      description: "Dev descends in Elevator B with torn blazer sleeve before grid restoration.",
      reliability: "verified",
      source: "Elevator Telemetry",
      relatedEvidence: ["ev-302", "ev-305"],
      relatedSuspects: ["sus-dev"],
    },
    {
      id: "tl-31020",
      time: "10:20 PM",
      sortOrder: 9,
      title: "Grid Restored Across District",
      description: "City power returns; emergency sirens sound.",
      reliability: "verified",
      source: "Grid Operator Log",
      relatedEvidence: ["ev-302"],
      relatedSuspects: [],
    },
  ],
  solution: {
    culpritId: "sus-dev",
    motive:
      "Rohan discovered Dev had embezzled $4.2M in cryptocurrency and threatened to turn him over to the FBI unless the private key was surrendered at 10:00 PM.",
    method:
      "Dev took generator-backed Elevator B to Floor 42 during the blackout, attacked Rohan in the dark, and strangled him with an armored fiber cable at 10:08 PM.",
    decisiveEvidenceIds: ["ev-301", "ev-302", "ev-305"],
    alibiContradiction:
      "Dev swore that Rohan was already dead at 9:55 PM and that the elevators were unusable, but Rohan's smartwatch proved a violent struggle at 10:08 PM, and Elevator B's backup power log tracked Dev's ascent during the blackout.",
    chronologicalSequence: [
      "9:50 PM: Rhea exits the building; camera clock is 1 hour fast.",
      "10:00 PM: Rohan awaits Dev for the deleted crypto confrontation.",
      "10:02 PM: Citywide blackout strikes. Elevator A halts; Elevator B switches to generator within 4 seconds.",
      "10:04 PM: Dev rides Elevator B to Floor 42.",
      "10:08 PM: Dev attacks Rohan; Rohan's heart rate spikes to 174 BPM, recorded by smartwatch and Ishaan's voicemail.",
      "10:11 PM: Rohan is strangled to death with the fiber cable, tearing Dev's silk sleeve.",
      "10:14 PM: Dev takes Elevator B back down to the mezzanine.",
      "10:20 PM: City grid power is restored.",
    ],
    innocentSuspectExplanations: {
      "sus-maya":
        "Maya was trapped in public Elevator A between floors 38 and 39 during the entire blackout, as verified by elevator interlock logs.",
      "sus-ishaan":
        "Ishaan was in his own apartment listening to the noise above and recorded the 10:09 PM voicemail that corroborated the real struggle.",
      "sus-rhea":
        "Rhea left at 9:50 PM; the 10:50 PM video stamp was an unadjusted Daylight Saving offset on an uncalibrated DVR.",
    },
    redHerringExplanations: {
      "ev-304":
        "The 10:50 PM camera timestamp on Rhea's exit was a 1-hour DVR clock discrepancy.",
      "ev-307":
        "Maya's whistleblower dossier seemed like a motive for corporate betrayal, but showed she sought legal prosecution, not murder.",
    },
    fullResolutionNarrative:
      "When confronted with the biometric smartwatch telemetry proving Rohan fought at 10:08 PM and the matching silk fibers from his torn blazer embedded in the armored cable, Dev Arora confessed. He had stolen the funds to cover astronomical sports gambling debts and panicked when Rohan gave him a midnight deadline. Dev was taken into federal custody.",
  },
  difficultyHints: {
    easy: [
      "Inspect the victim's smartwatch telemetry. When did his heart rate actually flatline?",
      "Did both elevators lose power during the blackout? Check the generator telemetry.",
      "Look at the fibers embedded in the armored network cable.",
    ],
    medium: [
      "One suspect claims the victim was already dead before the power went out. Do biometrics agree?",
      "An apparent timestamp on camera footage may be affected by daylight saving or time zone settings.",
      "Check the private elevator logs—was someone using it during the power failure?",
    ],
    hard: [
      "Reconcile the neighbor's real-time voicemail timestamp with the victim's physiological exertion curve.",
      "Identify which elevator was connected to the auxiliary generator circuit.",
      "Recover the motive from the deleted local calendar data.",
    ],
    "very-hard": [
      "Compare the exact second-level elevator door interlock records with the 18-minute grid blackout window.",
      "Dissect the difference between UTC DVR recordings and local pickup timestamps.",
      "Map the physical ligature weave against the suspect's torn garment.",
    ],
  },
  deductionFormOptions: {
    motives: [
      { id: "mot-crypto-embezzle", label: "Cover up $4.2M cryptocurrency embezzlement before FBI referral" },
      { id: "mot-whistleblower-silence", label: "Prevent SEC whistleblower dossier from being filed" },
      { id: "mot-penthouse-rights", label: "Dispute over luxury penthouse tenancy and breakup assets" },
      { id: "mot-venture-capital", label: "Retaliation for canceled venture fund investment round" },
    ],
    methods: [
      { id: "meth-fiber-cable", label: "Ascended via generator Elevator B during blackout, strangled with armored cable" },
      { id: "meth-poisoned-drink", label: "Slipped poison into Rohan's scotch before the blackout occurred" },
      { id: "meth-stairwell-ambush", label: "Ambushed Rohan in the unlit fire stairwell at 9:55 PM" },
      { id: "meth-balcony-push", label: "Forced Rohan over the 42nd-floor balcony railing into the darkness" },
    ],
    contradictions: [
      { id: "con-smartwatch-heart", label: "Smartwatch recorded heart rate spike of 174 BPM at 10:08 PM, disproving death at 9:55 PM" },
      { id: "con-dvr-clock", label: "Rhea's exit timestamp was 1 hour fast due to DVR time zone configuration" },
      { id: "con-elevator-trap", label: "Maya was trapped between floors 38 and 39 in public Elevator A" },
      { id: "con-voicemail-audio", label: "Ishaan's voicemail captured the fight at 10:09 PM in real time" },
    ],
  },
};
