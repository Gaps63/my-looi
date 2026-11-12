import { triggerCharacterReaction } from "../character/character-reaction";
import { getLooiRobotRuntimeState, performLooiCharacterReaction } from "../device-tools/looi-robot";
import { recordDiagnosticEvent } from "../diagnostics/diagnostic-log";
import { useUserStore } from "../store/user";
import { isDrivingControlSessionActive } from "../voice/driving-control-session";
import {
  DISC_EMOTION_DURATION_MS,
  discEmotionForJudgement,
  normalizeDiscEmotion,
  type DiscEmotion,
  type DiscJudgement,
} from "./disc-demo";
import { showDiscVerdict } from "./disc-verdict";

export const DISC_TOOL_NAMES = new Set(["react_to_visitor", "express_emotion"]);

function startPhysicalReaction(emotion: DiscEmotion): string {
  const robot = getLooiRobotRuntimeState();
  if (
    !useUserStore.getState().preferences.discPhysicalReactions ||
    !robot.connected ||
    robot.motionActive ||
    isDrivingControlSessionActive()
  ) {
    return "skipped";
  }
  void performLooiCharacterReaction(emotion).catch((error) => {
    recordDiagnosticEvent("character", "disc-physical-reaction-skipped", {
      emotion,
      error: error instanceof Error ? error.message : String(error),
    });
  });
  return "started";
}

/**
 * Executes the DISC demo reaction tool: eye colour (green/red/white), facial
 * expression and, when allowed, the existing safety-bounded physical gesture.
 * `express_emotion` is kept as a legacy alias.
 */
export function executeDiscReactionTool(name: string, args: Record<string, unknown>): Record<string, unknown> {
  let judgement: DiscJudgement;
  let emotion: DiscEmotion | null;
  if (name === "express_emotion") {
    emotion = normalizeDiscEmotion(args.emotion);
    if (!emotion) throw new Error("emotion must be one of pleased, annoyed, angry, startled, victory");
    judgement = emotion === "pleased" || emotion === "victory" ? "good" : emotion === "startled" ? "neutral" : "bad";
  } else {
    const raw = String(args.judgement ?? "");
    if (raw !== "good" && raw !== "bad" && raw !== "neutral") throw new Error("judgement must be good, bad or neutral");
    judgement = raw;
    emotion = discEmotionForJudgement(judgement, args.intensity === "strong" ? "strong" : "mild");
  }
  const reason = typeof args.reason === "string" ? args.reason.slice(0, 200) : "";

  showDiscVerdict(judgement);
  let physical = "none";
  if (emotion) {
    triggerCharacterReaction(emotion, { durationMs: DISC_EMOTION_DURATION_MS[emotion], source: "disc-demo" });
    physical = startPhysicalReaction(emotion);
  }

  recordDiagnosticEvent("character", "disc-reaction", { judgement, emotion, reason, physical });
  return {
    ok: true,
    judgement,
    instruction: "Your reaction is now visible. Give your spoken reply in character, matching this judgement, unless you have already answered this message. Do not mention the tool or your eye colour unless asked.",
  };
}
