import { recordDiagnosticEvent } from "../diagnostics/diagnostic-log";
import { useUserStore } from "../store/user";
import {
  DISC_QUESTIONS,
  describeProfileForModel,
  describeQuestionForModel,
  nextUnansweredQuestion,
  profileForAnswers,
  type DiscAnswers,
} from "./disc-questionnaire";
import { resetDiscVerdict } from "./disc-verdict";

export const DISC_QUESTIONNAIRE_TOOL_NAMES = new Set(["record_questionnaire_answer", "reset_visitor"]);

/** Clears the current visitor (profile, answers, manual colours, notes) and puts the eyes back to white. */
export function resetDiscVisitor(): void {
  useUserStore.getState().updatePreferences({
    discVisitorProfileCode: null,
    discQuestionnaireAnswers: {},
    discVisitorPrimary: null,
    discVisitorSecondary: null,
    discVisitorNotes: "",
  });
  resetDiscVerdict();
}

export function executeDiscQuestionnaireTool(name: string, args: Record<string, unknown>): Record<string, unknown> {
  if (name === "reset_visitor") {
    resetDiscVisitor();
    recordDiagnosticEvent("runtime", "disc-visitor-reset", { source: "voice" });
    return {
      ok: true,
      next_question: describeQuestionForModel(DISC_QUESTIONS[0]),
      instruction: "The previous visitor is forgotten. Greet the new visitor and offer the test (optional).",
    };
  }

  const questionNumber = Number(args.question);
  const choice = args.choice;
  if (![1, 2, 3, 4, 5].includes(questionNumber)) throw new Error("question must be 1, 2, 3, 4 or 5");
  if (choice !== "A" && choice !== "B") throw new Error("choice must be A or B");

  const { preferences, updatePreferences } = useUserStore.getState();
  const answers: DiscAnswers = {
    ...preferences.discQuestionnaireAnswers,
    [questionNumber as 1 | 2 | 3 | 4 | 5]: choice,
  };
  const next = nextUnansweredQuestion(answers);

  if (next) {
    updatePreferences({ discQuestionnaireAnswers: answers });
    return {
      ok: true,
      recorded: { question: questionNumber, choice },
      answered: Object.keys(answers).length,
      next_question: describeQuestionForModel(next),
      instruction: "Ask this next question now, with its two options, translated into the visitor's language.",
    };
  }

  const profile = profileForAnswers(answers);
  if (!profile) throw new Error("profile could not be computed from the answers");
  updatePreferences({
    discQuestionnaireAnswers: answers,
    discVisitorProfileCode: profile.code,
    discVisitorPrimary: profile.color,
    discVisitorSecondary: null,
  });
  recordDiagnosticEvent("runtime", "disc-profile-assigned", { code: profile.code });
  return {
    ok: true,
    test_complete: true,
    profile: describeProfileForModel(profile),
    instruction: "Present this profile now as described in your instructions (name, colour, short summary, the two things it likes, then how your colour relates to theirs). Translate into the visitor's language. Never say the code.",
  };
}
