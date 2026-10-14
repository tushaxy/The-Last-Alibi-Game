"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ALL_CASES } from "@/data/cases";
import { soundEngine } from "@/lib/audio";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import {
  FolderOpen,
  ArrowRight,
  HelpCircle,
  Clock,
  Radio,
  Search,
  MessageSquare,
  Share2,
  Gavel,
  ShieldAlert,
  Lock,
  Compass,
  AlertOctagon,
  Eye,
  CheckCircle2,
  X,
} from "lucide-react";

export default function LandingPage() {
  const [selectedGenre, setSelectedGenre] = useState<string>("all");
  const [ambientStatus, setAmbientStatus] = useState<string>("TAPE IDLE (OFF)");
  const [activeAudioChip, setActiveAudioChip] = useState<string | null>(null);

  // Sample Contradiction Scanner in landing page
  const [scannerVerdict, setScannerVerdict] = useState<string>("READY FOR COMPARISON");
  const [evalHeadline, setEvalHeadline] = useState<string>("Select evidence to compare");
  const [evalText, setEvalText] = useState<string>(
    "The Countess stated she read all night by her reading lamp. Click an evidence token on the left to verify if her statement holds under scrutiny."
  );
  const [evalBadge, setEvalBadge] = useState<string>("AWAITING INPUT");
  const [isContradictionFatal, setIsContradictionFatal] = useState<boolean>(false);

  // Modal preview
  const [previewCase, setPreviewCase] = useState<(typeof ALL_CASES)[0] | null>(null);

  const handleToggleAudio = (mode: "rain" | "vinyl" | "clock" | "tape", label: string) => {
    soundEngine.playClick();
    if (activeAudioChip === mode) {
      soundEngine.stopAmbient();
      setActiveAudioChip(null);
      setAmbientStatus("TAPE IDLE (OFF)");
    } else {
      soundEngine.playAmbient(mode);
      setActiveAudioChip(mode);
      setAmbientStatus(`${label.toUpperCase()} (LOOPING)`);
    }
  };

  const handleTestSampleContradiction = (choice: number) => {
    soundEngine.playClick();
    if (choice === 1) {
      soundEngine.playContradictionExposed();
      setScannerVerdict("CONTRADICTION DETECTED!");
      setIsContradictionFatal(true);
      setEvalHeadline("FATAL ALIBI FLAW IDENTIFIED");
      setEvalText(
        "The Countess swore she read all night with her lamp lit. But the conductor's log confirms the lamp fuse in Compartment 7 blew out at 9:15 PM and was never repaired. She was not in her cabin."
      );
      setEvalBadge("CONTRADICTION CONFIRMED: PERJURY");
    } else if (choice === 2) {
      setScannerVerdict("INSUFFICIENT CONFLICT");
      setIsContradictionFatal(false);
      setEvalHeadline("Corroborating Timing Only");
      setEvalText(
        "The gold pocket watch stopped at 11:42 PM, which establishes the time of death, but does not disprove her presence elsewhere in the train."
      );
      setEvalBadge("NO DIRECT CONTRADICTION");
    } else {
      setScannerVerdict("CIRCUMSTANTIAL LEAD");
      setIsContradictionFatal(false);
      setEvalHeadline("Weak Physical Correlation");
      setEvalText(
        "The cigarette case contains Turkish tobacco. While the Countess smokes Turkish tobacco, two other passengers also purchased packs from the dining car."
      );
      setEvalBadge("INCONCLUSIVE EVIDENCE");
    }
  };

  const filteredCases = ALL_CASES.filter((c) => {
    if (selectedGenre === "all") return true;
    if (selectedGenre === "noir" && c.genre.toLowerCase().includes("classic")) return true;
    if (selectedGenre === "locked" && c.genre.toLowerCase().includes("locked")) return true;
    if (selectedGenre === "psych" && c.genre.toLowerCase().includes("psychological")) return true;
    if (selectedGenre === "gothic" && c.genre.toLowerCase().includes("horror")) return true;
    return false;
  });

  return (
    <div className="min-h-screen flex flex-col bg-[#10100F] text-[#EAE3D5]">
      {/* Top Header */}
      <Header />

      <main className="flex-1 pt-16">
        {/* HERO SECTION: OVERHEAD FORENSIC DESK CHIAROSCURO */}
        <section className="relative w-full overflow-hidden bg-[#0e0e0d] py-12 lg:py-20 px-4 sm:px-8 lg:px-16 border-b border-[#38342D]">
          {/* Ambient Lighting Gradients */}
          <div className="pointer-events-none absolute -top-40 left-1/4 h-[500px] w-[500px] rounded-full bg-[#a52a2a]/10 blur-[130px]" />
          <div className="pointer-events-none absolute bottom-0 right-10 h-[450px] w-[450px] rounded-full bg-[#574418]/15 blur-[120px]" />

          <div className="relative mx-auto max-w-7xl">
            {/* Classified Dossier Header Bar */}
            <div className="mb-6 flex flex-wrap items-center justify-between gap-3 border-b border-[#38342D]/60 pb-3">
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center gap-1.5 bg-[#201E1A] px-2.5 py-1 font-mono text-[11px] uppercase tracking-widest text-[#dfc38c] border border-[#38342D]">
                  <Lock className="w-3.5 h-3.5" />
                  <span>FILE REF: VERITAS-48-ARCHIVE</span>
                </span>
                <span className="font-mono text-[11px] uppercase tracking-wider text-[#9B958B] hidden sm:inline">
                  CLEARANCE: LEVEL 5 // DO NOT DISPERSE
                </span>
              </div>

              <span className="inline-block -rotate-2 bg-[#a52a2a]/20 border border-[#a52a2a] px-3 py-0.5 font-mono text-xs font-bold uppercase tracking-widest text-[#ffb3ad] shadow-sm">
                CONFIDENTIAL • UNSEALED
              </span>
            </div>

            {/* Main Asymmetric Hero Grid */}
            <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12">
              {/* Text Column (5 cols) */}
              <div className="flex flex-col items-start gap-5 lg:col-span-5">
                <div className="space-y-1">
                  <span className="font-mono text-xs uppercase tracking-widest text-[#dfc38c]">
                    CLASSIFIED INVESTIGATION ARCHIVE // DIVISION 4
                  </span>
                  <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#EAE3D5] leading-none">
                    THE LAST ALIBI
                  </h1>
                  <p className="font-serif text-xl sm:text-2xl italic text-[#ffb3ad] pt-1">
                    &ldquo;Four cases. Countless lies. One truth.&rdquo;
                  </p>
                </div>

                <p className="font-sans text-sm sm:text-base text-[#cdc5bb] leading-relaxed">
                  Someone is lying. Someone is hiding something. And one person knows exactly what
                  happened in the dark. Examine the forensic evidence, cross-reference testimonies
                  under the microscope, and dismantle the perfect alibi.
                </p>

                {/* Primary CTAs */}
                <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto pt-2">
                  <a
                    href="#active-cases"
                    className="group flex items-center justify-center gap-2 bg-[#a52a2a] hover:bg-[#8C2323] px-6 py-3 font-mono text-xs font-bold uppercase tracking-widest text-white shadow-xl transition-all duration-200"
                  >
                    <FolderOpen className="w-4 h-4" />
                    <span>ENTER THE ARCHIVE</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </a>

                  <a
                    href="#how-to-investigate"
                    className="flex items-center justify-center gap-2 bg-[#201E1A] border border-[#38342D] hover:border-[#dfc38c] px-5 py-3 font-mono text-xs uppercase tracking-wider text-[#EAE3D5] hover:text-[#dfc38c] transition-all"
                  >
                    <HelpCircle className="w-4 h-4" />
                    <span>HOW TO INVESTIGATE</span>
                  </a>
                </div>

                {/* Procedural Atmospheric Soundscape Controls */}
                <div className="w-full bg-[#191816] border border-[#38342D] p-3 space-y-2 shadow-md">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] text-[#dfc38c] uppercase tracking-wider flex items-center gap-1.5 font-bold">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#dfc38c] animate-pulse" />
                      ATMOSPHERIC REEL AUDIO
                    </span>
                    <span className="font-mono text-[10px] text-[#9B958B]">{ambientStatus}</span>
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    {[
                      { id: "rain", label: "Rain 42dB", icon: "rain" },
                      { id: "vinyl", label: "Vinyl Static", icon: "vinyl" },
                      { id: "clock", label: "Pocket Watch", icon: "clock" },
                      { id: "tape", label: "Tape Hiss", icon: "tape" },
                    ].map((chip) => (
                      <button
                        key={chip.id}
                        onClick={() => handleToggleAudio(chip.id as any, chip.label)}
                        className={`px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider border transition-all ${
                          activeAudioChip === chip.id
                            ? "bg-[#a52a2a] border-[#ffb3ad] text-white font-bold"
                            : "bg-[#201E1A] border-[#38342D] text-[#cdc5bb] hover:border-[#dfc38c]"
                        }`}
                      >
                        {chip.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Hero Visual: Overhead Detective Desk (7 cols) */}
              <div className="relative lg:col-span-7">
                <div className="relative overflow-hidden border border-[#38342D] bg-[#0e0e0d] shadow-2xl">
                  <img
                    src="https://images.unsplash.com/photo-1517649763962-0c623266ddc0?auto=format&fit=crop&w=1200&q=80"
                    alt="Noir detective desk overhead scene with dossier, vintage case photos, magnifying glass and evidence pins"
                    className="h-full max-h-[520px] w-full object-cover filter contrast-125 brightness-90 select-none"
                  />

                  {/* Rubber Stamp Overlay */}
                  <div className="pointer-events-none absolute top-6 right-6 -rotate-12 bg-[#10100F]/90 border-2 border-[#a52a2a] px-4 py-2 shadow-2xl backdrop-blur-md">
                    <span className="font-mono text-xl font-bold uppercase tracking-widest text-[#ffb3ad] block">
                      CLASSIFIED
                    </span>
                    <span className="font-mono text-[9px] tracking-widest text-[#ffb3ad]/80 text-center block">
                      EVIDENCE SECURED 1948
                    </span>
                  </div>

                  {/* Red String Overlay Tag */}
                  <div className="absolute bottom-6 left-6 max-w-xs bg-[#10100F]/90 border border-[#38342D] p-3 shadow-xl backdrop-blur-md">
                    <div className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-[#a52a2a] animate-ping" />
                      <span className="font-mono text-[10px] uppercase tracking-widest text-[#dfc38c] font-bold">
                        EXHIBIT A // INCIDENT DESK
                      </span>
                    </div>
                    <p className="mt-1 font-sans text-xs leading-tight text-[#cdc5bb]">
                      &ldquo;Four separate crime scenes connected by unrecorded minutes, missing keys, and broken alibis.&rdquo;
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* METRICS DISPATCH STRIP */}
        <section className="w-full bg-[#141311] py-6 px-4 sm:px-8 border-b border-[#38342D]">
          <div className="mx-auto grid max-w-7xl grid-cols-2 gap-4 md:grid-cols-4">
            <div className="bg-[#191816] p-4 border border-[#38342D]">
              <span className="font-mono text-[10px] uppercase text-[#dfc38c] block">
                ACTIVE DOSSIERS
              </span>
              <span className="font-serif text-2xl font-bold text-[#EAE3D5]">04 CASES</span>
              <span className="font-sans text-xs text-[#9B958B] block mt-0.5">
                100% Fully Documented
              </span>
            </div>
            <div className="bg-[#191816] p-4 border border-[#38342D]">
              <span className="font-mono text-[10px] uppercase text-[#ffb3ad] block">
                RECORDED SUSPECTS
              </span>
              <span className="font-serif text-2xl font-bold text-[#EAE3D5]">17 PERSONS</span>
              <span className="font-sans text-xs text-[#9B958B] block mt-0.5">
                Cross-examined on tape
              </span>
            </div>
            <div className="bg-[#191816] p-4 border border-[#38342D]">
              <span className="font-mono text-[10px] uppercase text-[#dfc38c] block">
                EVIDENCE CATALOG
              </span>
              <span className="font-serif text-2xl font-bold text-[#EAE3D5]">32 EXHIBITS</span>
              <span className="font-sans text-xs text-[#9B958B] block mt-0.5">
                Physical, digital &amp; autopsy
              </span>
            </div>
            <div className="bg-[#191816] p-4 border border-[#38342D]">
              <span className="font-mono text-[10px] uppercase text-[#cdc5bb] block">
                SOLVE RATE
              </span>
              <span className="font-serif text-2xl font-bold text-[#EAE3D5]">18.4%</span>
              <span className="font-sans text-xs text-[#9B958B] block mt-0.5">
                True killers brought to justice
              </span>
            </div>
          </div>
        </section>

        {/* ACTIVE INVESTIGATIONS DOSSIER ARCHIVE */}
        <section className="w-full py-16 px-4 sm:px-8 lg:px-16" id="active-cases">
          <div className="mx-auto max-w-7xl">
            {/* Section Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-mono text-xs uppercase tracking-widest text-[#a52a2a] font-bold">
                    PRIMARY ARCHIVE REPOSITORY
                  </span>
                  <span className="h-1.5 w-1.5 rounded-full bg-[#a52a2a]" />
                  <span className="font-mono text-xs text-[#9B958B]">CLEARANCE REQUIRED</span>
                </div>
                <h2 className="font-serif text-3xl lg:text-4xl text-[#EAE3D5] font-bold">
                  Active Investigations
                </h2>
                <p className="font-sans text-sm text-[#9B958B] mt-1">
                  Choose your case. Trust nothing at first glance. Every detail is a deliberate clue
                  or a fatal misdirection.
                </p>
              </div>

              {/* Genre Filter Pills */}
              <div className="flex flex-wrap gap-1.5">
                {[
                  { id: "all", label: "ALL ARCHIVES" },
                  { id: "noir", label: "CLASSIC NOIR" },
                  { id: "locked", label: "LOCKED ROOM" },
                  { id: "psych", label: "PSYCHOLOGICAL" },
                  { id: "gothic", label: "GOTHIC HORROR" },
                ].map((f) => (
                  <button
                    key={f.id}
                    onClick={() => setSelectedGenre(f.id)}
                    className={`px-3 py-1.5 font-mono text-xs uppercase tracking-wider border transition-all ${
                      selectedGenre === f.id
                        ? "bg-[#a52a2a] border-[#ffb3ad] text-white font-bold"
                        : "bg-[#201E1A] border-[#38342D] text-[#9B958B] hover:text-[#EAE3D5] hover:border-[#dfc38c]"
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </div>

            {/* 2x2 Bespoke Editorial Dossier Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {filteredCases.map((c) => (
                <article
                  key={c.id}
                  className="bg-[#191816] border border-[#38342D] p-5 shadow-2xl flex flex-col justify-between group hover:border-[#dfc38c] transition-all duration-300"
                >
                  <div>
                    {/* Header line */}
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <span className="bg-[#2a2a29] text-[#dfc38c] font-mono text-[10px] font-bold px-2 py-0.5 border border-[#38342D] tracking-widest uppercase">
                          {c.caseNumber}
                        </span>
                        <span className="font-mono text-[10px] text-[#9B958B] uppercase">
                          {c.genre}
                        </span>
                      </div>
                      <span className="bg-[#201E1A] text-[#dfc38c] font-mono text-[10px] px-2 py-0.5 border border-[#38342D] uppercase font-bold">
                        DIFFICULTY: {c.defaultDifficulty}
                      </span>
                    </div>

                    {/* Case Cover Image */}
                    <div className="relative h-60 w-full overflow-hidden border border-[#38342D] bg-[#0e0e0d] mb-4">
                      <img
                        src={c.coverImage}
                        alt={c.title}
                        className="w-full h-full object-cover filter contrast-110 brightness-90 group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute bottom-2 left-2 bg-[#10100F]/90 border border-[#38342D] px-2.5 py-1 flex items-center gap-1.5 font-mono text-[10px] text-[#dfc38c]">
                        <Clock className="w-3 h-3" />
                        <span>INCIDENT: {c.incidentDate}</span>
                      </div>
                    </div>

                    {/* Title & Synopsis */}
                    <h3 className="font-serif text-2xl font-bold text-[#EAE3D5] group-hover:text-[#dfc38c] transition-colors">
                      {c.title}
                    </h3>
                    <p className="font-serif text-xs italic text-[#dfc38c] mt-0.5 mb-2">
                      &ldquo;{c.tagline}&rdquo;
                    </p>
                    <p className="font-sans text-xs text-[#cdc5bb] line-clamp-3 leading-relaxed">
                      {c.synopsis}
                    </p>
                  </div>

                  {/* Metrics and Entry CTA */}
                  <div className="mt-6 pt-4 border-t border-[#38342D] space-y-4">
                    <div className="grid grid-cols-3 gap-2 bg-[#10100F] p-2.5 border border-[#38342D] text-center font-mono text-xs">
                      <div>
                        <span className="block text-[10px] text-[#9B958B]">PLAYTIME</span>
                        <span className="font-bold text-[#EAE3D5]">{c.estimatedMinutes} MINS</span>
                      </div>
                      <div>
                        <span className="block text-[10px] text-[#9B958B]">SUSPECTS</span>
                        <span className="font-bold text-[#ffb3ad]">{c.suspects.length} PERSONS</span>
                      </div>
                      <div>
                        <span className="block text-[10px] text-[#9B958B]">EXHIBITS</span>
                        <span className="font-bold text-[#dfc38c]">{c.evidence.length} ITEMS</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <button
                        onClick={() => setPreviewCase(c)}
                        className="font-mono text-xs text-[#9B958B] hover:text-[#dfc38c] uppercase tracking-wider flex items-center gap-1"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>QUICK BRIEF</span>
                      </button>

                      <Link
                        href={`/cases/${c.slug}`}
                        className="flex items-center gap-2 px-5 py-2.5 bg-[#a52a2a] hover:bg-[#8C2323] text-white font-mono text-xs uppercase tracking-widest font-bold shadow-lg transition-colors"
                      >
                        <span>OPEN CASE FILE</span>
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* HOW TO INVESTIGATE: FORENSIC METHODOLOGY STRIP */}
        <section
          className="w-full bg-[#0e0e0d] py-16 px-4 sm:px-8 lg:px-16 border-t border-[#38342D]"
          id="how-to-investigate"
        >
          <div className="mx-auto max-w-7xl">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="font-mono text-xs uppercase tracking-widest text-[#dfc38c] font-bold">
                FIELD DETECTIVE PROTOCOL // MANUAL 1948
              </span>
              <h2 className="font-serif text-3xl lg:text-4xl text-[#EAE3D5] font-bold mt-1">
                How to Crack the Case
              </h2>
              <p className="font-sans text-sm text-[#9B958B] mt-2">
                Every mystery has exactly one canonical, defensible solution. No supernatural
                cop-outs, no missing critical facts. Follow the protocol.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  step: "01",
                  title: "Examine Physical Evidence",
                  desc: "Inspect high-resolution crime scene photography, ballistics reports, handwritten logs, and coroner autopsy findings.",
                  icon: <Search className="w-5 h-5 text-[#dfc38c]" />,
                },
                {
                  step: "02",
                  title: "Interrogate & Spot Flaws",
                  desc: "Cross-examine suspects on tape. When an alibi contradicts the train clock, room temperature, or key logs, flag it immediately.",
                  icon: <MessageSquare className="w-5 h-5 text-[#dfc38c]" />,
                },
                {
                  step: "03",
                  title: "Pin the Connection Board",
                  desc: "String clues and suspect profiles across your personal detective corkboard to track motives, murder weapons, and timeline holes.",
                  icon: <Share2 className="w-5 h-5 text-[#dfc38c]" />,
                },
                {
                  step: "04",
                  title: "Submit Final Accusation",
                  desc: "Present your formal warrant: identify the true perpetrator, their decisive motive, the exact method, and the fatal alibi contradiction.",
                  icon: <Gavel className="w-5 h-5 text-[#ffb3ad]" />,
                },
              ].map((item) => (
                <div
                  key={item.step}
                  className="bg-[#191816] border border-[#38342D] p-5 shadow-lg flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="font-mono text-2xl font-bold text-[#dfc38c]">
                        {item.step}
                      </span>
                      <div className="p-2 bg-[#201E1A] border border-[#38342D]">{item.icon}</div>
                    </div>
                    <h4 className="font-serif text-lg font-bold text-[#EAE3D5] mb-2">
                      {item.title}
                    </h4>
                    <p className="font-sans text-xs text-[#cdc5bb] leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* INTERACTIVE CONTRADICTION MATRIX DEMONSTRATION */}
        <section className="w-full bg-[#141311] py-16 px-4 sm:px-8 lg:px-16 border-t border-[#38342D]">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4 mb-8">
              <div>
                <span className="font-mono text-xs uppercase tracking-widest text-[#a52a2a] font-bold">
                  TACTICAL SAMPLE // INTERACTIVE PREVIEW
                </span>
                <h3 className="font-serif text-3xl text-[#EAE3D5] font-bold mt-1">
                  Live Contradiction Scanner
                </h3>
                <p className="font-sans text-sm text-[#9B958B]">
                  Experience the core mechanic: compare witness claims against physical exhibits to expose the fatal flaw.
                </p>
              </div>
              <div className="flex items-center gap-2 bg-[#191816] p-2 border border-[#38342D] font-mono text-xs">
                <span className="text-[#dfc38c]">SCANNER:</span>
                <span className={isContradictionFatal ? "text-[#ffb3ad] font-bold animate-pulse" : "text-[#dfc38c]"}>
                  {scannerVerdict}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
              {/* Suspect Statement Card */}
              <div className="bg-[#191816] border border-[#38342D] p-5 flex flex-col justify-between shadow-lg">
                <div>
                  <div className="flex items-center justify-between mb-2 font-mono text-[10px] text-[#dfc38c]">
                    <span>RECORDED TESTIMONY #4</span>
                    <span>11:55 PM</span>
                  </div>
                  <h4 className="font-serif text-xl font-bold text-[#EAE3D5]">Countess Von Berg</h4>
                  <blockquote className="mt-3 font-serif text-sm italic text-[#cdc5bb] border-l-2 border-[#a52a2a] pl-3 py-1 leading-relaxed">
                    &ldquo;I retired to Compartment 7 promptly at 10:30 PM. I remained inside with my
                    reading lamp on all night until the conductor alerted us. I never set foot in the
                    corridor or near Adrian&apos;s cabin.&rdquo;
                  </blockquote>
                </div>
                <div className="mt-4 pt-3 border-t border-[#38342D] flex items-center justify-between font-mono text-[10px] text-[#9B958B]">
                  <span>ALIBI WITNESS: NONE</span>
                  <span className="text-[#a52a2a] font-bold">UNVERIFIED STATEMENT</span>
                </div>
              </div>

              {/* Clues to click */}
              <div className="bg-[#191816] border border-[#38342D] p-5 space-y-2 shadow-lg">
                <span className="font-mono text-xs uppercase tracking-wider text-[#dfc38c] font-bold block mb-2">
                  CLICK TO CROSS-REFERENCE EXHIBIT
                </span>

                <button
                  onClick={() => handleTestSampleContradiction(1)}
                  className="w-full p-3 bg-[#201E1A] hover:bg-[#2a2a29] border border-[#38342D] hover:border-[#dfc38c] text-left transition-colors flex items-center justify-between group"
                >
                  <div>
                    <span className="font-serif text-xs font-bold text-[#EAE3D5] block group-hover:text-[#dfc38c]">
                      TICKET COLLECTOR&apos;S SERVICE LOG
                    </span>
                    <span className="font-mono text-[10px] text-[#9B958B]">
                      Compartment 7 lamp fuse blown at 9:15 PM
                    </span>
                  </div>
                  <AlertOctagon className="w-4 h-4 text-[#a52a2a] opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>

                <button
                  onClick={() => handleTestSampleContradiction(2)}
                  className="w-full p-3 bg-[#201E1A] hover:bg-[#2a2a29] border border-[#38342D] hover:border-[#dfc38c] text-left transition-colors flex items-center justify-between group"
                >
                  <div>
                    <span className="font-serif text-xs font-bold text-[#EAE3D5] block group-hover:text-[#dfc38c]">
                      GOLD POCKET WATCH
                    </span>
                    <span className="font-mono text-[10px] text-[#9B958B]">
                      Stopped crystal hands resting at 11:42 PM
                    </span>
                  </div>
                  <AlertOctagon className="w-4 h-4 text-[#a52a2a] opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>

                <button
                  onClick={() => handleTestSampleContradiction(3)}
                  className="w-full p-3 bg-[#201E1A] hover:bg-[#2a2a29] border border-[#38342D] hover:border-[#dfc38c] text-left transition-colors flex items-center justify-between group"
                >
                  <div>
                    <span className="font-serif text-xs font-bold text-[#EAE3D5] block group-hover:text-[#dfc38c]">
                      SILVER CIGARETTE CASE
                    </span>
                    <span className="font-mono text-[10px] text-[#9B958B]">
                      Turkish blend found outside compartment B
                    </span>
                  </div>
                  <AlertOctagon className="w-4 h-4 text-[#a52a2a] opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              </div>

              {/* Evaluation Result */}
              <div
                className={`p-5 border flex flex-col justify-between shadow-lg transition-colors ${
                  isContradictionFatal
                    ? "bg-[#a52a2a]/20 border-[#a52a2a]"
                    : "bg-[#191816] border-[#38342D]"
                }`}
              >
                <div>
                  <div className="flex items-center gap-2 mb-2 font-mono text-xs uppercase tracking-widest text-[#dfc38c] font-bold">
                    <span>ANOMALY EVALUATOR</span>
                  </div>
                  <h4
                    className={`font-serif text-lg font-bold ${
                      isContradictionFatal ? "text-[#ffb3ad]" : "text-[#EAE3D5]"
                    }`}
                  >
                    {evalHeadline}
                  </h4>
                  <p className="font-sans text-xs text-[#cdc5bb] mt-2 leading-relaxed">
                    {evalText}
                  </p>
                </div>

                <div
                  className={`mt-4 p-2 text-center font-mono text-xs uppercase font-bold tracking-wider border ${
                    isContradictionFatal
                      ? "bg-[#a52a2a] border-[#ffb3ad] text-white"
                      : "bg-[#201E1A] border-[#38342D] text-[#9B958B]"
                  }`}
                >
                  {evalBadge}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Case Preview Quick Brief Modal */}
      {previewCase && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 animate-in fade-in duration-200">
          <div className="relative w-full max-w-2xl bg-[#191816] border border-[#38342D] p-6 shadow-2xl text-[#EAE3D5] space-y-4">
            <div className="flex items-center justify-between border-b border-[#38342D] pb-3">
              <span className="font-mono text-xs text-[#dfc38c] uppercase font-bold">
                {previewCase.caseNumber} // PRE-DISPATCH BRIEFING
              </span>
              <button
                onClick={() => setPreviewCase(null)}
                className="p-1 text-[#9B958B] hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <h3 className="font-serif text-2xl font-bold">{previewCase.title}</h3>
            <p className="font-sans text-xs text-[#cdc5bb] leading-relaxed">
              {previewCase.synopsis}
            </p>

            <div className="grid grid-cols-2 gap-3 bg-[#10100F] p-3 border border-[#38342D] font-mono text-xs">
              <div>
                <span className="text-[#9B958B] block text-[10px]">VICTIM:</span>
                <span className="text-[#EAE3D5] font-bold">{previewCase.victim.name}</span>
              </div>
              <div>
                <span className="text-[#9B958B] block text-[10px]">DIFFICULTY:</span>
                <span className="text-[#dfc38c] uppercase font-bold">
                  {previewCase.defaultDifficulty}
                </span>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-3 border-t border-[#38342D]">
              <button
                onClick={() => setPreviewCase(null)}
                className="px-4 py-2 bg-[#201E1A] border border-[#38342D] text-xs font-mono text-[#cdc5bb]"
              >
                RETURN TO ARCHIVE
              </button>
              <Link
                href={`/cases/${previewCase.slug}`}
                className="px-5 py-2 bg-[#a52a2a] hover:bg-[#8C2323] text-white font-mono text-xs uppercase font-bold tracking-wider"
              >
                COMMENCE INVESTIGATION
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Footer with exact requested attributions */}
      <Footer />
    </div>
  );
}
