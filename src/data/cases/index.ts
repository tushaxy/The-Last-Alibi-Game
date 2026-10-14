import { Case } from "@/types/game";
import { case1LastTrain } from "./case1-last-train";
import { case2Glasshouse } from "./case2-glasshouse";
import { case3BlackoutRoom } from "./case3-blackout-room";
import { case4HollowSaint } from "./case4-hollow-saint";

export const ALL_CASES: Case[] = [
  case1LastTrain,
  case2Glasshouse,
  case3BlackoutRoom,
  case4HollowSaint,
];

export function getCaseBySlug(slug: string): Case | undefined {
  return ALL_CASES.find((c) => c.slug === slug);
}

export function getCaseById(id: string): Case | undefined {
  return ALL_CASES.find((c) => c.id === id);
}

export { case1LastTrain, case2Glasshouse, case3BlackoutRoom, case4HollowSaint };
