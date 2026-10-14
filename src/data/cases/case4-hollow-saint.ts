import { Case } from "@/types/game";

export const case4HollowSaint: Case = {
  id: "case-004",
  slug: "the-hollow-saint",
  caseNumber: "CASE 004",
  title: "The Hollow Saint",
  genre: "Psychological Horror Murder Mystery",
  tagline: "The dead have no alibis. The living have too many.",
  synopsis:
    "In 1998, a caretaker vanished from the isolated stone chapel of Saint Jude on Blackwood Ridge. Twenty-eight years later, senior historian Professor Julian Vance is found dead before the altar. The sanctuary was deadbolted from the inside with heavy iron drop-bars, yet the chapel bell tolled three times at 2:13 AM—despite its clapper having been removed thirty years ago. Uncover the terrifying human truth behind an impossible legend.",
  incidentDate: "October 31, 1948",
  incidentLocation: "Sanctuary of Saint Jude-in-the-Fens // Blackwood Ridge",
  defaultDifficulty: "very-hard",
  estimatedMinutes: 65,
  coverImage:
    "https://images.unsplash.com/photo-1548625361-195fe579b191?auto=format&fit=crop&w=1200&q=80",
  victim: {
    name: "Professor Julian Vance",
    age: 56,
    occupation: "Senior Archival Historian & Disappearances Investigator",
    causeOfDeath: "Aconite Alkaloid Poisoning (Administered in altar sacramental wine)",
    summary:
      "A renowned, obsessive historical researcher who spent five years tracking church archives across the diocese. He was on the verge of proving what truly occurred during the 1998 caretaker disappearance.",
    portrait:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
  },
  crimeScene: {
    title: "Sanctuary Altar & Confessional Stone Wall",
    image:
      "https://images.unsplash.com/photo-1519817650390-64a93db51149?auto=format&fit=crop&w=1200&q=80",
    description:
      "Gothic stone sanctuary illuminated only by guttering tallow candles and moonlight piercing stained glass. Professor Julian Vance lies before the carved communion rail, a silver chalice overturned. The towering oak entrance door is secured with two massive iron drop-bars that can only be positioned from the interior. Ancient ivy clings to the exterior walls leading up to the silent belfry.",
    hotspots: [
      {
        id: "hs-hs-1",
        evidenceId: "ev-401",
        label: "Damp Footprints & Dry Stone Wall",
        xPercent: 28,
        yPercent: 70,
        previewText: "Muddy boot impressions tracking across the flagstones that stop dead at the solid wall.",
      },
      {
        id: "hs-hs-2",
        evidenceId: "ev-402",
        label: "Altar Candle & Wax Tallow Measure",
        xPercent: 50,
        yPercent: 44,
        previewText: "A thick church candle melted into a brass holder on the altar step.",
      },
      {
        id: "hs-hs-3",
        evidenceId: "ev-403",
        label: "Belfry Tower & Ivy Wire Conduit",
        xPercent: 82,
        yPercent: 22,
        previewText: "The high stone belfry. A thin glint of metal weaves through the creeping ivy.",
      },
      {
        id: "hs-hs-4",
        evidenceId: "ev-404",
        label: "Iron-Bolted Sanctuary Oak Door",
        xPercent: 12,
        yPercent: 54,
        previewText: "Heavy oak timbers barred from within by dual drop-forged iron slide bars.",
      },
      {
        id: "hs-hs-5",
        evidenceId: "ev-405",
        label: "Scorched Parish Register in Satchel",
        xPercent: 62,
        yPercent: 78,
        previewText: "A leather satchel containing documents torn from diocesan vaults.",
      },
    ],
  },
  evidence: [
    {
      id: "ev-401",
      title: "Damp Footprint Ending at Dry Stone Wall",
      category: "physical",
      description:
        "A trail of damp bog mud and moss on the sanctuary flagstones made by heavy orthotic walking boots. The footprints lead directly into the dark confessional alcove and terminate abruptly against an apparently solid limestone ashlar wall.",
      image:
        "https://images.unsplash.com/photo-1541888946425-d0fbb186c5f7?auto=format&fit=crop&w=600&q=80",
      discoveryLocation: "Flagstones leading into the north confessional",
      availableObservations: [
        "Sole Tread Analysis: Features an orthotic heel wedge with three brass reinforcement studs—an exact match to the custom orthopedic boots worn by Father Elias.",
        "Architectural Hidden Mechanism: Pressing the carved stone quatrefoil in the third pillar releases a concealed spring-loaded pivot hinge. The entire limestone panel rotates inward into a forgotten 17th-century priest-hole passageway connecting directly to the rectory garden.",
        "Conclusion: The murderer did not need to unbolt the iron front doors to escape; they exited through the secret priest-hole wall.",
      ],
      relatedSuspects: ["sus-elias"],
      relatedTimelineEvents: ["tl-40150"],
      isRedHerring: false,
      explanation:
        "The physical proof exposing the priest hole passage used by Father Elias to exit the locked sanctuary.",
    },
    {
      id: "ev-402",
      title: "Altar Candle Burn Height Measurements",
      category: "forensic",
      description:
        "A 12-inch beeswax liturgical candle resting on the altar steps. It has burned down exactly 3.2 inches.",
      image:
        "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=600&q=80",
      discoveryLocation: "Altar steps beside the overturned chalice",
      availableObservations: [
        "Burn Rate: Standard parish beeswax candles in still air burn at precisely 1.6 inches per hour.",
        "Calculation: 3.2 inches represents exactly 2 hours of combustion.",
        "Timeline Deduction: Father Elias swore he lit the candle at 9:00 PM when locking the chapel. If it had burned from 9:00 PM until dawn, it would be a puddle of wax. It was actually lit at 1:30 AM and snuffed out around 3:30 AM, proving someone was inside the chapel during the middle of the night.",
      ],
      relatedSuspects: ["sus-elias"],
      relatedTimelineEvents: ["tl-40130"],
      isRedHerring: false,
      explanation:
        "Disproves Father Elias's claim that the chapel had remained untouched and sealed since 9:00 PM.",
    },
    {
      id: "ev-403",
      title: "High-Tensile Steel Wire in Belfry Ivy",
      category: "physical",
      description:
        "A 40-foot spool of braided steel piano wire anchored to the exterior clapper arm of the dismantled church bell, threaded through the dense exterior ivy down into the cemetery bushes.",
      image:
        "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80",
      discoveryLocation: "Concealed in the ivy on the north belfry tower wall",
      availableObservations: [
        "Mechanical Function: Pulling the wire from the ground level in the churchyard swings the exterior counter-weight hammer against the bell rim.",
        "Sound Match: Creates the hollow, resonant toll that rang at 2:13 AM.",
        "Significance: The bell was not rung by a phantom from inside the locked belfry; it was operated remotely from the graveyard to manufacture an alibi and fake a supernatural omen.",
      ],
      relatedSuspects: ["sus-elias", "sus-silas"],
      relatedTimelineEvents: ["tl-40213"],
      isRedHerring: false,
      explanation:
        "Exposes the remote mechanical bell ruse that Father Elias operated from the courtyard.",
    },
    {
      id: "ev-404",
      title: "Scorched 1998 Parish Register Page #42",
      category: "document",
      description:
        "A partially charred leaf torn from the official 1998 parish ledger, retrieved from the cast-iron woodstove in Father Elias's cottage.",
      image:
        "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=600&q=80",
      discoveryLocation: "Hearth of Father Elias's rectory cottage",
      availableObservations: [
        "Torn Edge: Matches the jagged torn stump in the diocesan ledger found in Mara's satchel.",
        "Content: Contains the 1998 handwritten signature and physical description of caretaker 'Brother Thomas'—with handwriting identical to that of the current 'Father Elias'.",
        "The Dark Truth: The real Father Elias was murdered in 1998 by Brother Thomas. Thomas stole Elias's identity, assumed his priesthood, and reported that 'Brother Thomas had disappeared.'",
      ],
      relatedSuspects: ["sus-elias", "sus-mara"],
      relatedTimelineEvents: ["tl-41998"],
      isRedHerring: false,
      explanation:
        "The chilling core revelation: Father Elias is actually Brother Thomas, who killed the real priest 28 years ago.",
    },
    {
      id: "ev-405",
      title: "Crypt Basement Door with Reversed Wear Marks",
      category: "physical",
      description:
        "The padlocked iron door leading to the sealed subterranean ossuary beneath the altar.",
      image:
        "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=600&q=80",
      discoveryLocation: "Behind the altar reredos screen",
      availableObservations: [
        "Padlock Status: The lock cylinder is heavily corroded, but the hasp hinges have fresh graphite lubricant.",
        "Wear Pattern: Scratches on the stone threshold prove the heavy door was opened recently—not kept sealed for 28 years as claimed.",
        "Forensic Discovery: Beneath the fresh mortar of the crypt floor lies a skeleton with dental records matching the real Father Elias from 1998.",
      ],
      relatedSuspects: ["sus-elias"],
      relatedTimelineEvents: ["tl-41998"],
      isRedHerring: false,
      explanation:
        "Proves the crypt was secretly used to conceal the remains of the real Father Elias.",
    },
    {
      id: "ev-406",
      title: "Julian's Micro-Cassette Dictaphone Recording",
      category: "audio",
      description:
        "A pocket micro-cassette tape recovered from Julian Vance's trench coat. Contains his field notes recorded between 1:00 AM and 1:40 AM.",
      image:
        "https://images.unsplash.com/photo-1594904351111-a072f80b1a71?auto=format&fit=crop&w=600&q=80",
      discoveryLocation: "Inside the victim's coat pocket",
      availableObservations: [
        "Audio Transcript 1:25 AM: 'Mara found the register leaf. The cursive script on the 1998 disappearance report belongs to the man wearing the collar today. Thomas never left... Thomas killed Elias...'",
        "Audio Transcript 1:38 AM: Sound of heavy footsteps entering through the stone wall. Julian gasps: 'You... how did you come through the wall?' A raspy voice replies: 'This chapel keeps what it is given.'",
        "Tape Abrupt Cut: Sounds of a silver cup clattering, followed by choking sounds.",
      ],
      relatedSuspects: ["sus-elias", "sus-mara"],
      relatedTimelineEvents: ["tl-40138"],
      isRedHerring: false,
      explanation:
        "Chilling audio documentation of the confrontation and Julian's poisoning.",
    },
    {
      id: "ev-407",
      title: "Silas Crowe's Historical Chapel Bell Blueprint",
      category: "document",
      description:
        "A yellowed architectural schematic from 1892 of Saint Jude's belfry and drainage works.",
      image:
        "https://images.unsplash.com/photo-1586075010923-2dd4570fb338?auto=format&fit=crop&w=600&q=80",
      discoveryLocation: "Silas Crowe's smithy workshop",
      availableObservations: [
        "Markings: Silas had circled the bell counter-weight arm with red grease pencil.",
        "Explanation: Silas suspected someone was using the bell to fake supernatural manifestations and was investigating the mechanism himself.",
      ],
      relatedSuspects: ["sus-silas"],
      relatedTimelineEvents: ["tl-40213"],
      isRedHerring: true,
      explanation:
        "Red herring. Silas's blueprint made him look like the bell rigger, but he was actually trying to expose the trick.",
    },
    {
      id: "ev-408",
      title: "Dr. Anika Roy's Stolen Diocesan Letter",
      category: "document",
      description:
        "A confidential bishop's reprimand ordering Dr. Roy to cease contact with Julian Vance under threat of academic expulsion.",
      image:
        "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=600&q=80",
      discoveryLocation: "Dr. Roy's room at the Blackwood Arms Inn",
      availableObservations: [
        "Rivalry: Anika was desperate to beat Julian to the publication of the Blackwood Ridge book.",
        "Alibi: Innkeeper logs verify Dr. Roy was in the lounge until 1:00 AM, then asleep in Room 4.",
      ],
      relatedSuspects: ["sus-anika"],
      relatedTimelineEvents: ["tl-40100"],
      isRedHerring: true,
      explanation:
        "Red herring. Academic jealousy diverted suspicion to Dr. Roy.",
    },
  ],
  suspects: [
    {
      id: "sus-elias",
      name: "Father Elias (Brother Thomas)",
      occupation: "Resident Caretaker & Parish Priest",
      portrait:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80",
      relationshipToVictim: "Guardian of the chapel archive; Julian Vance's primary interview subject.",
      publicMotive:
        "Prevent the exposure of his true identity: he murdered the real Father Elias in 1998 and stole his life.",
      privateHistory:
        "In 1998, as caretaker Brother Thomas, he killed the genuine Father Elias over gold reliquaries and took his identity. Julian and Mara uncovered the handwriting match.",
      alibi:
        "Claims he was praying the Rosary in his cottage from midnight until awakened by the 2:13 AM bell.",
      actualActions:
        "Entered via the priest hole at 1:35 AM, poisoned Julian with aconite, slipped back to the garden, and pulled the wire at 2:13 AM to sound the bell.",
      interviewStages: [
        {
          id: "int-elias-1",
          question: "Father Elias, how could the chapel bell ring at 2:13 AM if the rope was removed thirty years ago?",
          response:
            "The bell of Saint Jude answers only to heaven, child. The ridge is steeped in old grief. When Brother Thomas vanished into the mire in 1998, the stones remembered. No living soul climbed that belfry tonight.",
        },
        {
          id: "int-elias-2",
          question: "We found a braided wire running through the ivy from the belfry to the churchyard.",
          requiredEvidenceId: "ev-403",
          response:
            "A wire? Some local youth playing pagan games, no doubt. The village boys have mocked this holy house for decades. I know nothing of mechanical contraptions.",
          revealsNote: "Elias nervously dismisses the belfry wire as youth vandalism.",
        },
        {
          id: "int-elias-3",
          question: "The mud on your orthopedic boots matches the prints leading directly into the confessional wall.",
          requiredEvidenceId: "ev-401",
          response:
            "I... I sweep those flagstones daily! My shoes go everywhere in the sanctuary! There is no door in that wall—it is solid 14th-century millstone grit!",
          exposesContradiction: true,
          revealsNote: "Elias panics when his orthotic bootprints are matched to the secret priest hole wall.",
        },
        {
          id: "int-elias-4",
          question: "We recovered the charred 1998 parish register from your stove. You are not Father Elias—you are Brother Thomas!",
          requiredEvidenceId: "ev-404",
          response:
            "Lord have mercy upon my soul... twenty-eight years of penance... twenty-eight years on these cold flagstones... and he had to come digging in the dust...",
          revealsNote: "Father Elias breaks down and admits he is the runaway caretaker Brother Thomas.",
        },
      ],
    },
    {
      id: "sus-mara",
      name: "Mara Voss",
      occupation: "Associate Historian & Archive Specialist",
      portrait:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
      relationshipToVictim: "Co-investigator and former doctoral student of Julian Vance.",
      publicMotive:
        "Julian had threatened to claim sole credit for the archival discovery and withhold her doctoral endorsement.",
      privateHistory:
        "Mara discovered the missing 1998 register leaf that morning. She shared it with Julian, who insisted on confronting Father Elias alone in the dead of night.",
      alibi:
        "Remained in the rectory guest study transcribing parish records between 1:00 AM and 2:30 AM.",
      actualActions:
        "Heard Julian enter the sanctuary, waited in the library, and rushed to the churchyard when the bell rang at 2:13 AM.",
      interviewStages: [
        {
          id: "int-mara-1",
          question: "What did you and Professor Vance discover in the archives?",
          response:
            "The 1998 parish register was mutilated. Page 42 was torn out! But I found the diocesan cross-reference in the bishop's vault—it proved that the handwriting on Brother Thomas's disappearance report was written by the same hand as Father Elias's parish sermons today!",
        },
        {
          id: "int-mara-2",
          question: "Did you go into the chapel with Julian tonight?",
          response:
            "Julian told me to stay in the rectory study while he confronted Elias. He took his dictaphone. Then, at 2:13 AM, that dreadful bell rang out across the ridge. When I ran out, the chapel doors were bolted from inside!",
          revealsNote: "Mara confirms Julian went in alone with his dictaphone to confront Elias.",
        },
      ],
    },
    {
      id: "sus-silas",
      name: "Silas Crowe",
      occupation: "Local Blacksmith & Church Warden",
      portrait:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
      relationshipToVictim: "Silas's family has forged ironwork for the chapel for three generations.",
      publicMotive:
        "Protect the chapel's folkloric reputation from outsider debunking.",
      privateHistory:
        "Silas knew there was a wire on the bell because he found it two weeks ago, but assumed it was Father Elias playing pranks to keep tourists away.",
      alibi:
        "Patrolling the outer churchyard perimeter with his hound between 1:30 AM and 2:30 AM.",
      actualActions:
        "Saw Father Elias standing by the ivy in the graveyard at 2:12 AM just as the bell rang.",
      interviewStages: [
        {
          id: "int-silas-1",
          question: "Did you see anyone near the chapel doors tonight?",
          response:
            "The front doors were barred tight as a tomb. But at 2:12 AM, right before the bell clanged, I saw Father Elias standing over by the churchyard yew tree. He jerked his hands, and the bell struck three times. I thought I was seeing a ghost.",
          revealsNote: "Silas witnessed Father Elias standing by the bell wire at 2:12 AM.",
        },
        {
          id: "int-silas-2",
          question: "Why do you have bell mechanism diagrams in your forge?",
          requiredEvidenceId: "ev-407",
          response:
            "Because I climbed the belfry ladder last Tuesday! I found that devil's wire running into the leaves. I wanted to see who was ringing the bell to scare the village folk.",
        },
      ],
    },
    {
      id: "sus-anika",
      name: "Dr. Anika Roy",
      occupation: "Diocesan Historian & Rival Researcher",
      portrait:
        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80",
      relationshipToVictim: "Colleague and rival researcher on parish archives.",
      publicMotive:
        "Wanted the glory of publishing the definitive solution to the 1998 disappearance.",
      privateHistory:
        "Dr. Roy followed Julian to Blackwood Ridge, but Julian locked his research in his satchel.",
      alibi:
        "Drinking cider in the Blackwood Arms lounge until 1:00 AM, then in bed.",
      actualActions:
        "Stayed at the inn all night. Innkeeper confirmed her presence.",
      interviewStages: [
        {
          id: "int-anika-1",
          question: "Did you speak with Professor Vance tonight?",
          response:
            "He refused to see me. He called me from the post office at 6:00 PM saying he had found the 'missing link' that would make his career. I was jealous, yes—I wanted the discovery myself. But I would never murder for ink and parchment.",
        },
      ],
    },
  ],
  timeline: [
    {
      id: "tl-41998",
      time: "September 1998",
      sortOrder: 1,
      title: "The Original Disappearance & Murder",
      description: "Brother Thomas murders the real Father Elias in the crypt, steals his identity, and claims Thomas vanished.",
      reliability: "verified",
      source: "Forensic Crypt Remains & Register Leaf",
      relatedEvidence: ["ev-404", "ev-405"],
      relatedSuspects: ["sus-elias"],
    },
    {
      id: "tl-40100",
      time: "1:00 AM",
      sortOrder: 2,
      title: "Julian Arrives at Saint Jude Sanctuary",
      description: "Julian enters the chapel with his key to inspect the confessional masonry.",
      reliability: "verified",
      source: "Dictaphone Audio Tape",
      relatedEvidence: ["ev-406"],
      relatedSuspects: ["sus-mara"],
    },
    {
      id: "tl-40130",
      time: "1:30 AM",
      sortOrder: 3,
      title: "Altar Candle Lit",
      description: "Julian lights the altar candle; 3.2-inch burn height marks the beginning of the fatal hour.",
      reliability: "verified",
      source: "Candle Height Forensic Measure",
      relatedEvidence: ["ev-402"],
      relatedSuspects: [],
    },
    {
      id: "tl-40138",
      time: "1:38 AM",
      sortOrder: 4,
      title: "Elias Enters via Priest Hole",
      description: "Elias slides through the rotating stone wall, confronts Julian, and poisons his wine with aconite.",
      reliability: "verified",
      source: "Dictaphone Audio Recording & Muddy Prints",
      relatedEvidence: ["ev-401", "ev-406"],
      relatedSuspects: ["sus-elias"],
    },
    {
      id: "tl-40150",
      time: "1:50 AM",
      sortOrder: 5,
      title: "Elias Escapes Through Secret Wall",
      description: "Julian succumbs to poison; Elias closes the stone pivot wall, leaving the main sanctuary doors bolted from inside.",
      reliability: "verified",
      source: "Footprint Trajectory",
      relatedEvidence: ["ev-401"],
      relatedSuspects: ["sus-elias"],
    },
    {
      id: "tl-40212",
      time: "2:12 AM",
      sortOrder: 6,
      title: "Elias Spotted in Churchyard",
      description: "Silas Crowe spots Elias standing near the yew tree grasping the ivy wire.",
      reliability: "reported",
      source: "Silas Crowe Eyewitness Account",
      relatedEvidence: ["ev-403"],
      relatedSuspects: ["sus-elias", "sus-silas"],
    },
    {
      id: "tl-40213",
      time: "2:13 AM",
      sortOrder: 7,
      title: "The Hollow Bell Tolls",
      description: "Elias pulls the wire from the graveyard, tolling the clapperless bell three times to forge a supernatural time of death.",
      reliability: "verified",
      source: "Acoustic Observation & Wire Mechanism",
      relatedEvidence: ["ev-403"],
      relatedSuspects: ["sus-elias"],
    },
  ],
  solution: {
    culpritId: "sus-elias",
    motive:
      "In 1998, caretaker Brother Thomas murdered the real Father Elias to steal church gold, assumed Elias's identity, and claimed 'Thomas vanished.' Julian Vance had found the parish register proving Elias was actually the imposter Brother Thomas.",
    method:
      "Elias entered the bolted chapel through a secret 17th-century priest-hole revolving wall behind the confessional, poisoned Julian's wine with aconite, slipped back to the graveyard, and pulled a hidden wire in the ivy at 2:13 AM to ring the dismantled bell and fake a supernatural omen.",
    decisiveEvidenceIds: ["ev-401", "ev-403", "ev-404"],
    alibiContradiction:
      "Father Elias swore he was praying in his cottage all night and that the sanctuary had remained sealed since 9:00 PM, but his custom orthotic boots left damp footprints that led straight into the secret rotating stone wall, and the scorched parish register was found in his hearth.",
    chronologicalSequence: [
      "1998: Brother Thomas murders the true Father Elias in the crypt and assumes his priesthood.",
      "1:00 AM: Julian Vance enters the sanctuary to confront the secret of the missing register.",
      "1:35 AM: Father Elias uses the priest hole behind the confessional to enter the locked chapel unnoticed.",
      "1:38 AM: Elias poisons Julian's wine with aconite; Julian's dictaphone records his final words.",
      "1:50 AM: Elias retreats through the stone pivot door, leaving the main sanctuary doors deadbolted from the inside.",
      "2:13 AM: Elias pulls the hidden wire in the cemetery ivy to ring the dismantled bell, creating a false supernatural time of death.",
    ],
    innocentSuspectExplanations: {
      "sus-mara":
        "Mara Voss discovered the missing parish register page, but remained in the rectory guest study until alerted by the bell at 2:13 AM.",
      "sus-silas":
        "Silas Crowe was guarding the cemetery with his dog; he saw Elias near the yew tree at 2:12 AM and his bell diagram was part of his own investigation into the prank wire.",
      "sus-anika":
        "Dr. Roy had academic rivalry with Julian, but remained at the Blackwood Arms Inn all night as verified by the innkeeper.",
    },
    redHerringExplanations: {
      "ev-407":
        "Silas Crowe's bell diagram made him seem like the bell rigger, but he was actively attempting to expose the fake ghost trick.",
      "ev-408":
        "The bishop's reprimand against Dr. Roy established sharp professional jealousy, but she had an ironclad public alibi.",
    },
    fullResolutionNarrative:
      "With the discovery of the concealed priest hole behind the confessional, the remote bell wire in the ivy, and the scorched 1998 register leaf revealing the handwriting of Brother Thomas, Father Elias could no longer maintain the illusion. He led investigators to the crypt where the skeletal remains of the true Father Elias were unearthed beneath the altar mortar. Brother Thomas was placed under arrest for double homicide.",
  },
  difficultyHints: {
    easy: [
      "Follow the damp footprints in the sanctuary—where do they lead, and whose shoes made them?",
      "Examine the ivy on the exterior belfry tower. Is the bell really being rung by a phantom?",
      "Check Father Elias's cottage fireplace for partially burned papers.",
    ],
    medium: [
      "The chapel appears locked from inside, but old churches often had architectural escape routes for clergy.",
      "How could an elderly caretaker ring a church bell from the ground without ascending the tower?",
      "The 1998 disappearance and the modern murder are the exact same crime.",
    ],
    hard: [
      "Calculate the burn rate of the altar candle to establish when the victim actually entered the sanctuary.",
      "Reconstruct the relationship between the 1998 caretaker disappearance and the man currently wearing the priest's cassock.",
      "Identify the trigger mechanism hidden in the third pillar of the confessional.",
    ],
    "very-hard": [
      "Compare the cursive script on the 1998 parish ledger with the handwriting of the modern caretaker.",
      "Correlate the 2:13 AM bell ringing with the physical eyewitness placement of the suspect in the churchyard.",
      "Verify the reverse hinge wear marks on the crypt subterranean door.",
    ],
  },
  deductionFormOptions: {
    motives: [
      { id: "mot-imposter-identity", label: "Cover up 1998 murder of the real Father Elias and stolen clerical identity" },
      { id: "mot-parish-curse", label: "Fulfill the local legend of the chapel punishing historical investigators" },
      { id: "mot-book-rivalry", label: "Prevent Julian from publishing the discovery of church archive relics" },
      { id: "mot-blacksmith-land", label: "Defend ancestral blacksmith land rights around the chapel cemetery" },
    ],
    methods: [
      { id: "meth-priest-hole", label: "Poisoned with aconite, escaped through secret priest-hole stone wall, rang bell via ivy wire" },
      { id: "meth-crypt-trap", label: "Locked Julian in the subterranean crypt without oxygen until dawn" },
      { id: "meth-bell-rope", label: "Climbed the belfry and pushed Julian from the stone tower parapet" },
      { id: "meth-candle-fumes", label: "Burned toxic sulfur candles inside the closed sanctuary" },
    ],
    contradictions: [
      { id: "con-footprint-wall", label: "Elias's custom orthotic footprints ended at the secret rotating stone wall panel" },
      { id: "con-candle-burn", label: "Candle burn height proved the altar was active at 1:30 AM, not sealed at 9:00 PM" },
      { id: "con-inn-witness", label: "Dr. Roy was verified asleep in the Blackwood Arms Inn" },
      { id: "con-dog-patrol", label: "Silas's dog never barked at any outside intruders" },
    ],
  },
};
