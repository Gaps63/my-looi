import { triggerCharacterReaction } from "../character/character-reaction";
import { getLooiRobotRuntimeState, performLooiCharacterReaction } from "../device-tools/looi-robot";
import { recordDiagnosticEvent } from "../diagnostics/diagnostic-log";
import { useUserStore } from "../store/user";
import { isDrivingControlSessionActive } from "../voice/driving-control-session";
import { DISC_EMOTION_DURATION_MS, normalizeDiscEmotion } from "./disc-demo";

/**
 * Executes the DISC demo `express_emotion` Realtime tool: face expression
 * always, plus the existing safety-bounded physical reaction when the robot is
 * connected and idle. Never throws for a busy/disconnected robot.
 */
export function executeDiscEmotionTool(args: Record<string, unknown>): Record<string, unknown> {
  const emotion = normalizeDiscEmotion(args.emotion);
  if (!emotion) throw new Error("emotion must be one of pleased, annoyed, angry, startled, victory");
  const reason = typeof args.reason === "string" ? args.reason.slice(0, 200) : "";

  triggerCharacterReaction(emotion, { durationMs: DISC_EMOTION_DURATION_MS[emotion], source: "disc-demo" });

  let physical = "skipped";
  const robot = getLooiRobotRuntimeState();
  if (
    useUserStore.getState().preferences.discPhysicalReactions &&
    robot.connected &&
    !robot.motionActive &&
    !isDrivingControlSessionActive()
  ) {
    physical = "started";
    void performLooiCharacterReaction(emotion).catch((error) => {
      recordDiagnosticEvent("character", "disc-physical-reaction-skipped", {
        emotion,
        error: error instanceof Error ? error.message : String(error),
      });
    });
  }

  recordDiagnosticEvent("character", "disc-emotion", { emotion, reason, physical });
  return {
    ok: true,
    emotion,
    instruction: "The reaction is shown. Continue speaking naturally in character; do not mention the tool.",
  };
}
