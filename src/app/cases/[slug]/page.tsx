import { ALL_CASES, getCaseBySlug } from "@/data/cases";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { CaseInvestigationClient } from "./CaseInvestigationClient";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return ALL_CASES.map((c) => ({
    slug: c.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const currentCase = getCaseBySlug(slug);

  if (!currentCase) {
    return {
      title: "Case Not Found — THE LAST ALIBI",
    };
  }

  return {
    title: `${currentCase.caseNumber}: ${currentCase.title} — THE LAST ALIBI`,
    description: currentCase.synopsis,
  };
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const currentCase = getCaseBySlug(slug);

  if (!currentCase) {
    notFound();
  }

  return <CaseInvestigationClient key={currentCase.id} slug={slug} />;
}
