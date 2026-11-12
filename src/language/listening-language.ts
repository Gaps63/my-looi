import type { ResponseLanguage } from "./response-language";

export type ListeningLanguage = "ru" | "uk" | "en" | "fr" | "ar";

/**
 * Offline (Vosk) command models exist only for ru/uk/en. French and Arabic
 * speakers use the English offline command grammar (e.g. "LOOI, stop");
 * conversation itself is handled by OpenAI Realtime in their own language.
 */
export type LocalCommandLanguage = "ru" | "uk" | "en";
export function toLocalCommandLanguage(language: ListeningLanguage): LocalCommandLanguage {
  return language === "ru" || language === "uk" ? language : "en";
}

export const DEFAULT_LISTENING_LANGUAGE: ListeningLanguage = "ru";

export const LISTENING_LANGUAGE_OPTIONS: ReadonlyArray<{
  id: ListeningLanguage;
  shortLabel: string;
  label: string;
}> = [
  { id: "ru", shortLabel: "RU", label: "Русский" },
  { id: "uk", shortLabel: "UA", label: "Українська" },
  { id: "en", shortLabel: "EN", label: "English" },
  { id: "fr", shortLabel: "FR", label: "Français" },
  { id: "ar", shortLabel: "AR", label: "العربية" },
];

export function normalizeListeningLanguage(value: unknown): ListeningLanguage {
  return value === "uk" || value === "en" || value === "ru" || value === "fr" || value === "ar"
    ? value
    : DEFAULT_LISTENING_LANGUAGE;
}

const LANGUAGE_TARGETS: Array<{ language: ListeningLanguage; pattern: RegExp }> = [
  { language: "ru", pattern: /(?:русск(?:ий|ом|ого)|російськ(?:у|ою)|russian)/u },
  { language: "uk", pattern: /(?:украинск(?:ий|ом|ого)|українськ(?:у|ою)|ukrainian)/u },
  { language: "en", pattern: /(?:английск(?:ий|ом|ого)|англійськ(?:у|ою)|english|anglais)/u },
  { language: "fr", pattern: /(?:французск(?:ий|ом|ого)|французьк(?:у|ою)|french|fran[cç]ais)/u },
  { language: "ar", pattern: /(?:арабск(?:ий|ом|ого)|арабськ(?:у|ою)|arabic|arabe)/u },
];

/**
 * Change the language LOOI expects from the user. This intentionally does not
 * change the language used for responses.
 */
export function detectListeningLanguageSwitchCommand(transcript: string): ListeningLanguage | null {
  const normalized = transcript
    .trim()
    .toLowerCase()
    .replace(/[.,!?;:]+/gu, " ")
    .replace(/\s+/gu, " ")
    .trim();

  const isListeningCommand =
    /^(?:(?:пожалуйста|будь\s+ласка|please)\s+)?(?:переключи|смени|поменяй|выбери|установи|зміни|перемкни|обери|change|switch|set)\s+(?:язык|мову|language)(?!\s+(?:ответов|відповідей|response))(?:\s+(?:распознавания|ввода|слушания|розпізнавання|вводу|listening|input))?(?=$|\s)/u.test(normalized) ||
    /^(?:(?:пожалуйста|будь\s+ласка|please)\s+)?(?:перейди|перейти|switch)\s+(?:на|to)(?=$|\s)/u.test(normalized) ||
    /^(?:(?:пожалуйста|будь\s+ласка|please)\s+)?(?:слушай|слухай|понимай|розпізнавай|распознавай|listen|understand)(?=$|\s)/u.test(normalized) ||
    /^(?:(?:язык|мова|language)\s+(?:ввода|слушания|распознавания|вводу|розпізнавання|input|listening)(?=$|\s))/u.test(normalized);

  if (!isListeningCommand) return null;
  return LANGUAGE_TARGETS.find(({ pattern }) => pattern.test(normalized))?.language ?? null;
}

export function getListeningLanguageSwitchAcknowledgement(
  listeningLanguage: ListeningLanguage,
  responseLanguage: ResponseLanguage
): string {
  if (listeningLanguage === "fr" || listeningLanguage === "ar") {
    const name = listeningLanguage === "fr" ? "French" : "Arabic";
    if (responseLanguage === "fr") return `D'accord, j'écoute maintenant en ${listeningLanguage === "fr" ? "français" : "arabe"}.`;
    if (responseLanguage === "ar") return listeningLanguage === "fr" ? "حسنًا، سأستمع الآن بالفرنسية." : "حسنًا، سأستمع الآن بالعربية.";
    if (responseLanguage === "uk") return `Добре, тепер слухаю ${listeningLanguage === "fr" ? "французьку" : "арабську"}.`;
    if (responseLanguage === "ru") return `Хорошо, теперь слушаю ${listeningLanguage === "fr" ? "французский" : "арабский"}.`;
    return `Okay, I'll listen for ${name}.`;
  }
  if (responseLanguage === "fr") return "D'accord, j'écoute maintenant en " + (listeningLanguage === "en" ? "anglais" : listeningLanguage === "uk" ? "ukrainien" : "russe") + ".";
  if (responseLanguage === "ar") return "حسنًا، سأستمع الآن بـ" + (listeningLanguage === "en" ? "الإنجليزية" : listeningLanguage === "uk" ? "الأوكرانية" : "الروسية") + ".";
  const target = listeningLanguage === "uk"
    ? responseLanguage === "en" ? "Ukrainian" : responseLanguage === "uk" ? "українську" : "украинский"
    : listeningLanguage === "en"
      ? responseLanguage === "en" ? "English" : responseLanguage === "uk" ? "англійську" : "английский"
      : responseLanguage === "en" ? "Russian" : responseLanguage === "uk" ? "російську" : "русский";

  if (responseLanguage === "en") return `Okay, I'll listen for ${target}.`;
  if (responseLanguage === "uk") return `Добре, тепер слухаю ${target}.`;
  return `Хорошо, теперь слушаю ${target}.`;
}
