import { Case } from "@/types/game";

export const case2Glasshouse: Case = {
  id: "case-002",
  slug: "the-glasshouse",
  caseNumber: "CASE 002",
  title: "The Glasshouse",
  genre: "Locked-Room Murder Mystery",
  tagline: "The doors were locked. The storm never stopped. Someone still got inside.",
  synopsis:
    "During a ferocious midnight thunderstorm, eminent botanist Dr. Helena Marsh is discovered bludgeoned to death inside her secured Victorian glass conservatory. The electronic perimeter system registered no entries after 9:15 PM, and the only brass key lay beside the victim. But physical evidence tells an entirely different story.",
  incidentDate: "November 3, 1948",
  incidentLocation: "Blackthorn Conservatory // Marsh Country Estate",
  defaultDifficulty: "medium",
  estimatedMinutes: 40,
  coverImage: "/images/covers/case2-cover.jpg",
  victim: {
    name: "Dr. Helena Marsh",
    age: 48,
    occupation: "Head of Botanical Research & Estate Heiress",
    causeOfDeath: "Blunt Cranial Trauma (Cast-iron soil tamper)",
    summary:
      "A renowned, domineering botanist famous for synthesizing rare orchid hybrids. She ruthlessly controlled the family estate, her brother's finances, and the academic careers of her staff.",
    portrait: "/photos/dr-helena-marsh.png",
  },
  crimeScene: {
    title: "Blackthorn Conservatory — Tropical Pavilion",
    image: "/images/scenes/case2-glasshouse-scene.jpg",
    description:
      "A soaring 19th-century wrought-iron greenhouse filled with exotic tropical palms and orchids. Rain batters violently against hundreds of glass panes. Dr. Marsh lies beside the central stone fountain, surrounded by shattered terra-cotta pots. The massive iron entrance door has a heavy mortise deadbolt and security contact sensor.",
    hotspots: [
      {
        id: "gh-hs-1",
        evidenceId: "ev-201",
        label: "Broken Wall Thermometer",
        xPercent: 22,
        yPercent: 45,
        previewText: "A brass environmental thermometer mounted to the iron column with cracked glass.",
      },
      {
        id: "gh-hs-2",
        evidenceId: "ev-202",
        label: "Victim & Central Fountain",
        xPercent: 52,
        yPercent: 68,
        previewText: "Dr. Marsh lies motionless on the gravel path. Blood stains the grey stone rim.",
      },
      {
        id: "gh-hs-3",
        evidenceId: "ev-203",
        label: "Iron Entrance Deadbolt & Key",
        xPercent: 86,
        yPercent: 58,
        previewText: "The heavy iron door with its deadbolt thrown. A single brass key lies in the keyhole inside.",
      },
      {
        id: "gh-hs-4",
        evidenceId: "ev-204",
        label: "Gardening Ledger on Potting Bench",
        xPercent: 74,
        yPercent: 72,
        previewText: "A leather-bound ledger open on the zinc potting table with smeared pencil entries.",
      },
      {
        id: "gh-hs-5",
        evidenceId: "ev-205",
        label: "Zinc Rainwater Reservoir",
        xPercent: 38,
        yPercent: 82,
        previewText: "A large galvanized cistern beneath the drainage gutter with disturbed silt.",
      },
      {
        id: "gh-hs-6",
        evidenceId: "ev-206",
        label: "Excised Orchid Specimen Stand",
        xPercent: 15,
        yPercent: 62,
        previewText: "An empty glass terrarium in the rare flora wing with severed root stems.",
      },
      {
        id: "gh-hs-7",
        evidenceId: "ev-207",
        label: "Generator Shed Work Order",
        xPercent: 62,
        yPercent: 88,
        previewText: "Time-stamped maintenance telemetry log from the backup diesel generator outbuilding.",
      },
      {
        id: "gh-hs-8",
        evidenceId: "ev-208",
        label: "Disputed Estate Will & Tavern Alibi",
        xPercent: 88,
        yPercent: 82,
        previewText: "A solicitor's draft dividing Lord Marsh's estate and verified village alibi records.",
      },
    ],
  },
  evidence: [
    {
      id: "ev-201",
      title: "Broken Industrial Thermometer & Thermostat Override",
      category: "physical",
      description:
        "The wall-mounted greenhouse thermometer reads 35°C (95°F) despite the freezing November storm outside. The steam heating regulator valve was manually wedged open to maximum.",
      image: "/images/evidence/ev-201.jpg",
      discoveryLocation: "Iron column near the entrance door",
      availableObservations: [
        "Temperature Anomaly: Standard greenhouse temperature is maintained at 20°C for orchids. 35°C is dangerously hot for flora.",
        "Forensic Pathology Impact: Artificially elevating ambient room temperature to 35°C dramatically accelerates post-mortem body cooling calculation and rigor mortis, making a murder committed at 8:50 PM falsely appear to have occurred after 9:45 PM.",
      ],
      relatedSuspects: ["sus-nora"],
      relatedTimelineEvents: ["tl-20850", "tl-20945"],
      isRedHerring: false,
      explanation:
        "Nora forced the greenhouse steam heaters on high to confuse the medical examiner's estimated time of death.",
    },
    {
      id: "ev-202",
      title: "Cast-Iron Soil Tamper in Cistern",
      category: "forensic",
      description:
        "A heavy flat-bottomed cast-iron potting tamper recovered from the murky bottom of the rainwater cistern. Luminol detects microscopic traces of Helena's blood on the iron rim.",
      image:
        "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=600&q=80",
      discoveryLocation: "Submerged in the zinc rainwater reservoir",
      availableObservations: [
        "Weapon Match: The circular head matches the skull depression noted in Helena's autopsy report.",
        "Fingerprint: Wiped clean with oily paraffin cloth, but a partial thumbprint matching Nora Bell was preserved under the rubber handle collar.",
      ],
      relatedSuspects: ["sus-nora"],
      relatedTimelineEvents: ["tl-20850"],
      isRedHerring: false,
      explanation:
        "The true murder weapon, hidden in the cistern after Helena was struck from behind.",
    },
    {
      id: "ev-203",
      title: "Electronic Security System Log & 4-Minute Gap",
      category: "digital",
      description:
        "The estate's automated magnetic perimeter recorder. Records the greenhouse door was armed at 9:15 PM. However, an unexplained 4-minute power loss occurred between 9:11 PM and 9:15 PM.",
      image:
        "https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=600&q=80",
      discoveryLocation: "Security console in the Gatehouse office",
      availableObservations: [
        "9:11 PM to 9:15 PM: Security cameras and sensors rebooted due to a tripped main circuit breaker.",
        "Auto-Lock Mechanism: When power was restored at 9:15 PM, the fail-secure magnetic solenoid engaged automatically.",
        "Door Status: The physical door was closed and deadbolted prior to the power restoration.",
      ],
      relatedSuspects: ["sus-nora", "sus-victor"],
      relatedTimelineEvents: ["tl-20911", "tl-20915"],
      isRedHerring: false,
      explanation:
        "Nora tripped the main circuit breaker from the manor cellar at 9:11 PM to mask her return from the conservatory.",
    },
    {
      id: "ev-204",
      title: "Altered Gardening Ledger & Stolen Monograph",
      category: "document",
      description:
        "Helena's research logbook. The entry for November 3 shows white correction fluid over the original hybridizer name 'N. Bell', replaced with 'H. Marsh'. An accompanying draft monograph completely omits Nora's name.",
      image:
        "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80",
      discoveryLocation: "Zinc potting bench in the greenhouse",
      availableObservations: [
        "Discovery Date: The breakthrough orchid clone was cultivated over 3 years solely by Nora Bell.",
        "Margin Note: 'Nora threatened legal injunction today. I must inform the board that her contract is terminated as of Monday.'",
      ],
      relatedSuspects: ["sus-nora"],
      relatedTimelineEvents: ["tl-20830"],
      isRedHerring: false,
      explanation:
        "Establishes Nora Bell's overwhelming motive: Helena was stealing the defining achievement of her career.",
    },
    {
      id: "ev-205",
      title: "Volcanic Perlite in Satin Slippers",
      category: "forensic",
      description:
        "Nora Bell's supposedly unworn ivory satin indoor slippers found in her manor bedroom closet. The grooved leather heel contains embedded granules of black volcanic perlite.",
      image:
        "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=600&q=80",
      discoveryLocation: "Wardrobe closet in Nora Bell's guest bedroom",
      availableObservations: [
        "Mineralogical Match: Black volcanic perlite is a specialized orchid soil medium imported exclusively for the Blackthorn tropical bed.",
        "Contradiction: Nora claimed she spent the entire evening reading in the carpeted manor library and never set foot outdoors.",
      ],
      relatedSuspects: ["sus-nora"],
      relatedTimelineEvents: ["tl-20850"],
      isRedHerring: false,
      explanation:
        "The decisive forensic clue proving Nora was inside the greenhouse tropical bed.",
    },
    {
      id: "ev-206",
      title: "Missing Black Orchid Specimen (*Cattleya vesta*)",
      category: "physical",
      description:
        "An empty glass terrarium in the rare flora wing. A prized black orchid cutting was excised cleanly at the root stem.",
      image:
        "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=600&q=80",
      discoveryLocation: "Rare flora specimen display stand",
      availableObservations: [
        "Pruning Shears Cut: Executed with amateur shears, not Helena's professional surgical scalpel.",
        "Recovery: The missing cutting was discovered hidden in visiting collector Amelia Frost's leather traveling trunk.",
      ],
      relatedSuspects: ["sus-amelia"],
      relatedTimelineEvents: ["tl-20925"],
      isRedHerring: true,
      explanation:
        "Red herring. Amelia Frost used her scheduled appointment to surreptitiously steal the cutting from the outer vestibule; she did not enter the locked pavilion or kill Helena.",
    },
    {
      id: "ev-207",
      title: "Victor Hale's Generator Repair Work Order",
      category: "document",
      description:
        "Time-stamped maintenance telemetry log from the backup diesel generator house located 300 yards down the hill.",
      image:
        "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80",
      discoveryLocation: "Estate manager's workshop bench",
      availableObservations: [
        "Continuous Operation: Victor was actively purging air locks from the diesel fuel line from 8:45 PM until 9:50 PM, confirmed by automatic pressure transducer readings.",
        "Apparel: Victor's heavy oilskin coat is soaked in diesel and carbon soot, with zero traces of soil or greenhouse glass.",
      ],
      relatedSuspects: ["sus-victor"],
      relatedTimelineEvents: ["tl-20845"],
      isRedHerring: true,
      explanation:
        "Exonerates Victor Hale: the generator telemetry confirms he was down in the power shed during the murder.",
    },
    {
      id: "ev-208",
      title: "Disputed Family Will & Julian's Tavern Alibi",
      category: "document",
      description:
        "A solicitor's draft of the late Lord Marsh's estate dividing property equally between Helena and Julian, marked 'Disputed' by Helena's attorneys.",
      image:
        "https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=600&q=80",
      discoveryLocation: "Julian Marsh's desk in the west wing",
      availableObservations: [
        "Motive: Julian stood to gain £120,000 if Helena died without heirs.",
        "Alibi Verification: Julian was playing billiards at the Red Lion Pub in the village from 7:30 PM until 10:15 PM, verified by the barkeep and three town councillors.",
      ],
      relatedSuspects: ["sus-julian"],
      relatedTimelineEvents: ["tl-20830"],
      isRedHerring: true,
      explanation:
        "Red herring. Julian had a financial motive, but an ironclad corroborated public alibi in the village.",
    },
  ],
  suspects: [
    {
      id: "sus-nora",
      name: "Nora Bell",
      occupation: "Research Botanist & Laboratory Assistant",
      portrait: "/photos/nora-bell.png",
      relationshipToVictim: "Protégée and co-researcher for four years.",
      publicMotive:
        "Dr. Marsh stole her life's work on orchid hybridization and threatened to blacklist her from academia.",
      privateHistory:
        "Nora had sacrificed her personal savings to finance the Blackthorn hybrid experiments. When Helena took full credit, Nora snapped.",
      alibi:
        "Claims she spent the entire period in the manor library reading Linnaeus from 8:00 PM until 10:30 PM.",
      actualActions:
        "Met Helena in the greenhouse at 8:45 PM, killed her with the tamper at 8:50 PM, hid the tamper, cranked the heaters, locked the door, and tripped the breaker at 9:11 PM to return unnoticed.",
      interviewStages: [
        {
          id: "int-nora-1",
          question: "Where were you during the storm tonight, Nora?",
          response:
            "I never left the manor library. The storm was deafening, so I curled up by the fireplace with an 18th-century botany journal. I had no idea anything happened in the glasshouse until Victor raised the alarm.",
        },
        {
          id: "int-nora-2",
          question: "Did you and Dr. Marsh quarrel over the orchid hybridization credits?",
          requiredEvidenceId: "ev-204",
          response:
            "Helena was... difficult. She believed that because it was her conservatory, every seedling belonged to her. But I am a scientist, not a killer. I was preparing a formal appeal to the Botanical Society.",
          revealsNote: "Nora admits Helena was usurping her scientific research.",
        },
        {
          id: "int-nora-3",
          question: "How do you explain the rare volcanic perlite soil found on your satin slippers?",
          requiredEvidenceId: "ev-205",
          response:
            "I... that perlite must have been on the rug from three days ago! You cannot prove I was out in the conservatory tonight!",
          exposesContradiction: true,
          revealsNote: "Nora cannot explain the fresh perlite soil on her allegedly clean library slippers.",
        },
      ],
    },
    {
      id: "sus-julian",
      name: "Julian Marsh",
      occupation: "Victim's Estranged Brother",
      portrait: "/photos/julian-marsh.png",
      relationshipToVictim: "Younger brother, financially dependent on the Marsh trust.",
      publicMotive:
        "Stands to inherit Blackthorn Manor and the remaining trust funds upon Helena's death.",
      privateHistory:
        "Julian is an eccentric gambler who was cut off from the family accounts. However, he was drinking in town all evening.",
      alibi:
        "Playing billiards at the Red Lion Pub in the village between 7:30 PM and 10:15 PM.",
      actualActions:
        "He genuinely remained at the village tavern until after 10:00 PM, returning home by taxi at 10:30 PM.",
      interviewStages: [
        {
          id: "int-julian-1",
          question: "Did you visit your sister at the conservatory tonight?",
          response:
            "Good heavens, no. In this tempest? I took the 7:15 carriage into the village and spent three glorious hours taking shillings off the magistrate at the Red Lion billiards table. Ring up the landlord if you doubt me.",
          unlocksEvidenceId: "ev-208",
        },
        {
          id: "int-julian-2",
          question: "You had a heated legal dispute with Helena over the estate.",
          requiredEvidenceId: "ev-208",
          response:
            "Of course I did. My sister treated me like a beggar. But Helena was an arrogant bully who made dozens of enemies. Check her assistant Nora—those two were screaming at each other over tea yesterday.",
        },
      ],
    },
    {
      id: "sus-victor",
      name: "Victor Hale",
      occupation: "Blackthorn Estate Manager",
      portrait: "/photos/victor-hale.png",
      relationshipToVictim: "Estate manager of 12 years.",
      publicMotive:
        "Helena was threatening to evict his family from the gatehouse cottage over maintenance audits.",
      privateHistory:
        "Victor is a loyal, weary mechanic who maintains the grounds. He was fighting to keep the generators running through the storm.",
      alibi:
        "Working in the generator outbuilding repairing the fuel lines from 8:45 PM until 9:50 PM.",
      actualActions:
        "Remained inside the generator shed. His fuel pressure logs prove continuous presence.",
      interviewStages: [
        {
          id: "int-victor-1",
          question: "Who had access to the master greenhouse key?",
          response:
            "Only Dr. Helena herself. She kept the brass mortise key on her belt ring. When the automated system engaged at 9:15 PM, nobody could enter through that iron portal without her key or tripping the gatehouse klaxon.",
          unlocksEvidenceId: "ev-207",
        },
        {
          id: "int-victor-2",
          question: "What occurred during the 9:11 PM power gap?",
          requiredEvidenceId: "ev-203",
          response:
            "A circuit tripped on the manor basement sub-panel. I noticed the secondary loop flicker down at the shed, but my generator stayed running. Someone must have thrown the main switch inside the manor cellar.",
          revealsNote: "Victor points out the power trip was initiated from inside the manor basement, not the generator.",
        },
      ],
    },
    {
      id: "sus-amelia",
      name: "Amelia Frost",
      occupation: "Exotic Plant Collector & Socialite",
      portrait: "/photos/amelia-frost.png",
      relationshipToVictim: "Rival collector and private patron.",
      publicMotive:
        "Wanted to acquire the black orchid *Cattleya vesta* at any price.",
      privateHistory:
        "Amelia had arranged an illicit meeting to purchase the specimen. When she found Helena dead or the door locked, she stole a cutting from the outer display.",
      alibi:
        "Claims she arrived at 9:30 PM, knocked on the conservatory door, heard nothing, and walked back to her car.",
      actualActions:
        "Arrived at 9:25 PM, stole the orchid cutting from the unlocked outer vestibule, and panicked when she realized the inner door was locked.",
      interviewStages: [
        {
          id: "int-amelia-1",
          question: "Why did you visit Blackthorn Estate in a thunderstorm?",
          response:
            "Dr. Marsh invited me for a private viewing of her latest hybrid at 9:30 PM. But when I reached the glasshouse, the doors were locked and the lights were off. I swear I never entered the main pavilion.",
          unlocksEvidenceId: "ev-206",
        },
        {
          id: "int-amelia-2",
          question: "We found the missing black orchid cutting in your luggage.",
          requiredEvidenceId: "ev-206",
          response:
            "Alright! I took the cutting! It was sitting right on the potting bench in the outer anteroom. Helena had promised it to me for months. I took it, but I didn't lay a finger on Helena!",
          revealsNote: "Amelia confesses to the floral theft in the outer room, proving she did not commit the murder.",
        },
      ],
    },
  ],
  timeline: [
    {
      id: "tl-20830",
      time: "8:30 PM",
      sortOrder: 1,
      title: "Violent Quarrel in Potting Shed",
      description: "Dr. Helena Marsh informs Nora Bell that the orchid monograph will be published under Helena's name alone.",
      reliability: "reported",
      source: "Victim's Research Journal",
      relatedEvidence: ["ev-204"],
      relatedSuspects: ["sus-nora"],
    },
    {
      id: "tl-20845",
      time: "8:45 PM",
      sortOrder: 2,
      title: "Victor Hale at Generator Outbuilding",
      description: "Victor Hale begins emergency fuel purging in the diesel shed.",
      reliability: "verified",
      source: "Generator Pressure Telemetry Log",
      relatedEvidence: ["ev-207"],
      relatedSuspects: ["sus-victor"],
    },
    {
      id: "tl-20850",
      time: "8:50 PM",
      sortOrder: 3,
      title: "Actual Murder Inside Conservatory",
      description: "Nora Bell strikes Dr. Helena Marsh with the iron tamper, throws the heaters on high, and hides weapon in cistern.",
      reliability: "verified",
      source: "Forensic Autopsy & Perlite Traces",
      relatedEvidence: ["ev-201", "ev-202", "ev-205"],
      relatedSuspects: ["sus-nora"],
    },
    {
      id: "tl-20905",
      time: "9:05 PM",
      sortOrder: 4,
      title: "Nora Exits and Deadbolts Pavilion",
      description: "Nora locks the mechanical deadbolt using Helena's brass key before returning toward the manor.",
      reliability: "verified",
      source: "Reconstructed Physical Actions",
      relatedEvidence: ["ev-203"],
      relatedSuspects: ["sus-nora"],
    },
    {
      id: "tl-20911",
      time: "9:11 PM",
      sortOrder: 5,
      title: "Manor Cellar Power Disruption",
      description: "Nora trips the main circuit breaker in the basement, blinding cameras for 4 minutes while entering the house.",
      reliability: "verified",
      source: "Gatehouse Security Event Log",
      relatedEvidence: ["ev-203"],
      relatedSuspects: ["sus-nora"],
    },
    {
      id: "tl-20915",
      time: "9:15 PM",
      sortOrder: 6,
      title: "Security System Auto-Arming",
      description: "Perimeter power restores and auto-arms magnetic deadbolt, sealing the greenhouse.",
      reliability: "verified",
      source: "Automated Security Relay",
      relatedEvidence: ["ev-203"],
      relatedSuspects: ["sus-victor"],
    },
    {
      id: "tl-20925",
      time: "9:25 PM",
      sortOrder: 7,
      title: "Amelia Frost Floral Theft",
      description: "Amelia Frost arrives at the outer porch, finds door locked, and steals the black orchid cutting.",
      reliability: "reported",
      source: "Amelia Frost Statement & Luggage Search",
      relatedEvidence: ["ev-206"],
      relatedSuspects: ["sus-amelia"],
    },
    {
      id: "tl-20945",
      time: "9:45 PM",
      sortOrder: 8,
      title: "False Staged Time of Death",
      description: "Due to 35°C overheated steam, post-mortem temperature falsely suggests death occurred at 9:45 PM.",
      reliability: "disputed",
      source: "Initial Coroner Estimate",
      relatedEvidence: ["ev-201"],
      relatedSuspects: ["sus-nora"],
    },
  ],
  solution: {
    culpritId: "sus-nora",
    motive:
      "Dr. Helena Marsh was stealing Nora's revolutionary 3-year research on the rare hybrid orchid (*Cattleya vesta*) and threatening to blacklist her from academic science.",
    method:
      "Nora struck Helena with the cast-iron tamper at 8:50 PM, wedged the steam radiator to 35°C to distort the time of death, threw the tamper into the cistern, locked the door, and cut the estate power at 9:11 PM to conceal her return.",
    decisiveEvidenceIds: ["ev-201", "ev-202", "ev-205"],
    alibiContradiction:
      "Nora claimed she spent the entire evening reading in the manor library and never went outdoors, but volcanic perlite soil exclusive to the greenhouse tropical bed was found embedded in her satin slippers.",
    chronologicalSequence: [
      "8:30 PM: Helena alters the research ledger and refuses Nora's credit.",
      "8:45 PM: Nora follows Helena into the conservatory to demand justice.",
      "8:50 PM: In a fit of fury, Nora strikes Helena with the iron soil tamper.",
      "8:55 PM: Nora conceals the tamper in the rainwater reservoir and forces the heating valve open to 35°C.",
      "9:05 PM: Nora exits and turns the mortise lock with Helena's key before the 9:15 PM automated system arms.",
      "9:11 PM: Nora cuts the circuit breaker in the basement to disable the security cameras while slipping back inside.",
      "9:25 PM: Amelia Frost arrives and steals the orchid cutting from the anteroom.",
      "10:00 PM: The body is discovered in the overheated sealed pavilion.",
    ],
    innocentSuspectExplanations: {
      "sus-julian":
        "Julian had an inheritance dispute, but his presence at the Red Lion Pub in the village was fully verified by the barkeep and magistrate.",
      "sus-victor":
        "Victor Hale was working in the generator shed 300 yards away; continuous pressure logs confirm his presence there.",
      "sus-amelia":
        "Amelia stole the botanical cutting from the porch, but never entered the main locked pavilion.",
    },
    redHerringExplanations: {
      "ev-206":
        "The missing black orchid seemed to suggest an assassination by botanical collectors, but was merely opportunistic petty theft by Amelia Frost.",
      "ev-207":
        "Victor Hale's generator telemetry confirmed continuous engine operation in the outbuilding, proving he was down in the power shed during the murder.",
      "ev-208":
        "The disputed family will was a classic financial motive that diverted suspicion toward Julian Marsh.",
    },
    fullResolutionNarrative:
      "Confronted with the volcanic perlite matching the tropical bed in her slippers and her partial print on the submerged tamper, Nora Bell broke down in tears. She confessed that four years of uncredited labor had been erased in an instant by Helena's vanity. Nora Bell was remanded into custody by the county constabulary.",
  },
  difficultyHints: {
    easy: [
      "Examine Nora Bell's wardrobe closely. Did she really stay in the library all night?",
      "Why was the greenhouse thermometer reading 35°C in the middle of a November thunderstorm?",
      "Look into the zinc rainwater reservoir inside the pavilion.",
    ],
    medium: [
      "The locked room was not locked during the entire evening—determine when the security armed.",
      "A high ambient room temperature can drastically alter forensic time-of-death estimates.",
      "The stolen orchid is a distraction from the real weapon.",
    ],
    hard: [
      "Connect the 4-minute camera power outage to the suspect's movements between buildings.",
      "Identify the geological medium unique to the tropical pavilion and where it was transferred.",
      "Examine the mechanical override on the steam valve.",
    ],
    "very-hard": [
      "Calculate the true physiological time of death by adjusting for the 35°C thermal acceleration.",
      "Dissect the breaker switch location: who had physical access inside the manor at 9:11 PM?",
      "Eliminate the exterior theft as an independent timeline event.",
    ],
  },
  deductionFormOptions: {
    motives: [
      { id: "mot-orchid-theft", label: "Helena took sole credit for Nora's breakthrough hybrid orchid research" },
      { id: "mot-will-money", label: "Gain £120,000 inheritance from the disputed Marsh family will" },
      { id: "mot-black-market", label: "Steal and sell the black orchid on the international black market" },
      { id: "mot-eviction", label: "Revenge for threatened eviction from the gatehouse cottage" },
    ],
    methods: [
      { id: "meth-tamper-heat", label: "Bludgeoned with soil tamper at 8:50 PM, cranked heaters to falsify time of death" },
      { id: "meth-transom-climb", label: "Climbed through the broken 18-foot transom pane using a trellis" },
      { id: "meth-generator-fumes", label: "Pumped carbon monoxide from the generator into the air vents" },
      { id: "meth-poison-thorn", label: "Pricked Helena with a rare neurotoxic botanical specimen" },
    ],
    contradictions: [
      { id: "con-perlite-shoes", label: "Volcanic perlite exclusive to the greenhouse was found in Nora's satin slippers" },
      { id: "con-pub-billiards", label: "Julian was seen playing billiards at the village tavern all night" },
      { id: "con-generator-pressure", label: "Generator telemetry proved Victor never left the engine house" },
      { id: "con-missing-cutting", label: "The orchid cutting was cut with amateur shears, not Helena's tools" },
    ],
  },
};
