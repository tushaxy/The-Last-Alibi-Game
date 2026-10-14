import type { Metadata } from "next";
import { Playfair_Display, Manrope, Space_Mono } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

const spaceMono = Space_Mono({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-space-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "THE LAST ALIBI — Interactive Detective Mystery Game",
  description:
    "Four original murder cases. Countless lies. One truth. Examine classified crime scenes, cross-reference contradictory testimonies, and expose the fatal alibi.",
  authors: [{ name: "Tushar" }],
  keywords: [
    "murder mystery game",
    "detective escape room",
    "interactive investigation",
    "forensic puzzle",
    "the last alibi",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`dark ${playfair.variable} ${manrope.variable} ${spaceMono.variable} h-full`}
    >
      <body className="min-h-full flex flex-col bg-[#10100F] text-[#EAE3D5] antialiased selection:bg-[#a52a2a] selection:text-[#ffc0bb]">
        {children}
      </body>
    </html>
  );
}
