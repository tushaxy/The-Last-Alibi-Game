import React from "react";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { AlertTriangle, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col bg-[#10100F] text-[#EAE3D5]">
      <Header />
      <main className="flex-1 flex items-center justify-center p-6 pt-24">
        <div className="max-w-md w-full bg-[#191816] border border-[#38342D] p-8 text-center space-y-4 shadow-2xl">
          <div className="w-12 h-12 rounded-none bg-[#a52a2a]/20 border border-[#a52a2a] flex items-center justify-center mx-auto text-[#ffb3ad]">
            <AlertTriangle className="w-6 h-6" />
          </div>

          <div className="space-y-1">
            <span className="font-mono text-xs text-[#a52a2a] uppercase tracking-widest font-bold">
              ERROR 404 // CLASSIFIED
            </span>
            <h1 className="font-serif text-3xl font-bold text-[#EAE3D5]">
              Dossier Expunged
            </h1>
          </div>

          <p className="font-sans text-xs text-[#cdc5bb] leading-relaxed">
            The requested case file or investigative node does not exist in the Level 5 registry.
            Return to the main repository to resume active inquiries.
          </p>

          <div className="pt-2">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#a52a2a] hover:bg-[#8C2323] text-white font-mono text-xs uppercase tracking-widest font-bold transition-colors shadow-lg"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>RETURN TO ARCHIVE</span>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
