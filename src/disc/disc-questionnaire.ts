/**
 * Questionnaire des 5 questions et attribution du profil parmi les 16 profils.
 *
 * Code profil = lettre Q1 + Q2 + Q3 + Q4 + "1" (ex. MIDA1). La question 5
 * est posée pour garder l'expérience complète mais n'intervient pas dans le
 * calcul : avec 16 profils, le chiffre suffixe (lié au chronomètre dans la
 * version 96 profils) vaut toujours 1.
 */
import { DISC_PROFILES, type DiscProfile } from "./disc-profiles";

export type DiscChoice = "A" | "B";

export type DiscQuestion = {
  number: 1 | 2 | 3 | 4 | 5;
  prompt: string;
  options: Record<DiscChoice, { label: string; letter: string }>;
};

export const DISC_QUESTIONS: readonly DiscQuestion[] = [
  {
    number: 1,
    prompt: "Aux yeux des autres, vous êtes plutôt…",
    options: { A: { label: "Démonstratif et dynamique", letter: "M" }, B: { label: "Calme et réfléchi", letter: "R" } },
  },
  {
    number: 2,
    prompt: "Pour prendre une décision, mieux vaut…",
    options: { A: { label: "Être factuel : les détails sont importants", letter: "O" }, B: { label: "Écouter son intuition", letter: "I" } },
  },
  {
    number: 3,
    prompt: "Le pire, c'est…",
    options: { A: { label: "Quelqu'un qui n'est pas chaleureux", letter: "E" }, B: { label: "Quelqu'un qui n'est pas raisonnable", letter: "D" } },
  },
  {
    number: 4,
    prompt: "Aux yeux des autres, vous êtes plutôt…",
    options: { A: { label: "Organisé", letter: "P" }, B: { label: "Souple", letter: "A" } },
  },
  {
    number: 5,
    prompt: "Le pire, c'est…",
    options: { A: { label: "Trop de sécurité", letter: "T" }, B: { label: "Pas assez de sécurité", letter: "N" } },
  },
] as const;

export type DiscAnswers = Partial<Record<1 | 2 | 3 | 4 | 5, DiscChoice>>;

/** Calcule le code profil (5 caractères) à partir des réponses ; null si Q1–Q4 incomplètes. */
export function computeDiscProfileCode(answers: DiscAnswers): string | null {
  const letters: string[] = [];
  for (const question of DISC_QUESTIONS.slice(0, 4)) {
    const choice = answers[question.number];
    if (!choice) return null;
    letters.push(question.options[choice].letter);
  }
  return `${letters.join("")}1`;
}

export function profileForAnswers(answers: DiscAnswers): DiscProfile | null {
  const code = computeDiscProfileCode(answers);
  return code ? DISC_PROFILES.find((profile) => profile.code === code) ?? null : null;
}

export function nextUnansweredQuestion(answers: DiscAnswers): DiscQuestion | null {
  return DISC_QUESTIONS.find((question) => !answers[question.number]) ?? null;
}

export function describeQuestionForModel(question: DiscQuestion): Record<string, unknown> {
  return {
    number: question.number,
    question_fr: question.prompt,
    option_A_fr: question.options.A.label,
    option_B_fr: question.options.B.label,
  };
}

/** Texte compact décrivant les 5 questions, inséré dans le prompt. */
export function questionnaireForPrompt(): string {
  return DISC_QUESTIONS.map((question) =>
    `Q${question.number}. ${question.prompt} A = « ${question.options.A.label} » / B = « ${question.options.B.label} »`
  ).join("\n");
}

/** Texte compact d'un profil pour le prompt et les sorties d'outil. */
export function describeProfileForModel(profile: DiscProfile): Record<string, unknown> {
  return {
    code: profile.code,
    name_fr: profile.name,
    colour: profile.color,
    summary_fr: profile.summary,
    likes_fr: profile.likes.map((like) => `${like.title} — ${like.detail}`),
  };
}
