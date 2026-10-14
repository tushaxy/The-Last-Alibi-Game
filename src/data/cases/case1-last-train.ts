import { Case } from "@/types/game";

export const case1LastTrain: Case = {
  id: "case-001",
  slug: "the-last-train",
  caseNumber: "CASE 001",
  title: "The Last Train",
  genre: "Classic Detective Mystery",
  tagline: "Five passengers. One dead man. A train that never stopped.",
  synopsis:
    "At 11:40 PM, wealthy antiques dealer Adrian Vale is found dead in his private first-class railway compartment aboard the night express. The door was bolted from the inside, and five passengers swear ironclad alibis. But every locked door has a secret, and every alibi has a crack.",
  incidentDate: "October 14, 1948",
  incidentLocation: "First-Class Carriage B // Zurich-Vienna Night Express",
  defaultDifficulty: "easy",
  estimatedMinutes: 25,
  coverImage:
    "https://images.unsplash.com/photo-1517649763962-0c623266ddc0?auto=format&fit=crop&w=1200&q=80",
  victim: {
    name: "Adrian Vale",
    age: 52,
    occupation: "Antiquities Dealer & Gallery Owner",
    causeOfDeath: "Acute Digitalis Glycoside Poisoning (Administered in vintage port)",
    summary:
      "A fastidious and ruthless antiquities collector who made a fortune sourcing rare Byzantine artifacts. Known to maintain meticulous accounts and keep enemies close.",
    portrait:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
  },
  crimeScene: {
    title: "Compartment B — First Class Carriage",
    image:
      "https://images.unsplash.com/photo-1541888946425-d0fbb186c5f7?auto=format&fit=crop&w=1200&q=80",
    description:
      "The mahogany-paneled compartment is dimly lit by a brass sconce. Adrian Vale sits slouched in the velvet corner armchair, a half-empty crystal tumbler of tawny port beside him on the burled walnut folding desk. The corridor door features an overhead ventilation louvre and a heavy brass slide deadbolt.",
    hotspots: [
      {
        id: "hs-1",
        evidenceId: "ev-001",
        label: "Gold Pocket Watch",
        xPercent: 42,
        yPercent: 64,
        previewText: "A gold pocket watch rests on the mahogany table with cracked crystal.",
      },
      {
        id: "hs-2",
        evidenceId: "ev-002",
        label: "Poured Port Tumbler",
        xPercent: 54,
        yPercent: 62,
        previewText: "A crystal glass containing deep crimson sediment at the base.",
      },
      {
        id: "hs-3",
        evidenceId: "ev-003",
        label: "Door Deadbolt & Louvre",
        xPercent: 88,
        yPercent: 32,
        previewText: "The heavy brass sliding latch mechanism beneath the ventilation louvre.",
      },
      {
        id: "hs-4",
        evidenceId: "ev-004",
        label: "Overcoat & Torn Ticket",
        xPercent: 18,
        yPercent: 48,
        previewText: "Adrian's wool traveling coat hanging on the brass wall peg.",
      },
      {
        id: "hs-5",
        evidenceId: "ev-005",
        label: "Burled Walnut Desk Drawer",
        xPercent: 35,
        yPercent: 78,
        previewText: "A partially opened drawer containing correspondence and carbon invoices.",
      },
    ],
  },
  evidence: [
    {
      id: "ev-001",
      title: "Stopped Gold Pocket Watch",
      category: "physical",
      description:
        "Adrian Vale's antique Swiss pocket watch. The crystal lens is cracked across the face, and both hands are frozen precisely at 11:42 PM.",
      image:
        "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=600&q=80",
      discoveryLocation: "On the walnut folding table beside the victim's left hand",
      availableObservations: [
        "Visual Inspection: The crystal face is cracked, hands pointed to 11:42.",
        "Forensic Watchmaker Analysis: The internal fusee spring was deliberately unwound and wedged with a minute velvet thread. The watch did not stop from trauma; it was manually rigged to 11:42 PM to forge a false time of death.",
        "Corroboration: Adrian's coat pocket contained a railway telegraph received at 10:48 PM, but Adrian never unsealed it, indicating he was incapacitated before 10:48 PM.",
      ],
      relatedSuspects: ["sus-marcus", "sus-thomas"],
      relatedTimelineEvents: ["tl-1142", "tl-1045"],
      isRedHerring: false,
      explanation:
        "The murderer intentionally rigged the watch hands to 11:42 PM to establish a false post-midnight time of death, when in reality Adrian died between 10:40 PM and 10:50 PM.",
    },
    {
      id: "ev-002",
      title: "Crystal Tumbler with Bitter Residue",
      category: "forensic",
      description:
        "Half-drained tumbler of vintage port. Analysis of the sediment reveals a lethal concentration of purified digitalis glycoside.",
      image:
        "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=600&q=80",
      discoveryLocation: "Walnut folding desk inside Compartment B",
      availableObservations: [
        "Chemical Screen: High concentration of Foxglove (digitalis) extract.",
        "Pharmacology Note: Ingestion causes cardiac arrest within 15 to 25 minutes.",
        "Carafe Inspection: Only the tumbler contained poison; the decanter bottle was clean, proving the toxin was stirred directly into his glass.",
      ],
      relatedSuspects: ["sus-marcus", "sus-simon"],
      relatedTimelineEvents: ["tl-1030"],
      isRedHerring: false,
      explanation:
        "The digitalis was administered directly into Adrian's glass during a private conversation around 10:30 PM.",
    },
    {
      id: "ev-003",
      title: "Waxed Olive Thread on Door Louvre",
      category: "physical",
      description:
        "A 3-inch strand of frayed olive-green waxed binding thread caught in the interior brass slat of the door ventilation louvre directly above the deadbolt.",
      image:
        "https://images.unsplash.com/photo-1594904351111-a072f80b1a71?auto=format&fit=crop&w=600&q=80",
      discoveryLocation: "Ventilation louvre above Compartment B sliding door",
      availableObservations: [
        "Fiber Test: High-tensile linen thread treated with green beeswax, commonly used by antiquities bookbinders and archivist portfolios.",
        "Mechanism Deduction: The thread was looped around the interior sliding bolt from the outside through the louvre slats. When pulled tight from the corridor, it slid the bolt into the locked bracket, then snapped.",
        "Luggage Cross-Check: Marcus Reed's leather executive portfolio contains an identical spool of olive-green waxed archival thread.",
      ],
      relatedSuspects: ["sus-marcus"],
      relatedTimelineEvents: ["tl-1040"],
      isRedHerring: false,
      explanation:
        "The decisive mechanical proof showing how Marcus locked the door from the corridor after poisoning Adrian.",
    },
    {
      id: "ev-004",
      title: "Torn Railway Ticket & Conductor Punch",
      category: "document",
      description:
        "Adrian Vale's First-Class ticket with an irregular double-tear on the border and a purple diamond conductor punch mark.",
      image:
        "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=600&q=80",
      discoveryLocation: "Inside the inner breast pocket of Adrian's wool traveling coat",
      availableObservations: [
        "Punch Mark: Diamond punch signifies verification at St. Anton station at 9:55 PM.",
        "Irregular Tear: The tear matches the conductor's manual clipper, which jammed during the 10:00 PM inspection round.",
      ],
      relatedSuspects: ["sus-thomas"],
      relatedTimelineEvents: ["tl-0955"],
      isRedHerring: true,
      explanation:
        "Red herring. The ticket punch simply proves Adrian was alive and in his cabin at 9:55 PM when Thomas Bell inspected tickets.",
    },
    {
      id: "ev-005",
      title: "Handwritten Ultimatum Letter (Torn Page)",
      category: "document",
      description:
        "A draft letter in Adrian's handwriting addressed to 'M.R.', demanding the immediate restitution of £45,000 diverted from the Byzantine collection before arrival in Vienna, or the police will be waiting at Westbahnhof.",
      image:
        "https://images.unsplash.com/photo-1586075010923-2dd4570fb338?auto=format&fit=crop&w=600&q=80",
      discoveryLocation: "Victim's leather blotter in the desk drawer",
      availableObservations: [
        "Handwriting: Adrian Vale's distinctive angular script.",
        "Content: Explicitly accuses business partner Marcus Reed of embezzlement and art forgery.",
        "Margin Note: 'I have the forged provenance certificates in my safe at the gallery. Your signature is on every customs bond.'",
      ],
      relatedSuspects: ["sus-marcus"],
      relatedTimelineEvents: ["tl-1025"],
      isRedHerring: false,
      explanation:
        "Establishes Marcus Reed's life-or-death motive: exposure would mean ruination and a long prison sentence.",
    },
    {
      id: "ev-006",
      title: "Dining Car Service Log & Galley Fire Report",
      category: "document",
      description:
        "Official railway log recorded by Head Steward Richter. Notes that an electrical short circuit in the dining galley stove at 10:15 PM caused heavy smoke, forcing the full evacuation and closure of the dining car until 11:45 PM.",
      image:
        "https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=600&q=80",
      discoveryLocation: "Service locker in Carriage C",
      availableObservations: [
        "Closure Timestamp: 10:15 PM to 11:45 PM.",
        "Passenger Clearance: All patrons were escorted back to their sleeping compartments by 10:20 PM.",
        "Contradiction Impact: Directly shatters Marcus Reed's alibi of 'drinking in the dining car until 11:35 PM.'",
      ],
      relatedSuspects: ["sus-marcus"],
      relatedTimelineEvents: ["tl-1015", "tl-1020"],
      isRedHerring: false,
      explanation:
        "The critical timeline contradiction: Marcus could not have been sitting in the dining car between 10:20 PM and 11:35 PM because it was evacuated and locked.",
    },
    {
      id: "ev-007",
      title: "Altered Dining Car Receipt #442",
      category: "document",
      description:
        "A receipt produced by Marcus Reed purporting to show an order of Glenfiddich at 11:20 PM in the dining car.",
      image:
        "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=600&q=80",
      discoveryLocation: "Presented by Marcus Reed during interrogation",
      availableObservations: [
        "Timestamp Inspection: The printed time originally read '09:20 PM'. A fountain pen with black ink was used to alter the leading zero and nine into '11'.",
        "Watermark: Carbon copy slip from the 9:00 PM dinner service, not the late-night shift.",
      ],
      relatedSuspects: ["sus-marcus"],
      relatedTimelineEvents: ["tl-0920", "tl-1120"],
      isRedHerring: false,
      explanation:
        "Forged evidence submitted by Marcus to support his fabricated alibi.",
    },
    {
      id: "ev-008",
      title: "Dr. Cross's Physician Bag & Intact Morphine Seals",
      category: "forensic",
      description:
        "The medical kit of passenger Dr. Simon Cross. All ampoules of morphine, chloral hydrate, and digitalis remain sealed under lead hospital tamper ribbons.",
      image:
        "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=600&q=80",
      discoveryLocation: "Luggage rack in Compartment E",
      availableObservations: [
        "Audit: Zero vials opened or missing.",
        "Medical Record: Dr. Cross is a retired surgeon with severe arthritis in both hands, making intricate knot or thread manipulation physically impossible.",
      ],
      relatedSuspects: ["sus-simon"],
      relatedTimelineEvents: ["tl-1030"],
      isRedHerring: true,
      explanation:
        "Exonerates Dr. Simon Cross, whose professional background made him an obvious suspect.",
    },
    {
      id: "ev-009",
      title: "Clara Finch's Investigation Notebook",
      category: "document",
      description:
        "Shorthand notepad belonging to journalist Clara Finch containing detailed timestamps of passenger corridor movements.",
      image:
        "https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&w=600&q=80",
      discoveryLocation: "Clara Finch's traveling satchel in Compartment D",
      availableObservations: [
        "Entry 10:25 PM: 'Saw Marcus Reed enter Adrian's compartment holding a buff folder.'",
        "Entry 10:42 PM: 'Marcus slipped out into the corridor, looking agitated. Stood by the door for two minutes adjusting something near the top frame before heading toward Carriage A.'",
        "Entry 10:45 PM to 11:20 PM: 'Eleanor Vale visited Compartment D to discuss the divorce settlement terms.'",
      ],
      relatedSuspects: ["sus-clara", "sus-marcus", "sus-eleanor"],
      relatedTimelineEvents: ["tl-1025", "tl-1042"],
      isRedHerring: false,
      explanation:
        "Eyewitness corroboration placing Marcus Reed at the murder scene at 10:42 PM and confirming Eleanor Vale's alibi.",
    },
  ],
  suspects: [
    {
      id: "sus-eleanor",
      name: "Eleanor Vale",
      occupation: "Estranged Wife & Beneficiary",
      portrait:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80",
      relationshipToVictim: "Separated spouse of 14 years; currently negotiating a bitter financial divorce.",
      publicMotive:
        "Stands to inherit Adrian's entire estate under a 1938 will that had not yet been modified.",
      privateHistory:
        "Eleanor knew Adrian was hiding overseas accounts, but she was actively cooperating with journalist Clara Finch to expose the hidden assets legally through the courts.",
      alibi:
        "Claims she spent the entire period between 10:30 PM and 11:20 PM in Compartment D speaking with Clara Finch.",
      actualActions:
        "She was genuinely in Compartment D reviewing bank disclosures with Clara Finch.",
      interviewStages: [
        {
          id: "int-eleanor-1",
          question: "Where were you between 10:30 PM and 11:30 PM?",
          response:
            "I was with Miss Finch in Compartment D. We were going over Adrian's Swiss bank disclosures. I despise my husband, but I wanted him ruined in court, not murdered on a railway car.",
        },
        {
          id: "int-eleanor-2",
          question: "Did you speak to Adrian this evening?",
          response:
            "Only on the platform at Zurich before boarding. He was mocking me, claiming I would not see a penny. Then Marcus Reed pulled him aside, and they boarded together.",
        },
        {
          id: "int-eleanor-3",
          question: "Did Adrian ever mention threats to his life?",
          requiredEvidenceId: "ev-005",
          response:
            "That letter... Adrian told me Marcus had stolen thousands through forged Byzantine provenance certificates. Adrian was terrified that Scotland Yard would seize his gallery. He was going to turn Marcus in the moment we reached Vienna.",
          revealsNote: "Eleanor confirms Adrian discovered Marcus's embezzlement and forgery.",
        },
      ],
    },
    {
      id: "sus-marcus",
      name: "Marcus Reed",
      occupation: "Antiquities Business Partner",
      portrait:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
      relationshipToVictim: "Junior partner at Vale & Reed Fine Antiquities.",
      publicMotive:
        "Facing exposure for massive embezzlement and art forgery that Adrian was about to report.",
      privateHistory:
        "Marcus had amassed severe gambling debts and forged authentication papers for counterfeit Greek and Byzantine relics. Adrian discovered the audit discrepancies that morning.",
      alibi:
        "Claims he was relaxing and drinking scotch in the First Class Dining Car from 10:20 PM until 11:35 PM, offering Receipt #442 as proof.",
      actualActions:
        "Entered Adrian's compartment at 10:25 PM, poisoned his port with digitalis, locked the door from the corridor using olive thread at 10:42 PM, and forged his receipt.",
      interviewStages: [
        {
          id: "int-marcus-1",
          question: "What was your relationship with Adrian like today?",
          response:
            "Cordial as always. We had a brief drink before departure to toast our Vienna exhibition. Adrian was in high spirits.",
        },
        {
          id: "int-marcus-2",
          question: "Can you account for your movements after 10:00 PM?",
          response:
            "I went straight to the Dining Car at 10:20 PM. I stayed there reading the paper and nursing a Glenfiddich until around 11:35 PM when the attendant announced the final station call. Here is my receipt.",
        },
        {
          id: "int-marcus-3",
          question: "The Dining Car was evacuated and closed at 10:15 PM due to an electrical fire. How could you be there?",
          requiredEvidenceId: "ev-006",
          response:
            "What? That... there must be a mistake in the conductor's log. I was sitting at a corner table... perhaps the smoke was minor... I must have lost track of time...",
          exposesContradiction: true,
          revealsNote: "Marcus's alibi is shattered by the Dining Car emergency evacuation log.",
        },
        {
          id: "int-marcus-4",
          question: "We found waxed olive thread in the door louvre matching your leather portfolio. How did it get there?",
          requiredEvidenceId: "ev-003",
          response:
            "I... that thread is standard archival twine! Thousands of bookbinders use it! You cannot prove I touched that lock!",
          revealsNote: "Marcus panics when confronted with the physical thread evidence from the door lock.",
        },
      ],
    },
    {
      id: "sus-simon",
      name: "Dr. Simon Cross",
      occupation: "Retired Railway Surgeon",
      portrait:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
      relationshipToVictim: "Casual acquaintance through the Zurich Antiquarian Society.",
      publicMotive:
        "Adrian had outbid him on an irreplaceable 16th-century anatomical treatise.",
      privateHistory:
        "Dr. Cross suffers from progressive rheumatoid arthritis. He travels with a standard physician bag containing pain management drugs.",
      alibi:
        "Took a sleeping draught at 10:00 PM and slept in Compartment E until awakened by the attendant's shout at 11:40 PM.",
      actualActions:
        "Remained in his cabin asleep. His medical supplies are fully intact.",
      interviewStages: [
        {
          id: "int-simon-1",
          question: "Did you examine Adrian Vale after he was discovered?",
          response:
            "Attendant Bell summoned me at 11:42 PM. Adrian had no pulse, his pupils were dilated, and his lips cyanotic. Rigor had already set in along his jaw. He had been dead for at least 45 minutes.",
        },
        {
          id: "int-simon-2",
          question: "You have digitalis in your professional inventory, correct?",
          requiredEvidenceId: "ev-002",
          response:
            "Of course, for cardiac patients. But inspect my bag: every ampoule has an unbroken lead hospital seal. Furthermore, look at my swollen knuckles—I can barely grip a pen, let alone rig an intricate mechanical device.",
          revealsNote: "Dr. Cross's medical seals are unbroken, and his severe arthritis rules out nimble thread tricks.",
        },
      ],
    },
    {
      id: "sus-clara",
      name: "Clara Finch",
      occupation: "Investigative Journalist",
      portrait:
        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80",
      relationshipToVictim: "Investigating Adrian Vale's syndicate for the Vienna Daily Chronicle.",
      publicMotive:
        "Adrian had threatened to file criminal libel charges against her newspaper.",
      privateHistory:
        "Clara had spent four months tracking Vale & Reed's antiquities smuggling route. She was documenting everyone entering and leaving Carriage B.",
      alibi:
        "Was in Compartment D interviewing Eleanor Vale between 10:30 PM and 11:20 PM.",
      actualActions:
        "She sat in her compartment with the door ajar, recording corridor movements in her notebook.",
      interviewStages: [
        {
          id: "int-clara-1",
          question: "What were you doing aboard this train, Miss Finch?",
          response:
            "Doing my job. Adrian Vale was running a criminal syndicate passing off forged Byzantine bronzes to American museums. I followed him onto the train to obtain proof.",
        },
        {
          id: "int-clara-2",
          question: "Did you see anyone enter Compartment B?",
          response:
            "Yes! At 10:25 PM, Marcus Reed went in carrying a portfolio. Around 10:42 PM, Marcus slipped out, paused by the transom louvre with raised hands, and hurried off toward Carriage A.",
          revealsNote: "Clara witnessed Marcus Reed exiting Adrian's compartment at 10:42 PM and tampering with the door frame.",
        },
      ],
    },
    {
      id: "sus-thomas",
      name: "Thomas Bell",
      occupation: "First-Class Carriage Attendant",
      portrait:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80",
      relationshipToVictim: "Attendant responsible for First-Class Carriage B.",
      publicMotive:
        "Adrian had reported him for alleged passenger luggage pilfering on the previous month's run.",
      privateHistory:
        "Bell accepted small bribes to look the other way for passenger liaisons. He was in the service pantry when the murder occurred.",
      alibi:
        "Was assisting with the dining car evacuation from 10:15 PM until 10:50 PM, then making rounds.",
      actualActions:
        "Assisted with the dining car smoke clearing, returned to Carriage B at 11:35 PM, and found Adrian dead at 11:40 PM.",
      interviewStages: [
        {
          id: "int-thomas-1",
          question: "How did you discover the body at 11:40 PM?",
          response:
            "I knocked to prepare Mr. Vale's berth for the overnight leg. There was no answer. I tried my conductor master key, but the inside deadbolt was thrown solid. I peered through the louvre and saw him motionless in the chair.",
        },
        {
          id: "int-thomas-2",
          question: "Could someone lock that deadbolt from the outside without a key?",
          requiredEvidenceId: "ev-003",
          response:
            "Normally impossible, sir! It is a heavy sliding deadbolt. But if someone looped a string through the top ventilation louvre... yes, with enough leverage, you could pull the latch handle sideways from the corridor and snap the cord.",
          revealsNote: "Attendant Bell confirms the ventilation louvre permits pulling the deadbolt closed with string.",
        },
      ],
    },
  ],
  timeline: [
    {
      id: "tl-0915",
      time: "9:15 PM",
      sortOrder: 1,
      title: "Zurich Platform Departure",
      description: "The Zurich-Vienna Night Express departs on schedule. Adrian Vale boards Carriage B.",
      reliability: "verified",
      source: "Railway Station Master Dispatch",
      relatedEvidence: ["ev-004"],
      relatedSuspects: ["sus-eleanor", "sus-marcus"],
    },
    {
      id: "tl-0955",
      time: "9:55 PM",
      sortOrder: 2,
      title: "Ticket Verification Round",
      description: "Thomas Bell punches Adrian Vale's first-class ticket at St. Anton station.",
      reliability: "verified",
      source: "Conductor Ticket Punch Log",
      relatedEvidence: ["ev-004"],
      relatedSuspects: ["sus-thomas"],
    },
    {
      id: "tl-1015",
      time: "10:15 PM",
      sortOrder: 3,
      title: "Dining Car Electrical Fire & Evacuation",
      description: "Galley stove electrical short circuit forces immediate closure of Dining Car C.",
      reliability: "verified",
      source: "Head Steward Incident Report",
      relatedEvidence: ["ev-006"],
      relatedSuspects: ["sus-marcus", "sus-thomas"],
    },
    {
      id: "tl-1025",
      time: "10:25 PM",
      sortOrder: 4,
      title: "Marcus Reed Enters Compartment B",
      description: "Marcus enters Adrian's compartment carrying a portfolio. Bitter argument ensues.",
      reliability: "reported",
      source: "Clara Finch Journal Log",
      relatedEvidence: ["ev-005", "ev-009"],
      relatedSuspects: ["sus-marcus"],
    },
    {
      id: "tl-1030",
      time: "10:30 PM",
      sortOrder: 5,
      title: "Lethal Port Poisoning",
      description: "Digitalis poison is introduced into Adrian Vale's crystal port tumbler.",
      reliability: "verified",
      source: "Forensic Toxicology Analysis",
      relatedEvidence: ["ev-002"],
      relatedSuspects: ["sus-marcus"],
    },
    {
      id: "tl-1042",
      time: "10:42 PM",
      sortOrder: 6,
      title: "Marcus Exits & Rigs Deadbolt Lock",
      description: "Marcus Reed exits into corridor, uses waxed olive thread through louvre to throw the deadbolt, snaps cord, and flees.",
      reliability: "verified",
      source: "Physical Fiber & Witness Log",
      relatedEvidence: ["ev-003", "ev-009"],
      relatedSuspects: ["sus-marcus"],
    },
    {
      id: "tl-1045",
      time: "10:45 PM",
      sortOrder: 7,
      title: "Actual Estimated Time of Death",
      description: "Adrian Vale succumbs to cardiac paralysis from digitalis toxicity.",
      reliability: "verified",
      source: "Medical Examiner Autopsy",
      relatedEvidence: ["ev-001", "ev-002"],
      relatedSuspects: ["sus-simon"],
    },
    {
      id: "tl-1120",
      time: "11:20 PM",
      sortOrder: 8,
      title: "Fabricated Dining Receipt Alibi",
      description: "Marcus Reed alters earlier 9:20 PM receipt to read 11:20 PM to create false presence in dining car.",
      reliability: "disputed",
      source: "Forged Slip #442",
      relatedEvidence: ["ev-007", "ev-006"],
      relatedSuspects: ["sus-marcus"],
    },
    {
      id: "tl-1140",
      time: "11:40 PM",
      sortOrder: 9,
      title: "Attendant Bell Discovers Deadbolt Locked",
      description: "Attendant Thomas Bell attempts to enter Compartment B, finds deadbolt locked, and sounds alarm.",
      reliability: "verified",
      source: "Conductor Incident Report",
      relatedEvidence: ["ev-001"],
      relatedSuspects: ["sus-thomas"],
    },
    {
      id: "tl-1142",
      time: "11:42 PM",
      sortOrder: 10,
      title: "Rigged Pocket Watch Timestamp",
      description: "The false time indicated on Adrian's manually stopped pocket watch.",
      reliability: "disputed",
      source: "Rigged Pocket Watch",
      relatedEvidence: ["ev-001"],
      relatedSuspects: ["sus-marcus"],
    },
  ],
  solution: {
    culpritId: "sus-marcus",
    motive:
      "Adrian Vale discovered Marcus had embezzled £45,000 and forged Byzantine antiquities certificates, threatening to hand him over to Scotland Yard at Vienna.",
    method:
      "Marcus dosed Adrian's port with digitalis, left the room at 10:42 PM, and threw the interior deadbolt from the corridor using high-tensile waxed olive thread threaded through the overhead louvre.",
    decisiveEvidenceIds: ["ev-003", "ev-006", "ev-007"],
    alibiContradiction:
      "Marcus claimed he spent 10:20 PM to 11:35 PM drinking in the Dining Car, but the Dining Car was evacuated and locked at 10:15 PM due to an electrical fire, and his receipt was forged.",
    chronologicalSequence: [
      "10:15 PM: Dining car galley fire causes complete evacuation of Carriage C.",
      "10:25 PM: Marcus enters Compartment B to confront Adrian regarding the embezzlement ultimatum.",
      "10:30 PM: Marcus covertly adds digitalis glycoside to Adrian's port glass while Adrian reviews papers.",
      "10:42 PM: Adrian collapses; Marcus steps into the corridor, loops waxed olive thread around the interior deadbolt through the ventilation louvre, pulls the latch home, snaps the thread, and rigs the pocket watch to 11:42 PM.",
      "10:45 PM: Adrian Vale dies of cardiac arrest.",
      "11:20 PM: Marcus alters an old dinner receipt to fabricate an alibi.",
      "11:40 PM: Conductor Bell discovers the locked compartment.",
    ],
    innocentSuspectExplanations: {
      "sus-eleanor":
        "Eleanor despised Adrian for financial reasons, but she spent 10:30 PM to 11:20 PM in Compartment D with Clara Finch reviewing legal disclosures.",
      "sus-simon":
        "Dr. Cross had medical access, but his vials had unbroken hospital tamper seals and severe arthritis prevented him from executing the thread locking mechanism.",
      "sus-clara":
        "Clara was actively observing the corridor for an exposé; her contemporaneous notes corroborate the real timeline and expose Marcus.",
      "sus-thomas":
        "Attendant Bell was assisting with the dining car smoke emergency and discovered the body during regular berth preparations.",
    },
    redHerringExplanations: {
      "ev-001":
        "The pocket watch stopped at 11:42 PM was a staged red herring designed to establish a false time of death when Marcus was already back in Carriage A.",
      "ev-004":
        "The torn ticket was simply a mechanical malfunction of the conductor's punch clipper during the 9:55 PM station stop.",
      "ev-008":
        "Dr. Cross's physician bag aroused suspicion because of digitalis treatments, but forensic examination proved his medicine supply was untouched.",
    },
    fullResolutionNarrative:
      "When confronted with the dining car emergency log and the olive thread found in the ventilation louvre, Marcus Reed collapsed in confession. He admitted that Adrian's ultimatum would have ruined his career and sent him to prison for forgery. He believed his rigged pocket watch and altered receipt had created an airtight alibi and an impossible locked room. Marcus Reed was arrested upon arrival at Vienna Westbahnhof.",
  },
  difficultyHints: {
    easy: [
      "Compare Marcus Reed's claimed location with the official railway service logs for Carriage C.",
      "Examine the overhead ventilation louvre on the compartment door and look for physical traces.",
      "Look closely at the dining receipt timestamp—does the ink match?",
    ],
    medium: [
      "A suspect's alibi depends on an establishment that may not have been open.",
      "How could an interior sliding bolt be moved without being inside the room?",
      "The time on the victim's pocket watch does not match the autopsy timeline.",
    ],
    hard: [
      "Cross-reference the passenger witness notebook with the dining car maintenance records.",
      "Identify the physical tool used to manipulate the locking mechanism from outside.",
      "Distinguish between the manufactured time of death and the physiological time of death.",
    ],
    "very-hard": [
      "Reconstruct the mechanical vector connecting the louvre slats to the latch travel distance.",
      "Establish the timeline anomaly between the telegraph receipt and the stopped crystal hands.",
      "Identify the forgery technique on the paper receipt.",
    ],
  },
  deductionFormOptions: {
    motives: [
      { id: "mot-embezzle", label: "Cover up £45,000 embezzlement and forged antiquities certificates" },
      { id: "mot-inheritance", label: "Inherit Adrian's massive estate under the 1938 will" },
      { id: "mot-blackmail", label: "Prevent the publication of a damaging newspaper exposé" },
      { id: "mot-grudge", label: "Revenge for an art auction dispute and stolen anatomical treatise" },
    ],
    methods: [
      { id: "meth-thread", label: "Digitalis in port, locked door from corridor using thread through louvre" },
      { id: "meth-transom", label: "Stabbed through the transom window with a concealed cane rapier" },
      { id: "meth-vent", label: "Pumped toxic gas through the train ventilation ducts" },
      { id: "meth-duplicate-key", label: "Used a duplicate conductor skeleton key after midnight" },
    ],
    contradictions: [
      { id: "con-dining-fire", label: "Dining Car was closed and evacuated at 10:15 PM due to an electrical fire" },
      { id: "con-ticket-punch", label: "Ticket was never verified at St. Anton station" },
      { id: "con-morphine", label: "Medical bag was missing digitalis ampoules" },
      { id: "con-tunnel", label: "Train stopped inside Oakhaven Tunnel for twenty minutes" },
    ],
  },
};
