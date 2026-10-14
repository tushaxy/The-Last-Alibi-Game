# THE LAST ALIBI — Interactive Murder Mystery Game

> **"Four cases. Countless lies. One truth."**  
> *A dark editorial detective investigation experience.*

**Creator Attribution:** Made by **@Tushar**  
**Deployment Target:** Vercel  

---

## 1. Project Overview

**THE LAST ALIBI** is a production-quality, playable detective investigation web application inspired by real-world escape rooms, classic noir fiction, forensic pathology, and psychological horror. 

Players assume the role of an inquisitor examining four completely original, logically defensible murder cases:
1. **Case 001: The Last Train** (Classic Detective Mystery — Easy)
2. **Case 002: The Glasshouse** (Locked-Room Mystery — Medium)
3. **Case 003: The Blackout Room** (Psychological Thriller — Hard)
4. **Case 004: The Hollow Saint** (Psychological Horror Mystery — Very Hard)

Every case features a documented crime scene with interactive hotspots, branching suspect interrogations that unlock via discovered clues, a chronological timeline with reliability ratings, an interactive murder corkboard with red-string connections, a live contradiction scanner, and a structured magistrate accusation warrant engine.

---

## 2. Technology Stack

- **Framework:** Next.js 16 (App Router with Turbopack)
- **Library:** React 19
- **Language:** TypeScript (Strict Type Checking)
- **Styling:** Vanilla Tailwind CSS with custom dark editorial tokens (`#10100F`, `#131312`, `#20201e`, `#a52a2a`, `#dfc38c`)
- **Typography:** Playfair Display (Serif Headings), Manrope (Narrative Body), Space Mono (Classified & Timestamps)
- **Sound Design:** Zero-dependency Procedural Web Audio API soundscape synthesizer (Rain on Glass, Vinyl Static, Pocket Watch Tick, Tape Hiss, Crypt Drone) + Forensic SFX
- **Celebration Effects:** `canvas-confetti`
- **Testing:** Native Node.js `node:test` and `node:assert/strict` with `tsx`
- **Persistence:** Local browser storage with versioned schemas (`the_last_alibi_save_v1_`)

---

## 3. Four Canonical Playable Mysteries

### Case 001: The Last Train
- **Premise:** At 11:40 PM, antiques dealer Adrian Vale is found dead in his private railway compartment aboard the night train between Zurich and Vienna. The door was bolted from the inside.
- **Suspects:** Eleanor Vale (estranged wife), Marcus Reed (business partner), Dr. Simon Cross (physician), Clara Finch (journalist), Thomas Bell (attendant).
- **Culprit:** **Marcus Reed**
- **Motive:** Adrian discovered Marcus had embezzled £45,000 through forged Byzantine antiquities certificates and was about to hand him to Scotland Yard at Vienna.
- **Method:** Poisoned Adrian's port carafe with digitalis, exited into the corridor at 10:42 PM, and threw the interior brass deadbolt from outside using high-tensile waxed olive thread threaded through the overhead ventilation louvre.
- **Decisive Contradiction:** Marcus claimed he was drinking in the Dining Car from 10:20 PM to 11:35 PM with a paper receipt, but the official railway log proves the Dining Car galley caught fire and was evacuated/closed at 10:15 PM!

---

### Case 002: The Glasshouse
- **Premise:** Botanist Dr. Helena Marsh is discovered bludgeoned to death inside her secured Victorian conservatory during a violent storm. Security registered no entries after 9:15 PM.
- **Suspects:** Julian Marsh (brother), Nora Bell (research assistant), Victor Hale (estate manager), Amelia Frost (visiting collector).
- **Culprit:** **Nora Bell**
- **Motive:** Helena stole sole authorship of Nora's 3-year breakthrough orchid hybrid (*Cattleya vesta*) in an upcoming monograph and threatened to blacklist Nora from academia.
- **Method:** Nora struck Helena with a heavy cast-iron soil tamper at 8:50 PM, hid the tamper in the rainwater cistern, forced the steam heating valve open to 35°C to distort the post-mortem cooling time of death, locked the mortise bolt with Helena's key at 9:05 PM, and tripped the estate breaker at 9:11 PM to blind the security cameras while returning.
- **Decisive Contradiction:** Nora swore she remained in the carpeted library reading all night and never went outdoors, but rare volcanic perlite soil exclusive to the greenhouse tropical bed was found embedded in the tread of her satin bedroom slippers.

---

### Case 003: The Blackout Room
- **Premise:** Tech mogul Rohan Mehta is killed inside his 42nd-floor penthouse during an 18-minute citywide blackout. Four suspects give conflicting accounts of what happened in the dark.
- **Suspects:** Maya Kapoor (co-founder), Dev Arora (personal assistant), Ishaan Khanna (neighbor), Rhea Sen (ex-partner).
- **Culprit:** **Dev Arora**
- **Motive:** Dev had embezzled $4.2M from the firm's cryptocurrency treasury into a cold storage wallet. Rohan discovered it and scheduled an ultimatum meeting for 10:00 PM.
- **Method:** When the grid failed at 10:02 PM, Elevator B switched to the emergency generator within 4 seconds. Dev rode Elevator B up to Floor 42 at 10:04 PM, attacked Rohan in the darkness, and strangled him with an armored fiber-optic patch cable at 10:08 PM.
- **Decisive Contradiction:** Dev claimed Rohan was already dead at 9:55 PM, but Rohan's smartwatch heart telemetry proved a violent struggle at 10:08 PM (spiking to 174 BPM and flatlining at 10:11 PM), and Elevator B's generator log tracked Dev's transit during the blackout.

---

### Case 004: The Hollow Saint
- **Premise:** In 1998, a caretaker vanished from an isolated stone chapel on Blackwood Ridge. Twenty-eight years later, senior historian Professor Julian Vance is found dead before the altar. The sanctuary was deadbolted from the inside, yet the clapperless chapel bell tolled at 2:13 AM.
- **Suspects:** Father Elias (caretaker & priest), Mara Voss (associate historian), Silas Crowe (local blacksmith), Dr. Anika Roy (rival investigator).
- **Culprit:** **Father Elias (Brother Thomas)**
- **Motive:** In 1998, caretaker Brother Thomas murdered the real Father Elias to steal church gold, assumed Elias's identity, and claimed Thomas vanished. Julian Vance and Mara Voss uncovered the 1998 parish ledger proving the handwriting on Thomas's disappearance report matched the current priest.
- **Method:** Elias entered the bolted chapel through a secret 17th-century priest-hole rotating wall behind the confessional, poisoned Julian's wine with aconite at 1:38 AM, slipped back to the graveyard, and pulled a hidden wire in the ivy at 2:13 AM to ring the dismantled bell and fake a supernatural omen.
- **Decisive Contradiction:** Father Elias claimed he was praying in his cottage all night and that the sanctuary had remained sealed since 9:00 PM, but his custom orthotic boots left damp bog footprints that ended at the secret rotating stone wall panel, and the scorched 1998 parish register page was recovered from his hearth.

---

## 4. How to Run Locally

### Prerequisites
- Node.js 18.18+ or Node.js 20+ (Node 24 tested & supported)
- npm 9+

### Commands

```bash
# 1. Install dependencies
npm install

# 2. Run automated case logic and validator test suite
npm test

# 3. Start local development server
npm run dev

# 4. Build for production (optimized static export)
npm run build

# 5. Start production preview
npm run start
```

Visit [http://localhost:3000](http://localhost:3000) in your browser.

---

## 5. Deployment Instructions for Vercel

The application is structured for instant zero-configuration deployment on Vercel:

1. **Push your code to GitHub / GitLab:**
   ```bash
   git add .
   git commit -m "feat: complete playable The Last Alibi interactive game"
   git push origin main
   ```
2. **Import into Vercel:**
   - Log into [Vercel](https://vercel.com).
   - Click **Add New Project** and select your repository.
   - Framework Preset: **Next.js** (automatically detected).
   - Build Command: `next build` (default).
   - Output Directory: `.next` (default).
   - No external environment variables or API keys are required!
3. **Deploy:**
   - Click **Deploy**. Vercel will prerender all static case pages (`/`, `/cases/the-last-train`, `/cases/the-glasshouse`, `/cases/the-blackout-room`, `/cases/the-hollow-saint`).
   - Share your live deployment link with friends!

---

## 6. How to Add a New Mystery

1. Create a new case file in `src/data/cases/caseX-title.ts` conforming to the `Case` interface in `src/types/game.ts`.
2. Register the case in `src/data/cases/index.ts`.
3. Run `npm test` to verify that all evidence IDs, suspect references, unlock conditions, and solution elements pass 100% of data validations.

---

**THE LAST ALIBI — AN INTERACTIVE DETECTIVE EXPERIENCE**  
*CLEARANCE: LEVEL 5 CONFIDENTIAL*  
*MADE BY @TUSHAR*
