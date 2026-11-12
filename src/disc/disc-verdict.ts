import { create } from "zustand";

/** How the visitor's last message fits the robot's colour: drives the eye colour. */
export type DiscVerdict = "good" | "bad" | "neutral";

/** Eye colours used by the DISC demo face. */
export const DISC_EYE_COLORS = {
  neutral: { eyeColor: "#F4F7FA", eyeShadowColor: "#8C97A6", eyeGlow: "rgba(255,255,255,0.35)" },
  good: { eyeColor: "#3BE37F", eyeShadowColor: "#138A4A", eyeGlow: "rgba(59,227,127,0.55)" },
  bad: { eyeColor: "#FF3B3B", eyeShadowColor: "#9E1515", eyeGlow: "rgba(255,59,59,0.55)" },
} as const;

/** A good/bad colour stays visible this long unless a newer judgement replaces it. */
export const DISC_VERDICT_HOLD_MS = 10_000;

type DiscVerdictState = {
  verdict: DiscVerdict;
  verdictId: number;
  setVerdict: (verdict: DiscVerdict, verdictId: number) => void;
};

export const useDiscVerdictStore = create<DiscVerdictState>((set) => ({
  verdict: "neutral",
  verdictId: 0,
  setVerdict: (verdict, verdictId) => set({ verdict, verdictId }),
}));

let nextVerdictId = 1;
let verdictTimer: ReturnType<typeof setTimeout> | null = null;

export function showDiscVerdict(verdict: DiscVerdict, holdMs = DISC_VERDICT_HOLD_MS): void {
  if (verdictTimer) clearTimeout(verdictTimer);
  verdictTimer = null;
  const id = nextVerdictId++;
  useDiscVerdictStore.getState().setVerdict(verdict, id);
  if (verdict === "neutral") return;
  verdictTimer = setTimeout(() => {
    verdictTimer = null;
    if (useDiscVerdictStore.getState().verdictId !== id) return;
    useDiscVerdictStore.getState().setVerdict("neutral", nextVerdictId++);
  }, holdMs);
}

export function resetDiscVerdict(): void {
  showDiscVerdict("neutral");
}
